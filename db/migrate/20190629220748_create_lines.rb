class CreateLines < ActiveRecord::Migration[5.2]
  def down
    drop_table :lines
  end

  def up
    create_table :lines do |t|
      t.integer :column_id
      t.integer :number
      t.string :text

      t.timestamps
    end
  end
end
