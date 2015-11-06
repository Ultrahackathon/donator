defmodule Donator.Location do
    use Donator.Web, :model

    @requires_fields ~w(foursquare_id)
    @optional_fields ~w()

    @primary_key {:id, :binary_id, autogenerate: true}
    @derive {Poison.Encoder, only: [:foursquare_id]}
    schema "locations" do
      field :foursquare_id
    end

    def changeset(model, params \\ :empty) do
        model
        |> cast(params, @requires_fields, @optional_fields)
    end

end

defmodule Donator.LocationRepository do
    import Ecto.Query
    alias Donator.Repo
    alias Donator.Location

    def find_all do
      Repo.all Location
    end

end
