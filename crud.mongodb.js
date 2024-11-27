// CRUD Operations
use("CRUDdb")

console.log(db)

// CREATE

db.createCollection("courses")

db.courses.insertOne({
    name: "Taha is GENIUS.",
    price: 0,
    assignments: 12,
    projects: 45
})

db.courses.insertMany([
    {
        "name": "Taha entry 1",
        "price": 0,
        "assignments": 5,
        "projects": 10
    },
    {
        "name": "Taha entry 2",
        "price": 10,
        "assignments": 10,
        "projects": 20
    },
    {
        "name": "Taha entry 3",
        "price": 20,
        "assignments": 15,
        "projects": 30
    },
    {
        "name": "Taha entry 4",
        "price": 30,
        "assignments": 20,
        "projects": 40
    },
    {
        "name": "Taha entry 5",
        "price": 40,
        "assignments": 25,
        "projects": 50
    },
    {
        "name": "Taha entry 6",
        "price": 50,
        "assignments": 30,
        "projects": 60
    },
    {
        "name": "Taha entry 7",
        "price": 60,
        "assignments": 35,
        "projects": 70
    },
    {
        "name": "Taha entry 8",
        "price": 70,
        "assignments": 40,
        "projects": 80
    },
    {
        "name": "Taha entry 9",
        "price": 80,
        "assignments": 45,
        "projects": 90
    },
    {
        "name": "Taha entry 10",
        "price": 90,
        "assignments": 50,
        "projects": 100
    }
])

// READ

let a = db.courses.find({price: 0})

console.log(a.toArray())

console.log(a.count())

let b = db.courses.findOne({price: 0})

console.log(b)

// UPDATE

db.courses.updateOne({price: 100}, {$set: {price: 10}})

db.courses.updateMany({price: 10}, {$set: {price: 1000}})

// DELETE

db.courses.deleteMany({price: {$gte: 0}})