defmodule Donator.ActionsChannel do
  use Phoenix.Channel
  alias Donator.Foursquare
  alias Donator.UserRepository

  def handle_socket_with_claims socket, success, error do
    jwt_config = Application.get_env(:donator, :jwt)
    opts = %{
      alg: jwt_config[:alg],
      key: jwt_config[:key]
    }

    try do
      case JsonWebToken.verify socket.assigns[:token], opts do
        {:ok, claims} ->
          success.(claims)
          {:noreply, socket}
        e ->
          error.(e)
          IO.inspect e
          {:noreply, socket}
      end
      rescue
        e ->
          error.(e)
          IO.inspect e
          {:noreply, socket}
    end
  end

  def join("actions", payload, socket) do
    {:ok, socket}
  end

  def handle_in("locations:near", payload, socket) do
    lat = payload["lat"]
    lng = payload["lng"]
    {:ok, venues} = Foursquare.get("#{lat},#{lng}")
    push socket, "locations:near", venues.body[:response]
    {:noreply, socket}
  end

  def handle_in("check-in", payload, socket) do
    success = fn claims ->
        UserRepository.add_checkin(claims[:id], payload)
        push socket, "check-in", %{"success": true}
    end

    error = fn e ->
        push socket, "check-in", %{"success": false}
        {:noreply, socket}
    end

    handle_socket_with_claims socket, success, error
  end

  def handle_in("user", payload, socket) do
    success = fn claims ->
        user = UserRepository.find_one_by_id(claims[:id])
        IO.inspect(user)
        push socket, "user", user
    end

    error = fn e ->
        IO.inspect(e)
        push socket, "user", %{"user": nil}
    end

    handle_socket_with_claims socket, success, error
  end

end
