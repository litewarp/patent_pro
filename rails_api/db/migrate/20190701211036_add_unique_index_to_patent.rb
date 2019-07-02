class AddUniqueIndexToPatent < ActiveRecord::Migration[5.2]
  def down
    remove_index :patents, :number
  end

  def up
    add_index :patents, :number, unique: true
  end
end
