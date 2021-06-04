class AddAvgScoreToAirline < ActiveRecord::Migration[6.1]
  def change
    add_column :airlines, :avg_score, :integer
  end
end
