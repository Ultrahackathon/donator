defmodule Donator.User do
    use Donator.Web, :model

    @requires_fields ~w(user_id provider name)
    @optional_fields ~w(checkins email)

    @primary_key {:id, :binary_id, autogenerate: true}
    @derive {Poison.Encoder, only: [:user_id, :provider, :email, :name, :checkins]}
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
    alias Donator.DonorRepository
    alias Donator.TransactionRepository

    def find_all do
      Repo.all User
    end

    def find_all_checkins do
      find_all |> Enum.map(fn u -> u.checkins end)
    end

    def find_one_by_provider_id(provider, user_id) do
        query = from user in User,
                where: user.provider == ^provider and user.user_id == ^user_id,
                select: user

        Repo.one query
    end

    def find_one_by_id(id) do
      Repo.get!(User, id)
    end

    def insert(user) do
        changeset = User.changeset(%User{}, user)

        case Repo.insert(changeset) do
            {:ok, user} -> {:ok, user: user}
            {:error, changeset} -> {:error, changeset: changeset}
        end
    end

    def add_checkin(id, user_params) do
      user = Repo.get!(User, id)
      checkins = Map.take(user, [:checkins])[:checkins]
      change = %{"checkins": checkins ++ [user_params]}
      changeset = User.changeset(user, change)

      Repo.update(changeset)

      user_params["location"]["id"]
      |> DonorRepository.find_template_by_location
      |> TransactionRepository.create_transaction(id)
    end

    def get_leaderboard do
      find_all
      |> Enum.map(fn user ->
        %{id: user.id, name: user.name, checkin_count: Enum.count(user.checkins)}
      end)
      |> Enum.sort(fn a, b -> a.checkin_count > b.checkin_count end)
    end
end
