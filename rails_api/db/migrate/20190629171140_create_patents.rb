class CreatePatents < ActiveRecord::Migration[5.2]
  def down
    drop_table :patents
  end

  def up
    create_table :patents do |t|
      t.string :title
      t.string :number
      t.string :filing_date
      t.string :issue_date
      t.string :text

      t.timestamps
    end
  end
end
