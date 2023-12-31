const express = require('express')
const app = express();

var Search = require("./Scrapers/Search/search");
var SubSearch = require("./Scrapers/Search/subSearch");

var Subreddit = require("./Scrapers/subreddit");

const Helpers = require("./Helpers");

class Server 
{
	exectPort = 80;

	constructor(port = 80)
	{
		this.exectPort = port;
	}

	start()
	{
		app.listen(this.exectPort);
	}

};

module.exports = Server;

app.get(/\/r\/search?\//, async (req, res) =>
{
	var query = Helpers.FixQuery(req.query, Subreddit.defaultFields);
	var result = await Subreddit.execute(query);
	res.send(result);
});


app.get(/\/r\/[A-Za-z0-9]{1,30}\/search?\//, async (req, res) => 
{
	var query = Helpers.FixQuery(req.query, SubSearch.defaultFields);
	var result = await SubSearch.execute(query, req.originalUrl);
	res.send(result);
});

app.get(/\/r\/[A-Za-z0-9]{1,30}?\//, async (req, res) => 
{
	var query = Helpers.FixQuery(req.query, Subreddit.defaultFields);
	var result = await Subreddit.execute(query, req.originalUrl);
	res.send(result);
});