defmodule Donator.ActionsChannel do
  use Phoenix.Channel
  require Logger
  alias Donator.Foursquare
  alias Donator.UserRepository
  alias Donator.LocationRepository
  alias Donator.TransactionRepository
  alias Donator.DonorRepository
  alias Donator.TargetRepository

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
          Logger.debug "#{inspect e}"
          error.(e)
          {:noreply, socket}
      end
      rescue
        e ->
          Logger.debug "#{inspect e}"
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
    |> Enum.map(fn venue ->
      donor = DonorRepository.find_template_by_location venue["id"]
      %{venue: venue, donor: donor}
    end)

    Logger.debug "#{inspect venues}"

    push socket, "locations:near", %{"venues": venues}
    {:noreply, socket}
  end

  def handle_in("locations:all", payload, socket) do
    push socket, "locations:all", %{"locations": LocationRepository.find_all}
    {:noreply, socket}
  end

  def handle_in("check-in", payload, socket) do
    success = fn claims ->
        Logger.debug "taman alla"
        Logger.debug "#{inspect claims}"

        locations = LocationRepository.find_all |> Enum.map(fn l -> l.foursquare_id end)

        if Enum.member? locations, payload["location"]["venue"]["id"] do
          UserRepository.add_checkin(claims[:id], payload)

          email = claims[:email] && Base.encode16(:erlang.md5(claims[:email]), case: :lower) || ""

          broadcast! socket, "feed", %{"email": email, "name": claims[:name], "location": payload["location"]["venue"]["name"]}
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

        Logger.debug "#{inspect user}"
        push socket, "user", %{user: user, transactions: transactions}
    end

    error = fn e ->
        push socket, "user", %{"user": nil}
    end

    handle_socket_with_claims socket, success, error
  end

  def handle_in("leaderboard", payload, socket) do
    leaderboard = UserRepository.get_leaderboard

    Logger.debug "#{inspect leaderboard}"

    push socket, "leaderboard", %{"leaderboard": leaderboard}
    {:noreply, socket}
  end

  def handle_in("donor", payload, socket) do
    Logger.debug "#{inspect payload}"

    donor = DonorRepository.find_template_by_location payload["location"]
    template = donor.templates |> List.first
    target = TargetRepository.find_one_by_id template["target_id"]

    push socket, "donor", %{donor: donor, target: target}
    {:noreply, socket}
  end

  def handle_out("feed", payload, socket) do
    push socket, "feed", payload
    {:noreply, socket}
  end

end
