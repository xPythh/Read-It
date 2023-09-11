const { parse } = require('node-html-parser');

const Helpers = require("../../Helpers");

module.exports = function (text)
{
	var output = [];

	const root = parse(text);
	
	var posts = root.querySelectorAll("[data-testid=search-post]");
	for (var post of posts)
	{
		if (post.getAttribute("action") !== "view") continue;

		var time = post.querySelector("faceplate-timeago").getAttribute("ts");
		var title = post.querySelector("[data-testid=post-title-text]");
		var url = post.querySelector("[data-testid=post-title]").getAttribute("href");
		var image = post.getElementsByTagName("faceplate-img")[3];
		var upvotes = post.querySelectorAll("faceplate-number")[2].getAttribute("number");
		var comments = post.querySelectorAll("faceplate-number")[3].getAttribute("number");

		output.push({
			time: time,
			title: Helpers.ClearText(title.innerText),
			url: url,
			image: (image) ? image.getAttribute("src") : null,
			upvotes: parseInt(upvotes),
			comments: parseInt(comments)
		});
	}
	return output;
}
