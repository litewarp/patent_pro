module MagickHat
  class MatchHandler
    def initialize(column_id)
      @column = Column.find(column_id)
      @text_lines = @column.extracted_text.split("\n") if @column.extracted_text
      @lines = @column.lines.sort { |a, b| a.number <=> b.number }
    end

    ##### Lines 2..66 #####
    ##### Index 1..65 #####
    def fuzzy_lines
      prepped_lines = @lines.collect { |x| x.extracted_text.gsub("[\n|\f]", "") }
      fz = FuzzyMatch.new(
        @text_lines,
        :must_match_at_least_one_word => true,
        :threshold => 0.8
      )
      @matched_text = prepped_lines.collect do |line|
        fz.find(line)
      end
    end
   end
end
