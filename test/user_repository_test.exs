defmodule Donator.UserRepositoryTest do
  use ExUnit.Case
  alias Donator.UserRepository

  test "get users sorted by checkin count" do
    expected_result = [
      %{checkin_count: 12, id: "563d0d9c93e3d39d8ea8251f", name: "deiga"},
      %{checkin_count: 1, id: "1db5745aa1fd3e0325925af9", name: "nkauppila"},
      %{checkin_count: 0, id: "1db5745aa1fd3e0325925af8", name: "teppo"}
    ]

    assert UserRepository.get_leaderboard == expected_result
  end
end
