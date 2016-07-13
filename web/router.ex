defmodule Donator.Router do
  use Donator.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/auth", Donator do
    pipe_through :browser

    get "/:provider", AuthController, :index
    get "/:provider/callback", AuthController, :callback
  end

  scope "/", Donator do
    pipe_through :browser # Use the default browser stack

    get "/*foo", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Donator do
  #   pipe_through :api
  # end
end
