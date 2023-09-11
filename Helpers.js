module.exports = {

	delay: (ms) => { new Promise(resolve => setTimeout(resolve, ms)); },

	FixQuery(query, template)
	{
		for (var key of Object.keys(template))
		{
			if (query[key] === undefined || query[key] === null)
				query[key] = template[key];

			var templateType = typeof template[key];
			var queryType = typeof query[key];

			if (templateType === 'number' && !isNaN(query[key]))
			{
				query[key] = parseInt(query[key]);
				queryType = 'number';
			}

			if (templateType !== queryType)
				throw new Error(`Value: '${key}' is of type ${queryType} instead of ${templateType}`);

		}
		return query;
	}
}

