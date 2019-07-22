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

    def sub_pto_text
      fuzzy_lines
      @matched_text.collect.with_index do |line, index|
        if line.blank?
        case index
        when 0
          puts @matched_text[index+1]
        when @matched_text.count
          puts @matched_text[index-1]
        else
          puts @matched_text[index-1]
          puts ""
          puts @matched_text[index+1]
        end
      end
      end

      words = @column.patent.text.gsub("<br><br>", "").split(" ")
    end

   end
end
