defmodule Donator.DonorRepositoryTest do
  use ExUnit.Case
  alias Donator.DonorRepository

  test "should find template" do
    donor = DonorRepository.find_template_by_donor_and_location "563d0d9c93e3d39d8ea8251f", "4bf58dd8d48988d180941735"
    assert donor.name == "ultrahack"
  end
end
