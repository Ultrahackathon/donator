defmodule Donator.PageController do
  use Donator.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
