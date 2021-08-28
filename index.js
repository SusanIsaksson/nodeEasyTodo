const fs = require('fs');
const express = require('express');
const server = express();
const port = 3000;

server.use(express.json());

let task = ["köp mjölk", "sätt igång en tvätt", "fortsätt lära node express"];

server.get('/api', (req, res) => {
    let newTask = fs.readFileSync("todos.json")
    let postTask = JSON.parse(newTask)
    res.json(postTask)
    res.render('index', { task: task, complete: complete});
});

server.post("/api", (req, res) => {
    try {
        let newTask = fs.readFileSync("todos.json")
        let postTask = JSON.parse(newTask)
        postTask.push(req.body)
        fs.writeFileSync("todos.json", JSON.stringify(postTask))

    } catch(err) {
        console.log(Error)
    }
})

let complete = ["finish learning nodejs"];
server.post("/api/removetask", (req, res) => {
    let completeTask = req.body.check;
    if(typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    }else if (typeof completeTask === "object") {
        for (let i = 0; i < completeTask.length; i++) { complete.push(completeTask[i]);
        task.splice(task.indexOf(completeTask[i]), 1);
    }
    }
        res.redirect("/api")
});

server.use(express.static('public'));

server.listen(port, () => {
  console.log(`Servern fungerar - välkommen!`)
})