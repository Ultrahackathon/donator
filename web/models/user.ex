defmodule Donator.User do
    use Donator.Web, :model

    @requires_fields ~w(user_id provider name)
    @optional_fields ~w(checkins email)

    @primary_key {:id, :binary_id, autogenerate: true}
    schema "user" do
        field :user_id
        field :provider
        field :email
        field :name
        field :checkins, {:array, :map}
    end

    def changeset(model, params \\ :empty) do
        model
        |> cast(params, @requires_fields, @optional_fields)
    end

end

defmodule Donator.UserRepository do
    import Ecto.Query
    alias Donator.Repo
    alias Donator.User

    def find_one_by_provider_id(provider, user_id) do
        query = from user in User,
                where: user.provider == ^provider and user.user_id == ^user_id,
                select: user

        Repo.one query
    end

    def insert(user) do
        changeset = User.changeset(%User{}, user)

        case Repo.insert(changeset) do
            {:ok, user} -> {:ok, user: user}
            {:error, changeset} -> {:error, changeset: changeset}
        end
    end
end