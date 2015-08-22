class CreateChannels < ActiveRecord::Migration
  def change
    create_table :channels do |t|
      t.string :name
      t.integer :user_id
      t.boolean :deletable, default: true

      t.timestamps null: false
    end
    add_index :channels, :user_id
    add_index :channels, :deletable
  end
end
