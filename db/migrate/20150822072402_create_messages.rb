class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :text
      t.integer :user_id
      t.integer :channel_id

      t.timestamps null: false
    end
    add_index :messages, :user_id
    add_index :messages, :channel_id
  end
end
