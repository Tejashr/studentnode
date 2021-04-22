const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const URL = "mongodb+srv://tejas:Tejas11@cluster0.vpuuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DB = "students";

app.use(cors())
app.use(express.json())

app.get("/students", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        let students = await db.collection("students").find().toArray();
        res.json(students)
        await connection.close();
    } catch (error) {
        console.log(error)
    }
})

app.get("/mentors", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        let mentors = await db.collection("mentors").find().toArray();
        res.json(mentors)
        await connection.close();
    } catch (error) {
        console.log(error)
    }
})

app.post("/student", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        await db.collection("students").insertOne(req.body);
        await connection.close();
        res.json({
            message: "student created"
        })
    } catch (error) {
        console.log(error)
    }
})

app.post("/mentor", async function (req, res) {
    try {
        req.body.student = [];
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        await db.collection("mentors").insertOne(req.body);
        await connection.close();
        res.json({
            message: "mentor created"
        })
    } catch (error) {
        console.log(error)
    }
})

app.get("/student/:id", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        let student = await db.collection("students").findOne({ _id: mongodb.ObjectID(req.params.id) })
        res.json(student)
        await connection.close();
    } catch (error) {
        console.log(error)
    }
})

app.get("/mentor/:id", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        let mentor = await db.collection("mentors").findOne({ _id: mongodb.ObjectID(req.params.id) })
        res.json(mentor)
        await connection.close();
    } catch (error) {
        console.log(error)
    }
})

app.put("/mentor/:id", async function (req, res) {

    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        await db.collection("mentors").updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: req.body })
        res.json({
            message: "Updated"
        })
        await connection.close();
    } catch (error) {
        console.log(error)
    }

})

app.delete("/student/:id", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        await db.collection("students").deleteOne({ _id: mongodb.ObjectID(req.params.id)})
        await connection.close()
        res.json({
            message: "Deleted"
        })
    } catch (error) {
        console.log(error)
    }
})



app.listen(process.env.PORT||8000)





// let students = [];
// let mentors = [];

// app.get("/students", function (req, res) {
//     res.json(students)
// })

// app.get("/mentors", function (req, res) {
//     res.json(mentors)
// })

// app.post("/student", function (req, res) {
//     req.body.id = students.length + 1;
//     students.push(req.body);
//     res.json({
//         message: "Student Created"
//     })
// })

// app.post("/mentor", function (req, res) {
//     req.body.id = mentors.length + 1;
//     req.body.student=[];
//     mentors.push(req.body);
//     res.json({
//         message: "Mentor Created"
//     })
// })

// app.get("/student/:id", function (req, res) {
//     let studentid = req.params.id;
//     let student = students.find((obj) => obj.id == studentid)
//     if (student) {
//         res.json(student)
//     } else {
//         res.json({
//             message: "User Not Found"
//         })
//     }
// })

// app.delete("/student/:id", function (req, res) {
//     students.splice(students.findIndex(obj => obj.id == req.params.id), 1)
//     res.json({
//         message: "Student Deleted"
//     })
// })

// app.put("/mentor/:id", function (req, res) {
//     let mentorId = req.params.id;
//     let updateData = req.body;

//     // Find the index value of the student id 1
//     let mentorindex = mentors.findIndex((obj) => obj.id == mentorId)
//     let mentorData = mentors[mentorindex]


//     if (mentorData) {
//         // Update the particular key
//         Object.keys(updateData).forEach((keyItem) => {
//             mentorData[keyItem] = updateData[keyItem]
//         })

//         mentors[mentorindex] =mentorData;

//         res.json({
//             message: "mentorUpdate Success"
//         })
//     }else{
//         res.json({
//             message : "No User Found"
//         })
//     }
// })


// app.get("/mentor/:id", function (req, res) {
//     let mentorid = req.params.id;
//     let mentor = mentors.find((obj) => obj.id == mentorid)
//     if (mentor) {
//         res.json(mentor)
//     } else {
//         res.json({
//             message: "User Not Found"
//         })
//     }
// })
