class RenameTexttoExtractedLines < ActiveRecord::Migration[5.2]
  def down
    remove_column :columns, :text
    rename_column :columns, :extracted_text, :text
  end

  def up
    rename_column :columns, :text, :extracted_text
    add_column :columns, :text, :string
  end
end
