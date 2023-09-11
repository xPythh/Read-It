const { parse } = require('node-html-parser');

const Helpers = require("../../Helpers");

module.exports = function (text)
{
	var output = [];

	const root = parse(text);

	var subreddits = root.querySelectorAll("[noun=subreddit]");
	for (var subreddit of subreddits)
	{
		if (subreddit.getAttribute("action") !== "view") continue;

		var link = subreddit.querySelector("a").getAttribute("href");
		var name = subreddit.querySelector("[id^=search-community-title]");
		var members = subreddit.querySelectorAll("faceplate-number")[0].getAttribute("number");
		var online = subreddit.querySelectorAll("faceplate-number")[1].getAttribute("number");
		var description = subreddit.querySelector("[data-testid=search-subreddit-desc-text]");

		output.push({
			link: link,
			name: name.innerText,
			members: parseInt(members),
			online: parseInt(online),
			description: (description) ? Helpers.CleanText(description.innerText) : null
		});
	}
	return output;
}
