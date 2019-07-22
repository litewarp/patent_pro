class AddFieldsToColumn < ActiveRecord::Migration[5.2]
  def down
    remove_column :columns, :matched_text
  end

  def up
    add_column :columns, :matched_text, :string
  end
end
