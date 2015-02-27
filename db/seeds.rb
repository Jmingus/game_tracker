# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
5.times do
    User.create(user_name: Faker::Internet.user_name,
                city: Faker::Address.city,
                zipcode: Faker::Address.zip_code,
                email: Faker::Internet.email,
                password: "password")
  end