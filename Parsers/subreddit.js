const { parse } = require('node-html-parser');

const Helpers = require("../Helpers");

module.exports = function (text)
{
	var root = parse(text);
	var banner = root.querySelector("shreddit-subreddit-header");

	return {
		name: banner.getAttribute("name"),
		displayName: banner.getAttribute("display-name"),
		description: banner.getAttribute("description"),
		sr_id: banner.getAttribute("subreddit-id"),
		sr_banner: banner.getAttribute("banner-url"),
		members: parseInt(banner.getAttribute("subscribers")),
		online: parseInt(banner.getAttribute("active")),
		rules: cleanRules(root.querySelectorAll("[id^=rule]")),
		menu: root.querySelectorAll("[source=community_menu]").map(elem => {
			return { 
				text: Helpers.ClearText(elem.querySelector("span").innerText),
				link: elem.querySelector("a").getAttribute("href")
			};
		}),
		relatives: root.querySelectorAll("li .relative").map(elem => {
			return {
				name: elem.querySelector("a").innerText,
				members: parseInt(elem.querySelector("span").innerText.replace(/\D/g,'')),
				link: elem.querySelector("a").getAttribute("href")
			};
		})
	}
};

function cleanRules(rules)
{
	var result = [];
	var ruleNumber = 1;
	for (var rule of rules)
	{
		var ruleText = rule.innerText;
		ruleText = Helpers.ClearText(ruleText);
		ruleText = ruleText.trim();
		result.push(`${ruleNumber++}. ${ruleText}`);
	}
	return result;
}