var donors = [
  {
    "_id" : ObjectId("563d0d9c93e3d39d8ea8251f"),
    "name": "ultrahack",
    "templates": [{"max_sum": 10000, "sum_per_checkin": 5, "location": "4bf58dd8d48988d180941735"}]
  },
  {
    "_id" : ObjectId("663d0d9c93e3d39d8ea8251f"),
    "name": "slush",
    "templates": [{"max_sum": 10000, "sum_per_checkin": 50, "location": "557be455498e1dcc6bc34d45"}]
  },
]

db.donor.remove({})
db.donor.insert(donors)
