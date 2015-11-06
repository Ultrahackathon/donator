# Add locations to mongo
# mongo [database] < add_locations.js

var locations = [
  {"foursquare_id": "4af5e40ff964a52061fe21e3"},
  {"foursquare_id": "4d668318838654815d27f953"},
  {"foursquare_id": "4c3afa501a1cd13a288bb50d"},
  {"foursquare_id": "5195baea498ed362449f1a83"},
  {"foursquare_id": "50129094e4b001b3387684e0"},
  {"foursquare_id": "543f5891498e9cf376eea8ac"}
];

db.locations.insert(locations);
