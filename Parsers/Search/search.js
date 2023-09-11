const { parse } = require('node-html-parser');

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
			description: (description) ? cleanDescription(description.innerText) : null
		});
	}
	return output;
}


function cleanDescription(input) 
{
	input = input.split("&lt;").join('<')
                 .split("&gt;").join('>')
                 .split("&amp;").join('&')
                 .split("&quot;").join('"')
                 .split("&#39;").join("'");

    input = input.split(/\n/).join(""); // Remove the \n from the innerText
    input = input.split(/  /).join(""); // Remove the extra spaces caused by the newlines
    return input;
}