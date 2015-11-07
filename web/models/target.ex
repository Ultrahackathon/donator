defmodule Donator.Target do
    use Donator.Web, :model

    @requires_fields ~w(name)
    @optional_fields ~w()

    @primary_key {:id, :binary_id, autogenerate: true}
    @derive {Poison.Encoder, only: [:name]}
    schema "target" do
      field :name
    end

end

defmodule Donator.TargetRepository do
    import Ecto.Query
    alias Donator.Repo
    alias Donator.Target

    def find_one_by_id(id) do
      Repo.get!(Target, id)
    end

end
