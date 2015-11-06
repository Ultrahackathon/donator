# Add locations to mongo
# mongo [database] < add_locations.js

var locations = [
  {"foursquare_id": "4af5e40ff964a52061fe21e3"},
  {"foursquare_id": "4d668318838654815d27f953"},
  {"foursquare_id": "4c3afa501a1cd13a288bb50d"},
  {"foursquare_id": "5195baea498ed362449f1a83"},
  {"foursquare_id": "50129094e4b001b3387684e0"},
  {"foursquare_id": "543f5891498e9cf376eea8ac"},
  {"foursquare_id": "4cc82783fa03224bbe9642ef"},
  {"foursquare_id": "4c409527a5c5ef3b9d05b06f"},
  {"foursquare_id": "4af5e40ff964a52061fe21e3"},
  {"foursquare_id": "4afaa120f964a5202f1822e3"},
  {"foursquare_id": "5479be61498ee2521eaffa02"},
  {"foursquare_id": "51805895e4b0dce6ddc1d0cd"},
  {"foursquare_id": "557be455498e1dcc6bc34d45"},
  {"foursquare_id": "4ce4c534637c6ea8995a5a42"},
  {"foursquare_id": "557be455498e1dcc6bc34d45"}
];

db.locations.insert(locations);
