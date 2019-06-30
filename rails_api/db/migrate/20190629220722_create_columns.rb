class CreateColumns < ActiveRecord::Migration[5.2]
  def down
    drop_table :columns
  end

  def up
    create_table :columns do |t|
      t.integer :patent_id
      t.integer :number

      t.timestamps
    end
  end
end
