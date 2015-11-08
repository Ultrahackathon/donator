defmodule Donator.Crypto do
  def md5(str) do
    Base.encode16(:erlang.md5(str), case: :lower)
  end
end
