# media-types [![build status][1]][2]

handle multiple media types

## Example

```
var http = require("http")
    , mediaTypes = require("media-types")

http.createServer(function (req, res) {
    mediaTypes(req, res, {
        "application/json": sendJson
        , "text/html": sendHtml
    })(res)
}).listen(8080)

function sendJson(res) { res.end("json") }

function sendHtml(res) { res.end("html") }
```

## Example with custom error handling

```
var http = require("http")
    , mediaTypes = require("media-types")

http.createServer(function (req, res) {
    mediaTypes(req, res, {
        "application/json": sendJson
        , "text/html": sendHtml
        , default: function (res) {
            res.statusCode = 415
            res.end("I refuse to handle you")
        }
    })(res)
}).listen(8080)

function sendJson(res) { res.end("json") }

function sendHtml(res) { res.end("html") }
```

## Installation

`npm install media-types`

## Tests

`npm test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/media-types.png
  [2]: http://travis-ci.org/Raynos/media-types