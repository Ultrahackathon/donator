defmodule Donator.Transaction do
    use Donator.Web, :model

    @requires_fields ~w(user_id donor_id sum target_id)
    @optional_fields ~w()

    @primary_key {:id, :binary_id, autogenerate: true}
    @derive {Poison.Encoder, only: [:user_id, :donor_id, :sum, :target_id]}
    schema "transaction" do
      field :user_id
      field :donor_id
      field :target_id
      field :sum, :float
    end

    def changeset(model, params \\ :empty) do
        model
        |> cast(params, @requires_fields, @optional_fields)
    end

end

defmodule Donator.TransactionRepository do
    import Ecto.Query
    alias Donator.Repo
    alias Donator.Transaction

    def find_all do
      Repo.all Transaction
    end

    def find_by_user(user_id) do
      query = from t in Transaction,
              where: t.user_id == ^user_id,
              select: t

      Repo.all query
    end

    def insert(transaction) do
        changeset = Transaction.changeset(%Transaction{}, transaction)

        case Repo.insert(changeset) do
            {:ok, transaction} -> {:ok, transaction: transaction}
            {:error, changeset} -> {:error, changeset: changeset}
        end
    end

    def create_transaction(donor, user_id) do
      template = donor.templates |> List.first

      transaction = %{
        "user_id": user_id,
        "donor_id": donor.id,
        "target_id": template.target_id,
        "sum": template.sum_per_checkin,
      }

      insert(transaction)
    end
end
