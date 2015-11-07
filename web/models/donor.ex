defmodule Donator.Donor do
    use Donator.Web, :model

    @requires_fields ~w(name templates)
    @optional_fields ~w()

    @primary_key {:id, :binary_id, autogenerate: true}
    @derive {Poison.Encoder, only: [:name, :templates]}
    schema "donor" do
      field :name
      embeds_many :templates, Donator.Template
    end

    def changeset(model, params \\ :empty) do
        model
        |> cast(params, @requires_fields, @optional_fields)
    end

end

defmodule Donator.Template do
  use Ecto.Schema

  embedded_schema do
    field :sum_per_checkin, :float
    field :max_sum, :float
    field :location
  end
end

defmodule Donator.DonorRepository do
    import Ecto.Query
    alias Donator.Repo
    alias Donator.Donor

    def find_all do
      Repo.all Donor
    end

    def find_template_by_donor_and_location(donor_id, location_id) do
      query = from donor in Donor,
              where: donor.id == ^donor_id,
              where: fragment("templates.location": ["$eq": ^location_id]),
              select: donor

      Repo.one(query)
    end

end
