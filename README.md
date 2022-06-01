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

- `title` | string | The title of the picture. Maximum character count is 100.
- `explanation` | string | Holds an explanation of the picture. Maximum character count is 1000.
- `url` | string | Holds an URL to the picture.
- `hdurl` | string | Holds an URL to the HD version of the picture.
- `additiondate` | string | Holds the date when the entry was added to the DB in format "YYYY-MM-DD".

Entries in the database are ordered by title.

## How to use

The API has two endpoints.

- `/pictures`

The endpoint for selecting entries using GET request or the insertion of an entry using POST request.

- `/pictures/info`

This endpoint returns general information of the database.

Try it:

`35.185.252.75:3000/pictures/info`

### Insert an entry

Make a POST request in `/pictures` .

**Parameters**:

+ `key` |  Personal `key` to be able to insert values in the database
+ `entry` |  Entry to be inserted


### Consult entries

Make a GET request in `/pictures`. This returns a JSON with the following **fields** if there is no error:

+ `entries` |  An array with the selected entries
+ `collection_size` |  The size of the collection filtered from the database from which the entries are from. If no filter was applied then the collection is the whole database. `entries` field is a fraction of the collection.
+ `count` |  The size of `entries`. The total amount of entries returned.
+ `filter` |  The `title` field or `explanation` field of the entries that make up the collection should contain the `filter` string as substring, If `filter` is an empty string no filter was applied.

**Parameters**\
If the `count` parameter is not specified a single arbitrary entry will be returned in `entries` and no other specified parameters will be used.\
If you want to consult multiple entries or apply filters the `count` parameter should be specified.

- `count` | A positive integer, no greater than 100. Indicates the maximum amount of entries that should be returned from the collection.
- `firstEntry` | A positive integer. It indicates from which entry forwards of the collection the entries that will make up the `entries` field are from. If not specified its default value is 1, meaning the first entry of the database and the `count`-1 following entries will be returned in the `entries` field. Keep in mind the database is ordered by the `title`. If `firstEntry` is bigger than the size of the collection a `404` error will be returned.
- `filter` | A string of 50 characters maximmun. If specified, the `title` field or `explanation` field of the entries that will make up the collection should contain the `filter` string as substring.  If `filter` is not specified no filter will be applied.

Examples:\
`35.185.252.75:3000/pictures`\
`35.185.252.75:3000/pictures?count=100&filter=Venus`\
`35.185.252.75:3000/pictures?count=50&firstEntry=20`
