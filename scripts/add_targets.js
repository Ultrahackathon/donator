var targets = [
  {"_id" : ObjectId("563d0d9c93e3d39d8ea8251f"), "name": "nenäpäivä"},
  {"_id" : ObjectId("563d1d9c93e3d39d8ea8251f"), "name": "toinen nenäpäivä"}
]

db.target.remove({})
db.target.insert(targets)
