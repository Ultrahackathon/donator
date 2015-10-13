defmodule Donator.UserSocket do
  use Phoenix.Socket

  ## Channels
  # channel "rooms:*", Donator.RoomChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(%{"token" => token}, socket) do
    jwt_config = Application.get_env(:donator, :jwt)
    opts = %{
      alg: jwt_config[:alg],
      key: jwt_config[:key]
    }

    try do
      case JsonWebToken.verify(token, opts) do
        {:ok, claims} ->
          socket = Phoenix.Socket.assign(socket, :token, "abc")
          {:ok, socket}
        _ -> :error
      end
    rescue
      _ -> :error
    end
  end
  def connect(_, socket), do: :error

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "users_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     Donator.Endpoint.broadcast("users_socket:" <> user.id, "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(socket), do: "users_socket:#{socket.assigns.token}"
end
