class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.text :title
      t.text :joburl
      t.date :applieddate
      t.text :company
      t.text :stack
      t.text :status
      t.text :address

      t.timestamps
    end
  end
end
