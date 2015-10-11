use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :donator, Donator.Endpoint,
  secret_key_base: "AoSjjqB0DNBBhiI/KbzkKkq/ByLwV+FEEhvv87bKw2EFCUfs2rQEX0+4Kdjq2KEl"

# Configure your database
config :donator, Donator.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "donator_prod",
  pool_size: 20
