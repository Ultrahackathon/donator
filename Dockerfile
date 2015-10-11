FROM donator/elixir-base

RUN apt-get install -y mongodb-server

WORKDIR /opt/donator
COPY . /opt/donator

RUN yes | mix deps.get
RUN mix compile

RUN npm install

CMD ["mix", "phoenix.server", "--no-deps-check", "--no-compile", "--no-halt"]

EXPOSE 4000
