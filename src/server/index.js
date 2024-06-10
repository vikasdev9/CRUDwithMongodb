const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

const dbUser = "vikas";
const dbPassword = "vikas123";
const dbName = "HabitApp";

const uri = `mongodb+srv://${dbUser}:${encodeURIComponent(
  dbPassword
)}@cluster0.gvseubc.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error Connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  });

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.post("/createUser", (req, res) => {
  const { name, email, age } = req.body;
  UserModel.create({ name, email, age })
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.delete('/deleteUser/:id',(req,res)=>{
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id:id})
  .then(res=>res.json(res))
  .catch(error=>res.json(error))
})

app.listen(3001, () => {
  console.log("Server is Running on port 3001");
});
