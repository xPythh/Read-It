module.exports = {

	delay: (ms) => { new Promise(resolve => setTimeout(resolve, ms)); },

	FixQuery(query, template)
	{
		for (var key of Object.keys(template))
		{
			var templateType = typeof template[key];
			var queryType = typeof query[key];

			if (query[key] === undefined || query[key] === null)
			{
				if (Array.isArray(template[key]))
				{
					query[key] = template[key][0];
					templateType = typeof template[key][0];
					queryType = typeof template[key][0];
				} else {
					query[key] = template[key];
					queryType = 'string';
				}
			}

			if (templateType === 'number' && !isNaN(query[key]))
			{
				query[key] = parseInt(query[key]);
				queryType = 'number';
			}

			if (Array.isArray(template[key]))
			{
				if (template[key].indexOf(query[key]) === -1)
					throw new Error(`Value: '${key}' is of value ${query[key]} instead of any of ${template[key]}`);

				templateType = typeof template[key][0];
				queryType = typeof template[key][0];
			}


			if (templateType !== queryType)
				throw new Error(`Value: '${key}' is of type ${queryType} instead of ${templateType}`);

		}
		return query;
	},

	ClearText(text)
	{
		text = text.split("&lt;").join('<')
                   .split("&gt;").join('>')
                   .split("&amp;").join('&')
                   .split("&quot;").join('"')
                   .split("&#39;").join("'");

        text = text.split(/\n/).join(""); // Remove the \n from the innerText
    	text = text.split(/  /).join(""); // Remove the extra spaces caused by the newlines

    	return text;
	}
}

