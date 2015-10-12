defmodule GitHub do
  @moduledoc """
  An OAuth2 strategy for GitHub.
  This module is taken from
  https://raw.githubusercontent.com/scrogson/oauth2_example/master/web/oauth/github.ex
  """
  use OAuth2.Strategy

  alias OAuth2.Strategy.AuthCode

  # Public API

  def client do
    OAuth2.Client.new([
      strategy: __MODULE__,
      client_id: System.get_env("CLIENT_ID"),
      client_secret: System.get_env("CLIENT_SECRET"),
      redirect_uri: System.get_env("REDIRECT_URI"),
      site: "https://api.github.com",
      authorize_url: "https://github.com/login/oauth/authorize",
      token_url: "https://github.com/login/oauth/access_token"
    ])
  end

  def authorize_url!(params \\ []) do
    OAuth2.Client.authorize_url!(client(), params)
  end

  def get_token!(params \\ [], headers \\ []) do
    OAuth2.Client.get_token!(client(), params)
  end

  # Strategy Callbacks

  def authorize_url(client, params) do
    AuthCode.authorize_url(client, params)
  end

  def get_token(client, params, headers) do
    client
    |> put_header("Accept", "application/json")
    |> AuthCode.get_token(params, headers)
  end

  def get_user(token) do
    user = OAuth2.AccessToken.get!(token, "/user")

    case user do
      %{"login" => name, "email" => email, "id" => id} ->
        {:ok, %{name: name, email: email, user_id: Integer.to_string(id), provider: "github"}}
      _ ->
        {:error, user}
    end
  end

end