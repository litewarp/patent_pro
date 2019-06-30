FROM ruby:2.6.3

RUN apt-get update -qq && apt-get install -y postgresql-client nodejs graphicsmagick poppler-utils poppler-data ghostscript tesseract-ocr pdftk
RUN mkdir /dock_api
WORKDIR /dock_api
COPY ./api/Gemfile /dock_api/Gemfile
COPY ./api/Gemfile.lock /dock_api/Gemfile.lock
RUN bash -c "gem install bundler"
RUN bundle install
COPY ./api/ /dock_api/

COPY ./api/entrypoint.sh /usr/bin
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 4002

CMD ["bundle", "exec", "rails", "server", "-p", "4002", "-b", "0.0.0.0"]
