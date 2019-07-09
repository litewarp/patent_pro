patent_numbers = %w[
  7629705
  9532330
]

patent_numbers.each do |num|
  patent = Patent.create(number: num)
  patent.save_columns
end
