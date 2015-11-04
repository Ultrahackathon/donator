defmodule Donator.ActionsChannel do
  use Phoenix.Channel
  alias Donator.Foursquare

  def join("actions", payload, socket) do
    {:ok, socket}
  end

  def handle_in("locations:near", payload, socket) do
    lat = Float.to_string payload["lat"], [decimals: 2, compact: true]
    lng = Float.to_string payload["lng"], [decimals: 2, compact: true]
    {:ok, venues} = Foursquare.get("#{lat},#{lng}")
    push socket, "locations:near", venues.body[:response]
    {:noreply, socket}
  end

end
