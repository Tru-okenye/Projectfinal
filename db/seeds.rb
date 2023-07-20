# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# admin_user1 = User.create!(
#   name: "Truphena okenye",
#   email: "truphenaokenye@gmail.com",
#   password: "@Truphy1.", # replace with your desired password
#   admin: true
# )
# admin_user2 = User.create!(
#   name: "",
#   email: "admin2@example.com",
#   password: "password",
#   admin: true
# )



Bus.create(from: 'City A', to: 'City B', amount: 10.0, date: Date.today, time: Time.now, seats: 50)
Bus.create(from: 'City C', to: 'City D', amount: 15.0, date: Date.tomorrow, time: Time.now, seats: 40)
# Add more bus records as needed
