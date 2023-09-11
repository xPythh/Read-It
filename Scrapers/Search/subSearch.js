const fetch = require("node-fetch");

const Helpers = require("../../Helpers");

const parser = require("../../Parsers/Search/subSearch");

async function execute(query, url)
{
	var output = [];

	var subReddit = url.split("/")[2];

	var entryIndex = 0;
	var entryLimit = (query.limit) ? parseInt(query.limit)*25 : 50*25;

	while (entryIndex < entryLimit)
	{
		var searchData = {
			q: query.q,
			type: "link",
			sort: query.sort,
			postsCursor: Buffer.from((entryIndex).toString()).toString('base64')
		}
		const searchString = '?' + new URLSearchParams(searchData).toString();
		var request = await fetch(`https://www.reddit.com/svc/shreddit/r/${subReddit}/search/${searchString}`);
		var requestHTML = await request.text();
		var result = parser(requestHTML);
		output = output.concat(result);
		entryIndex += 25;
		await Helpers.delay(200);
	}
	return output;
}


module.exports = {
	defaultFields: 
	{
		q: "Example",
		sort: "hot",
		limit: 5
	},
	execute: execute 
}
