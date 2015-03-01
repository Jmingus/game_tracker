class ChangePublishedDefaultToNa < ActiveRecord::Migration
  def change
    change_table :collections do |t|
    t.change :published, :string, default: 'NA'
      end
  end
end
