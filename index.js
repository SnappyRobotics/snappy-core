const http = require('http')
const express = require("express")
const path = require('path')

const RED = require("node-red")

// Create an Express app
var app = express()




// Add a simple route for static content served from 'public'
app.use("/", express.static("public"))



// ================================= RED =======================================
var red_settings = require(path.join(__dirname, 'data', 'red-settings'))

var server = http.createServer(app) // Create a server

RED.init(server, red_settings) // Initialise the runtime with a server and settings

app.use(red_settings.httpAdminRoot, RED.httpAdmin) // Serve the editor UI from /red
app.use(red_settings.httpNodeRoot, RED.httpNode) // Serve the http nodes UI from /api

server.listen(8000)

RED.start() // Start the runtime