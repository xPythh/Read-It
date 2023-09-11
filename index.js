const express = require('express')
const app = express();

var Search = require("./Scrapers/Search/search");
var SubSearch = require("./Scrapers/Search/subSearch");

app.get(/\/r\/([A-Za-z0-9]{1,30}\/)?search?\//, (req, res) => 
{
	if (/\/r\/search?\//.test(req.originalUrl))
		return Search(req, res);
	else
		return SubSearch(req, res);
});

app.listen(80, () => {
  console.log(`Server is now listening.`)
});