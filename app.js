const express = require('express')
const api_helper = require('./API_helper')
const app = express()
const port = 3000
const body_parser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);

let sockets = ''

io.on('connection', function(socket){
  	console.log('a user connected');
});

app.get('/index', (req, res) => {
	res.sendFile('index.html', {root : __dirname})
})

 

/*
* Route to DEMO the API call to a REST API Endpoint 
* REST URL : https://jsonplaceholder.typicode.com/todos/1
*/
app.get('/getAPIResponse', (req, res) => {
	api_helper.make_API_call('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
})

/*
** Route to DEMO the How to Read Post Request Parameters In Express
** This route returns the parameters posted to the route
*/
app.post('/postParameter', body_parser.urlencoded({ extended: false }), (req, res) => {
	res.json({
		params : req.body
	})
})

app.get('/download', (req, res) => {
	api_helper.download_file('http://www.peoplelikeus.org/piccies/codpaste/codpaste-teachingpack.pdf', io)
	.then(response => {
		res.send(response)
	})
	.catch(error => {
		res.send(error)
	})
	
})

http.listen(port, () => console.log(`App listening on port ${port}!`))