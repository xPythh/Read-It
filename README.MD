
# Read-It
The unofficial Reddit API

This API has for objective to be as close as possible to the original Reddit API.
It will obviously not has as much features, but it will be better than nothing.


TODO:
- 📝 Add support for type link & user (Only does SR) on /search and /r/*/search
- 🚧 Make the two different constructors: ✅ ExpressJS API & ❌ Method Calling Directly
- 📝 Add a delay between each request to avoid any rate-limit
- 🚧 Add checks to the req.query's to make sure they are properly formed



Contributors:
| Name  | Role | Discord |
| ------------- | ------------- | ------------- |
| xPythh  | Project Creator  | @xPyth | 
| Please  | Come Help Me  | ^^^^^ | 



API:

Purpose: Search for a Subreddit
```
GET: /r/search/
Parameters:
  q: The query data
  limit: The amount of pages to search, each page has 25 records
  sort: How will the data be fetched (relevance, hot, top, new, comments)
```
Purpose: Search for Subreddit posts
```
GET: /r/*/search/
Parameters:
  q: The query data
  limit: The amount of pages to search, each page has 25 records
  sort: How will the data be fetched (relevance, hot, top, new, comments)
```
Purpose: Fetch Subreddit informations
```
GET: /r/*/
```
