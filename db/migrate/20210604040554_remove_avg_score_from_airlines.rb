class RemoveAvgScoreFromAirlines < ActiveRecord::Migration[6.1]
  def change
    remove_column :airlines, :avg_score, :integer
  end
end
