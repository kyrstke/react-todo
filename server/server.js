// set up ======================================================================
const http = require("http");
const express = require("express");
const mongoose = require("mongoose"); // mongoose for mongodb
const cors = require("cors");
require("dotenv").config();

const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const path = require("path");

const port = 4000;

// configuration ===============================================================
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
); // connect to mongoDB database on modulus.iox 

const app = express(); // create our app w/ express

app.set("port", process.env.PORT || port);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // set the static files location /public/img will be /img for users

// define model ================================================================
const Todo = mongoose.model("Todo", {
    text: String,
    done: Boolean
});

// routes ======================================================================
app.use(cors());

// api ---------------------------------------------------------------------
// get all todos
app.get("/api/todos", function (req, res) {
    // use mongoose to get all todos in the database
    Todo.find().then((err, todos) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
            return;
        }
        console.log("GET todos");
        res.json(todos); // return all todos in JSON format
    });
});

app.get("/api/todos/:todo_id", function (req, res) {
    // use mongoose to get all todos in the database
    Todo.find({ _id: req.params.todo_id }).then((err, todo) => {
        if (err) res.send(err);
        console.log("GET todo", todo);
        res.json(todo);
    });
});

// create todo and send back all todos after creation
app.post("/api/todos", function (req, res) {
    // create a todo, information comes from AJAX request from Angular
    Todo.create(
        {
            text: req.body.text,
            done: false,
        }
    ).then((err, todo) => {
        if (err) res.send(err);
        console.log("POST todo");
        res.json(todo);
    });
});

// app.patch("/api/todos", function (req, res) {});

app.put("/api/todos/:todo_id", function (req, res) {
    Todo.findByIdAndUpdate(
        req.params.todo_id, { done: req.body.done }
    ).then((todo) => {
        console.log("PUT todo");
        res.json(todo);
    });
});

// delete a todo
app.delete("/api/todos/:todo_id", function (req, res) {
    Todo.deleteOne({_id: req.params.todo_id,}
        ).then((err) => {
            if (err) res.send(err);
            console.log("Data deleted");
        });
});

// application -------------------------------------------------------------
// app.get("*", function (req, res) {
//     res.sendFile("./public/index.html", { root: __dirname });
// });

// listen (start app with node server.js) ======================================
const server = http.createServer(app);
server.listen(app.get("port"), function () {
    console.log("Express server listening on: http://localhost:" + app.get("port"));
});
