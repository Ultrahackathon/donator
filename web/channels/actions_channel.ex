defmodule Donator.ActionsChannel do
  use Phoenix.Channel
  alias Donator.Foursquare
  alias Donator.UserRepository
  alias Donator.LocationRepository
  alias Donator.TransactionRepository

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
          IO.inspect e
          error.(e)
          {:noreply, socket}
      end
      rescue
        e ->
          IO.inspect e
          error.(e)
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
    supported_locations = LocationRepository.find_all |> Enum.map(fn l -> l.foursquare_id end)
    venues = venues.body[:response]["venues"]
    |> Enum.filter(fn venue ->
      Enum.member? supported_locations, venue["id"]
    end)
    IO.inspect(venues)
    push socket, "locations:near", %{"venues": venues}
    {:noreply, socket}
  end

  def handle_in("check-in", payload, socket) do
    success = fn claims ->
        IO.inspect(payload)
        locations = LocationRepository.find_all |> Enum.map(fn l -> l.foursquare_id end)

        if Enum.member? locations, payload["location"]["id"] do
          UserRepository.add_checkin(claims[:id], payload)
          push socket, "check-in", %{"success": true}
        else
          push socket, "check-in", %{"success": false, "message": "Check-in not allowed in this location!"}
        end
    end

    error = fn e ->
        push socket, "check-in", %{"success": false, "message": e}
        {:noreply, socket}
    end

    handle_socket_with_claims socket, success, error
  end

  def handle_in("user", payload, socket) do
    success = fn claims ->
        user = UserRepository.find_one_by_id(claims[:id])
        transactions = TransactionRepository.find_by_user(claims[:id])

        IO.inspect(user)
        push socket, "user", %{user: user, transactions: transactions}
    end

    error = fn e ->
        IO.inspect(e)
        push socket, "user", %{"user": nil}
    end

    handle_socket_with_claims socket, success, error
  end

  def handle_in("leaderboard", payload, socket) do
    leaderboard = UserRepository.get_leaderboard
    IO.inspect leaderboard
    push socket, "leaderboard", %{"leaderboard": leaderboard}
    {:noreply, socket}
  end

end
