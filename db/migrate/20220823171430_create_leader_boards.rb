class CreateLeaderBoards < ActiveRecord::Migration[6.1]
  def change
    create_table :leader_boards do |t|
      t.belongs_to :player, null: false, foreign_key: true

      t.timestamps
    end
  end
end
