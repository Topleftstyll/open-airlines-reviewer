class CreateAirlines < ActiveRecord::Migration[6.1]
  def change
    create_table :airlines do |t|
      t.string :name
      t.string :image_url
      t.string :slug
      t.integer :avg_score

      t.timestamps
    end
  end
end
