defmodule Donator.AuthController do
  use Donator.Web, :controller
  alias Donator.UserRepository

  @doc """
  This action is reached via `/auth/:provider` and redirects to the OAuth2 provider
  based on the chosen strategy.
  """
  def index(conn, %{"provider" => provider}) do
    redirect conn, external: authorize_url!(provider)
  end

  @doc """
  This action is reached via `/auth/:provider/callback` is the the callback URL that
  the OAuth2 provider will redirect the user back to with a `code` that will
  be used to request an access token. The access token will then be used to
  access protected resources on behalf of the user.
  """
  def callback(conn, %{"provider" => provider, "code" => code}) do
    # Exchange an auth code for an access token
    token = get_token!(provider, code)

    # Request the user's data with the access token
    user = get_user!(provider, token)

    process_user_login(conn, user)
    |> redirect(to: "/")
  end

  defp process_user_login(conn, {:ok, user}) do
    save_user_if_needed(user)
    |> generate_jwt
    |> prepare_response(conn)
  end
  defp process_user_login(conn, {:error, error}), do: conn

  defp save_user_if_needed(user) do
    stored_user = UserRepository.find_one_by_provider_id(user.provider, user.user_id)
    case stored_user do
      nil -> 
        case UserRepository.insert(user) do
          {:ok, user: user} -> {:ok, user}
          {:error, changeset: changeset} -> {:error, changeset}
          _ -> {:error, "Something went wrong"}
        end
      _ -> {:ok, stored_user}
    end
  end

  defp generate_jwt({:ok, user}) do
    jwt_config = Application.get_env(:donator, :jwt)
    opts = %{
      alg: jwt_config[:alg],
      key: jwt_config[:key]
    }

    claims = Map.take(user, [:id, :email, :name])
    {:ok, JsonWebToken.sign(claims, opts)}
  end
  defp generate_jwt({:error, user}), do: {:error, user}

  defp prepare_response({:ok, jwt}, conn), do: conn |> put_resp_cookie("token", jwt)
  defp prepare_response({:error, _}, conn), do: conn

  defp authorize_url!("github"), do: GitHub.authorize_url!
  defp authorize_url!("google"), do: Google.authorize_url!(scope: "email")
  defp authorize_url!("facebook"), do: Facebook.authorize_url!(scope: "email")
  defp authorize_url!(_), do: raise "No matching provider available"

  defp get_token!("github", code), do: GitHub.get_token!(code: code)
  defp get_token!("google", code), do: Google.get_token!(code: code)
  defp get_token!("facebook", code), do: Facebook.get_token!(code: code)
  defp get_token!(_, _), do: raise "No matching provider available"

  defp get_user!("github", token), do: GitHub.get_user(token)
  defp get_user!("google", token), do: Google.get_user(token)
  defp get_user!("facebook", token), do: Facebook.get_user(token)
end
