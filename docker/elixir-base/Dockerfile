FROM ubuntu:15.04

# Use en_US.UTF-8 as locale
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Install base package
RUN apt-get update
RUN apt-get install -y wget git build-essential

# Install Erlang
RUN apt-get update
RUN apt-get install -y erlang

# Install Elixir
WORKDIR /tmp/elixir-build
RUN git clone https://github.com/elixir-lang/elixir.git
WORKDIR elixir
RUN git checkout v1.1.0 && make && make install

# Install nodejs
RUN apt-get install -y nodejs npm
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 1

RUN apt-get autoremove; apt-get autoclean
