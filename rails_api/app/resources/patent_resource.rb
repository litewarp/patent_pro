class PatentResource < ApplicationResource
  attribute :title, :string
  attribute :number, :string
  has_many :columns

  filter :number, :string do
    eq do |_scope, value|
      Patent.where('number ~* ?', value[0].to_s)
    end
  end

end
