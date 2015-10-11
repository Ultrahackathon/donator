use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :donator, Donator.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  cache_static_lookup: false,
  check_origin: false,
  watchers: [{Path.expand("node_modules/.bin/webpack"), ["--config webpack-dev.config.js", "--watch", "--colors", "--progress"]}]

# Watch static and templates for browser reloading.
config :donator, Donator.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :donator, Donator.Repo,
  adapter: Mongo.Ecto,
  database: "donator_dev",
  hostname: (System.get_env("MONGO_PORT_27017_TCP_ADDR") || "localhost"),
  pool_size: 10

config :donator, :jwt,
  alg: "HS256",
  key: "gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C"
