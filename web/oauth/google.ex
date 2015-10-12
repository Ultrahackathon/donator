defmodule Google do
  @moduledoc """
  An OAuth2 strategy for Google.
  This module is based to
  https://raw.githubusercontent.com/scrogson/oauth2_example/master/web/oauth/github.ex
  """
  use OAuth2.Strategy

  alias OAuth2.Strategy.AuthCode

  # Public API

  def client do
    OAuth2.Client.new([
      strategy: __MODULE__,
      client_id: System.get_env("GCLIENT_ID"),
      client_secret: System.get_env("GCLIENT_SECRET"),
      redirect_uri: System.get_env("GREDIRECT_URI"),
      site: "https://www.googleapis.com",
      authorize_url: "https://accounts.google.com/o/oauth2/auth",
      token_url: "https://accounts.google.com/o/oauth2/token"
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
    user = OAuth2.AccessToken.get!(token, "/plus/v1/people/me")

    case user do
      %{"displayName" => name, "emails" => [%{"type" => "account", "value" => email }], "id" => id} ->
        {:ok, %{name: name, email: email, user_id: id, provider: "google"}}
      _ ->
        {:error, user}
    end
  end
end