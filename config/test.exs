use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :donator, Donator.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :donator, Donator.Repo,
  adapter: Mongo.Ecto,
  username: "mongodb",
  password: "mongodb",
  database: "donator_test",
  hostname: "localhost"

config :jwt,
  alg: "HS256",
  key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"
