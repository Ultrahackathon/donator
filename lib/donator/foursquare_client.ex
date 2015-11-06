defmodule Donator.Foursquare do
  use HTTPoison.Base

  def process_url(latlng) do
    endpoint = Application.get_env(:donator, :foursquare)[:endpoint]
    client_id = System.get_env("FOURSQUARE_CLIENT_ID")
    client_secret = System.get_env("FOURSQUARE_CLIENT_SECRET")

    IO.inspect("#{endpoint}&client_id=#{client_id}&client_secret=#{client_secret}&ll=#{latlng}")
    "#{endpoint}&client_id=#{client_id}&client_secret=#{client_secret}&ll=#{latlng}"
  end

  def process_response_body(body) do
    body
    |> Poison.decode!
    |> Dict.take(~w(response))
    |> Enum.map(fn({k, v}) -> {String.to_atom(k), v} end)
  end
end
