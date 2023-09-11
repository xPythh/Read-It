const fetch = require("node-fetch");

const Helpers = require("../Helpers");

const parser = require("../Parsers/subreddit");


async function execute(query, url)
{
	var output = {};

	var subReddit = url.split("/")[2];

	var request = await fetch(`https://www.reddit.com/r/${subReddit}`);
	var requestHTML = await request.text();

	var result = parser(requestHTML);
	return result;
}



module.exports = {
	defaultFields: {},
	execute: execute 
}
