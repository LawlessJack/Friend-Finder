var friends = require('../data/friends.js');

// API GET Requests - when users "visit" a page. 
// (ex:localhost:PORT/api/admin...they are shown a JSON of the data in the table) 


var bestmatch;
module.exports = function (app) {
	app.get('/api/friends', function (req, res) {
		res.json(friends);
	});

	//API POST Request-handles when user submits a form & thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array


	app.post('/api/friends', function (req, res) {
		console.log(req.body);
		var Match = {
			name: "",
			image: "",
			matchDifference: 1000
		};
		var usrData = req.body;
		var usrName = usrData.name;
		var usrImage = usrData.image;
		var usrScores = usrData.scores;
		var totalDifference = 0;

		for (var i = 0; i < friends.length - 1; i++) {
			totalDifference = 0;

			
			for (var j = 0; j < 6; j++) {
				
				console.log(friends[i]);
				totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(friends[i].scores[j]));
				
			}
			console.log(totalDifference);
			if (totalDifference <= Match.matchDifference) {

				Match.name = friends[i].name;
				Match.photo = friends[i].photo;
				Match.matchDifference = totalDifference;
			}
		}

		bestmatch = Match;
		console.log(bestmatch);
		res.json(Match);
	});
}; 