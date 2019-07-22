class ChangeLineParams < ActiveRecord::Migration[5.2]
  def down
    remove_column :lines, :text
    rename_column :lines, :extracted_text, :text
  end

  def up
    rename_column :lines, :text, :extracted_text
    add_column :lines, :text, :string
  end
end
