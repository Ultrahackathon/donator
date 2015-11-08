# Add locations to mongo
# mongo [database] < add_locations.js

var locations = [
  {"foursquare_id": "4af5e40ff964a52061fe21e3", "lat": "60.1694500277430748", "lng": "24.9308538436889648"},
  {"foursquare_id": "4d668318838654815d27f953", "lat": "60.1709297546109951", "lng": "24.9295911916104096"},
  {"foursquare_id": "4c3afa501a1cd13a288bb50d", "lat": "60.1695674396748572", "lng": "24.9290299415588379"},
  {"foursquare_id": "5195baea498ed362449f1a83", "lat": "60.1701193349775281", "lng": "24.9303804308258492"},
  {"foursquare_id": "50129094e4b001b3387684e0", "lat": "60.1698036193847656", "lng": "24.9300994873046875"},
  {"foursquare_id": "543f5891498e9cf376eea8ac", "lat": "60.1698999999999984", "lng": "24.9300840000000008"},
  {"foursquare_id": "4cc82783fa03224bbe9642ef", "lat": "60.188894028402096",  "lng": "24.91242471176862"},
  {"foursquare_id": "4c409527a5c5ef3b9d05b06f", "lat": "60.17063480162678",   "lng": "24.94136810302734"},
  {"foursquare_id": "4afaa120f964a5202f1822e3", "lat": "60.16919919175583",   "lng": "24.92974877357483"},
  {"foursquare_id": "5479be61498ee2521eaffa02", "lat": "60.16890162136659",   "lng": "24.929285037470006"},
  {"foursquare_id": "51805895e4b0dce6ddc1d0cd", "lat": "60.1699783781317",    "lng": "24.927796125411987"},
  {"foursquare_id": "4ce4c534637c6ea8995a5a42", "lat": "60.192876",           "lng": "24.946963023394346"},
  {"foursquare_id": "557be455498e1dcc6bc34d45", "lat": "60.192613120403685",  "lng": "24.946334302214407"},
  {"foursquare_id": "563cfb9ecd10033088b8009b", "lat": "60.19275951652066",   "lng": "24.948040743576232"},
  {"foursquare_id": "50065d2ae4b0ece405c9bbf9", "lat": "60.19378324004031",   "lng": "24.94760706528283"},
  {"foursquare_id": "50c0f510e4b0c9670fa58d3a", "lat": "60.19260787963867",   "lng": "24.948362350463867"}
]

db.locations.remove({})
db.locations.insert(locations)
