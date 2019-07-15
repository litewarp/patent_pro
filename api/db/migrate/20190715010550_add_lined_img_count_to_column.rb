class AddLinedImgCountToColumn < ActiveRecord::Migration[5.2]
  def down
    remove_column :columns, :lined_img_count
  end

  def up
    add_column :columns, :lined_img_count, :string
  end
end
