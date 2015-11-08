var donors = [
  {
    "_id" : ObjectId("563d0d9c93e3d39d8ea8251f"),
    "name": "ultrahack",
    "templates": [
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "4bf58dd8d48988d180941735", "target_id": "563d0d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "4af5e40ff964a52061fe21e3", "target_id": "563d0d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "4d668318838654815d27f953", "target_id": "563d0d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "4c3afa501a1cd13a288bb50d", "target_id": "563d0d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "5195baea498ed362449f1a83", "target_id": "563d0d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "50129094e4b001b3387684e0", "target_id": "563d0d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "543f5891498e9cf376eea8ac", "target_id": "563d1d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "4cc82783fa03224bbe9642ef", "target_id": "563d1d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "4c409527a5c5ef3b9d05b06f", "target_id": "563d1d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "4af5e40ff964a52061fe21e3", "target_id": "563d1d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "5479be61498ee2521eaffa02", "target_id": "563d1d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "51805895e4b0dce6ddc1d0cd", "target_id": "563d1d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 5, "location": "4ce4c534637c6ea8995a5a42", "target_id": "563d1d9c93e3d39d8ea8251f"},
      {"max_sum": 10000, "sum_per_checkin": 3, "location": "50065d2ae4b0ece405c9bbf9", "target_id": "563d1d9c93e3d39d8ea8251f"}
    ]
  },
  {
    "_id" : ObjectId("663d0d9c93e3d39d8ea8251f"),
    "name": "slush",
    "templates": [
      {"max_sum": 10, "sum_per_checkin": 50, "location": "557be455498e1dcc6bc34d45", "target_id": "563d0d9c93e3d39d8ea8251f"},
      {"max_sum": 10, "sum_per_checkin": 10, "location": "563cfb9ecd10033088b8009b", "target_id": "563d0d9c93e3d39d8ea8251f"},
      {"max_sum": 10, "sum_per_checkin": 10, "location": "50c0f510e4b0c9670fa58d3a", "target_id": "563d0d9c93e3d39d8ea8251f"}
    ]
  },
]

db.donor.remove({})
db.donor.insert(donors)
