var fs = require("fs"); 
var request = require("request"); 
var spotify = require("spotify"); 
var Twitter = require("twitter");
var inquirer = require("inquirer"); 
var twitterKeysCall = require("./keys.js")
var command = process.argv[2];
var value = process.argv[3];
var myKeys;

var client = new Twitter ({
	consumer_key : twitterKeysCall.twitterKeys.consumer_key, 
	consumer_secret : twitterKeysCall.twitterKeys.consumer_secret, 
	access_token_key : twitterKeysCall.twitterKeys.access_token_key,
	access_token_secret : twitterKeysCall.twitterKeys.access_token_secret 
});

//console.log(client); 
 


function GoLiri () { 
	console.log(command);
	if (command == "my-tweets") { 

		function myTweets () { 
			
			client.get("statuses/user_timeline", {screen_name: "BenUTBC2017", count: 20}, function(error, tweets, response) { 
				if (!error) { 
				
					console.log("\nLast 20 tweets: \n" )
					for (var i = 0; i<tweets.length; i++) { 

						console.log("Tweet:\n" + tweets[i].text); 
						console.log("Created: \n" + tweets[i].created_at + "\n-------------------------\n"); 


					}
				} 
				else { 
					console.log(error);
				}

			});
			

		}
		myTweets();
	} 

	else if (command == "spotify-this-song") { 
		console.log(value);
		function runSpot () { 

			spotify.search({type: "track", query: value}, function(err, data) {
    			if ( err ) {
        			console.log('Error occurred: ' + err);
        			return;
    			}

    			 console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
			});
		};
		
		runSpot();
	}

	else { 

		console.log("Command no run");
	}

};
GoLiri();
/*
var spotify = require('spotify');
 
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
});
*/
/*
inquirer.promt ([ 

	//List for liri commands
	{
		type: "list", 
		message: "Your wish is my command...as long as you have 4 specific wishes", 
		choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]

	}

	]).then( function () {


	});
	*/