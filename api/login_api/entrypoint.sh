#!/bin/bash

mix local.hex --force
mix local.rebar --force
mix ecto.create
mix run --no-halt