
var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app) {
  
    app.get("/api/friends", function(req, res) {
        res.json(friends);
      });
    

      // write a post request of the match. 
      // logic comparing the users values to all the other friends go here. 
      // after finding a suitable friend respond with that friend. 
    app.post("/api/routes", function(req, res){
        var matchedFriend;
        var matchedFriendDifference;

        for(i=0; i<req.body.scores.length; i++){
            req.body.scores[i] = parseInt(req.body.scores[i]);
        }
        
        friends.push(req.body);
        
        matchFriend(matchedFriend, matchedFriendDifference, req);

        res.json(matchedFriend);
        
    });
};



function matchFriend (match, matchTotal, user){
    
    friends.forEach(function(friend){
        var totalOfDifferenceArray;
        var differenceArray = [];

        // we need to loop through the scores and get the difference 
        for(i=0; i<friend.scores.length; i++){
            // differnce between question i 
            var difference = friend.scores[i]-user.body.scores[i];
            //so there are no negative numbers 
            difference = Math.abs(difference);
            differenceArray.push(difference); // difference push to new array 
        }

        for(i=0; i<differenceArray.length; i++){
            // get the total of that new array 
            totalOfDifferenceArray = totalOfDifferenceArray + differenceArray[i];
        }

        // if we dont have a matched friend (the frist loop) then we make the matched friend the first person for now. 
        if(typeof match === "undefined"){
            // make the first friend the match. 
            match = friend;
            matchTotal = totalOfDifferenceArray; 
        }
        // if we have a match we need to check if the other friends have a lower total. 
        else if(matchTotal > totalOfDifferenceArray){
            //if the current matched friend has a greater total than the next friend we replace him 
            match = friend;
            matchTotal = totalOfDifferenceArray; 
        }

        else{
            console.log(match); 
        }

    });
}
