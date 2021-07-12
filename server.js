//Install express server
const express = require('express');
// Requirement of path Module in order to manage URLS
const path = require('path');
const app = express();
// Serve only the static files form the dist directory
app.use(express.static('https://funficprojectwebserver.herokuapp.com/dist/FinFickProject'));
app.get('/*', function(req,res) {
  res.sendFile(path.join('https://funficprojectwebserver.herokuapp.com/dist/FinFickProject/src/app/app.component.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
