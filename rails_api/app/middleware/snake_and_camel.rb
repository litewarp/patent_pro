# frozen_string_literal: true

module SnakeAndCamel
  require_relative './exception'

  class Middleware
    def initialize(app)
      @app = app
    end

    def call(env)
      # Transforming request
      request = Rack::Request.new(env)

      request.GET.deep_transform_keys! { |k| k.is_a?(String) ? k.underscore : k }
      request.POST.deep_transform_keys! { |k| k.is_a?(String) ? k.underscore : k }

      # transform sort and filter values

      if request.GET.keys.include?('sort')
        sort_param = request.GET['sort']
        underscored = sort_param[0] === '-' ? '-' + sort_param[1..-1].underscore : sort_param.underscore
        request.GET['sort'] = underscored
      end

      # Transforming response
      @app.call(env).tap do |_status, headers, response|
        if headers['Content-Type'] =~ /json/
          response.each do |res|
            begin
              new_response = JSON.parse(res)
            rescue JSON::ParserError => e
              message = e.to_s.gsub(/^\d+:\s/, '') # trim numeric code at the beginning of string
              raise Exception::BadResponseFormat, message
            end
            if new_response.is_a?(Array)
              new_response.map! { |h| h.deep_transform_keys! { |k| k.camelize(:lower) } }
            else
              new_response.deep_transform_keys! { |k| k.camelize(:lower) }
            end
            res.replace(new_response.to_json)
          end
        end
      end
    end
  end
end
