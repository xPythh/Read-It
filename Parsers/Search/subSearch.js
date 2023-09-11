const fs = require("fs");
const { parse } = require('node-html-parser');

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
		var image = post.querySelector("faceplate-img").getAttribute("src");
		var upvotes = post.querySelectorAll("faceplate-number")[2].getAttribute("number");
		var comments = post.querySelectorAll("faceplate-number")[3].getAttribute("number");

		output.push({
			time: time,
			title: cleanTitle(title.innerText),
			url: url,
			image: image,
			upvotes: parseInt(upvotes),
			comments: parseInt(comments)
		});
	}
	return output;
}


function cleanTitle(input) 
{
    input = input.split(/\n/).join(""); // Remove the \n from the innerText
    input = input.split(/  /).join(""); // Remove the extra spaces caused by the newlines
    return input;
}