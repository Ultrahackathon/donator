FROM donator/elixir-base

RUN apt-get install -y mongodb-server

WORKDIR /opt/donator
COPY . /opt/donator

RUN mix local.rebar
RUN mix deps.clean --all
RUN yes | mix deps.get
RUN mix compile

RUN rm -rf node_modules/
RUN npm install

CMD ["mix", "phoenix.server", "--no-deps-check", "--no-compile", "--no-halt"]

EXPOSE 4000
