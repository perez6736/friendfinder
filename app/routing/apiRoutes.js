
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

        for(i=0; i<req.body.scores.length; i++){
            req.body.scores[i] = parseInt(req.body.scores[i]);
        }
        
        friends.push(req.body);
        
    });
};
  