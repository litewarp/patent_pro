class AddColumnText < ActiveRecord::Migration[5.2]
  def down
    remove_column :columns, :text
  end

  def up
    add_column :columns, :text, :string
  end
end
