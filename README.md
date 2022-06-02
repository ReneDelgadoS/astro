# Astro REST API

This repo holds the source files of an API for an astronomy picture database.\
Allows for consult and data insertion.\
Currently deployed in the IP [35.185.252.75:3000](35.185.252.75:3000)\
Also, an application that shows astronomy pictures that makes use of this API is found in [35.185.252.75:3001](35.185.252.75:3001)

---

This API is built using the Express framework for NodeJS and a database stored in the Google Cloud Platform.\
The original dataset that populated the database is found in the `original-data.json` file and gathered from the [Nasa APOD database](https://api.nasa.gov/#apod).\
Built for the MAKERS Project Assignment.

---

## Entry fields

Each entry in the database is a JSON with the following fields:

- `title` | string | The title of the picture. The maximum character count is 100.
- `explanation` | string | Holds an explanation of the picture. The maximum character count is 1000.
- `url` | string | Holds an URL to the picture.
- `hdurl` | string | Holds an URL to the HD version of the picture.
- `additiondate` | string | Holds the date when the entry was added to the DB in the format "YYYY-MM-DD".

## How to use

The API has two endpoints.

- `/pictures`

The endpoint for selecting entries using a GET request or the insertion of an entry using a POST request.

### Insert an entry

Make a POST request in `/pictures` .latest date

**Parameters**:

+ `key` |  Personal `key` to be able to insert values in the database
+ `entry` |  JSON with the fields `title`,`explanation`,`url` and `hdurl` representing the entry to be inserted.


### Consult entries

Make a GET request in `/pictures`. This returns a JSON with the following **fields** if there is no error:

+ `entries` |  An array with the selected entries
+ `count` |  The size of `entries`. The total amount of entries returned.

**Parameters**\
If the `count` parameter is not specified a single entry with the closest `additiondate` value to the current date will be returned.\
If you want to consult multiple entries or apply filters the `count` parameter should be specified.

- `count` | A positive integer, no greater than 100. Indicates the maximum amount of entries that should be returned from the database.
- `newest_date` | A string in YYYY-MM-DD format indicating the end of a date range. Entries in the range from `newest_date` to `oldest_date` will be returned. If `newest_date`  is not specified the current date will be used.
- `oldest_date` | A string in YYYY-MM-DD format indicating the start of a date range. Entries in the range from `newest_date` to `oldest_date` will be returned. If noot specified the entri with the oldest `additiondate` date will be used.
- `filter` | A string of 50 characters maximum. If specified, the entries returned must contain `filter` in the `title` field or `explanation` field.

Examples:\
`35.185.252.75:3000/pictures`\
`35.185.252.75:3000/pictures?count=100&filter=Venus`\
`35.185.252.75:3000/pictures?count=50&oldest_date=2022-05-29`
