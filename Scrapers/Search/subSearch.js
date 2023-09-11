const fetch = require("node-fetch");

const parser = require("../../Parsers/Search/subSearch");

module.exports = async function (req, res)
{
	var output = [];

	var subReddit = req.originalUrl.split("/")[2];

	var entryIndex = 0;
	var entryLimit = (req.query.limit) ? parseInt(req.query.limit)*25 : 50*25;

	while (entryIndex < entryLimit)
	{
		var searchData = {
			q: req.query.q,
			type: "link",
			sort: req.query.sort,
			postsCursor: Buffer.from((entryIndex).toString()).toString('base64')
		}
		const searchString = '?' + new URLSearchParams(searchData).toString();
		var query = await fetch(`https://www.reddit.com/svc/shreddit/r/${subReddit}/search/${searchString}`);
		var queryHTML = await query.text();
		var result = parser(queryHTML);
		output = output.concat(result);
		entryIndex += 25;
		await delay(200);
	}
	return res.send(output);
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 