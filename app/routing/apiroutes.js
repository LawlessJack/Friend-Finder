var friends = require('../data/friends.js');

// API GET Requests - when users "visit" a page. 
// (ex:localhost:PORT/api/admin...they are shown a JSON of the data in the table) 


var bestmatch;
module.exports = function (app) {
	app.get('/friends', function (req, res) {
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

		//loop through the friends data array of objects to get each friends scores
		// ?????
		for (var i = 0; i < friends.length - 1; i++) {
			totalDifference = 0;

			//loop through that friends score and the users score and calculate the 
			// absolute difference between the two and push that to the total difference variable set above
			for (var j = 0; j < 6; j++) {
				// We calculate the difference between the scores and sum them into the totalDifference
				console.log(friends[i]);
				totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(friends[i].scores[j]));
				
				// If the sum of differences is less then the differences of the current "best match"
			}
			console.log(totalDifference);
			if (totalDifference <= Match.matchDifference) {

				// Reset the bestMatch to be the new friend. 
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