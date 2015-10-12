defmodule Facebook do
  @moduledoc """
  An OAuth2 strategy for Facebook.
  This module is based to
  https://raw.githubusercontent.com/scrogson/oauth2_example/master/web/oauth/github.ex
  """
  use OAuth2.Strategy
  alias OAuth2.AccessToken
  alias OAuth2.Strategy.AuthCode

  # Public API

  def client do
    OAuth2.Client.new([
      strategy: __MODULE__,
      client_id: System.get_env("FCLIENT_ID"),
      client_secret: System.get_env("FCLIENT_SECRET"),
      redirect_uri: System.get_env("FREDIRECT_URI"),
      site: "https://graph.facebook.com/v2.3",
      authorize_url: "https://www.facebook.com/dialog/oauth",
      token_url: "https://graph.facebook.com/v2.3/oauth/access_token"
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
    user = OAuth2.AccessToken.get!(token, "/me")

    case user do
      %{"name" => name, "id" => id} ->
        {:ok, %{name: name, user_id: id, provider: "facebook"}}
      _ ->
        {:error, user}
    end
  end
end