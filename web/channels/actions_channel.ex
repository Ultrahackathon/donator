defmodule Donator.ActionsChannel do
  use Phoenix.Channel
  alias Donator.Foursquare
  alias Donator.UserRepository

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
    jwt_config = Application.get_env(:donator, :jwt)
    opts = %{
      alg: jwt_config[:alg],
      key: jwt_config[:key]
    }

    try do
      case JsonWebToken.verify(socket.assigns[:token], opts) do
        {:ok, claims} ->
          UserRepository.add_checkin(claims[:id], payload)
          push socket, "check-in", %{"success": true}
          {:noreply, socket}
        _ ->
          push socket, "check-in", %{"success": false}
          {:noreply, socket}
      end
    rescue
      _ ->
        push socket, "check-in", %{"success": false}
        {:noreply, socket}
    end
  end

  def handle_in("user", payload, socket) do
    jwt_config = Application.get_env(:donator, :jwt)
    opts = %{
      alg: jwt_config[:alg],
      key: jwt_config[:key]
    }

    try do
      case JsonWebToken.verify(socket.assigns[:token], opts) do
        {:ok, claims} ->
          user = UserRepository.find_one_by_id(claims[:id])
          IO.inspect(user)
          push socket, "user", user
          {:noreply, socket}
        e ->
          IO.inspect(e)
          push socket, "user", %{"user": nil}
          {:noreply, socket}
      end
    rescue
      e ->
        IO.inspect(e)
        push socket, "user", %{"user": nil}
        {:noreply, socket}
    end
  end

end
