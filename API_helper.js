const request = require('request')
const http = require('http')
const fs = require('fs')

module.exports = {
	/*
	** This method returns a promise
	** which gets resolved or rejected based
	** on the result from the API
	*/
	make_API_call : function(url){
		return new Promise((resolve, reject) => {
			request(url, { json: true }, (err, res, body) => {
			  if (err) reject(err)
			  resolve(body)
			});
		})
	},

	download_file : function(url, io){
		return new Promise((resolve, reject) => {
			let file = fs.createWriteStream('./file.pdf');
			let request = http.get(url, function(response){
				let body = "";
				let chunk_length = 0
				let total_length = parseInt(response.headers['content-length'], 10)
				response.on('data', function(chunk){
					file.write(chunk)
					chunk_length += chunk.length
					let perc = (chunk_length/total_length)*100
					io.sockets.emit('someevent', { for: 'downloaded ', perc });
				})
				response.on('end', function(){
					console.log('done')
					io.sockets.emit('someevent', { for: 'done' });
					resolve(file)
				})
			})
		})
	}
}