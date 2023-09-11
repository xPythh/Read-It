const fetch = require("node-fetch");

const Helpers = require("../../Helpers");

const parser = require("../../Parsers/Search/search");


async function execute(query)
{
	var output = [];

	var entryIndex = 0;
	var entryLimit = (query.limit) ? parseInt(query.limit)*25 : 50*25;

	while (entryIndex < entryLimit)
	{
		var searchData = {
			q: query.q,
			type: "sr",
			sort: query.sort,
			communitiesCursor: Buffer.from(entryIndex.toString()).toString('base64')
		}
		const searchString = '?' + new URLSearchParams(searchData).toString();
		var request = await fetch(`https://www.reddit.com/svc/shreddit/search/${searchString}`);
		var requestHTML = await request.text();
		var result = parser(requestHTML);
		output = output.concat(result);
		entryIndex+= 25;
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
