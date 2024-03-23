const express = require("express");
const cors =  require('cors')

const app = express()
app.use(express.json())
app.use(cors())

let tasks = [
    { id: 1, task: 'Start creating redux', completed: true },
    { id: 2, task: 'Start learning react', completed: false }
]

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
})

app.post("/api/tasks", (req, res) => {
    const newTask = { id: tasks.length + 1, ...req.body, completed: false }
    tasks.push(newTask)
    console.log(tasks)
    res.json(newTask)
})

app.patch("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    const task = tasks[index]
    task.completed = req.body.completed

    res.json(task)
})

app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter((task) => task.id !== id)
    res.json({id})
})

app.listen(5000,()=>console.log("server running on 5000"))