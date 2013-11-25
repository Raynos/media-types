var test = require("tape")
var testServer = require("test-server")
var mediaTypes = require("..")

testServer(handleRequest, function (request, done) {
    test("json works", function (t) {
        request({
            uri: "/",
            headers: {
                accept: "application/json"
            }
        }, function (e, r, body) {
            t.equal(body, "json")

            t.end()
        })
    })

    test("html works", function (t) {
        request({
            uri: "/",
            headers: {
                accept: "text/html"
            }
        }, function (e, r, body) {
            t.equal(body, "html")

            t.end()
        })
    })

    test("normal works", function (t) {
        request("/", function (e, r, body) {
            t.equal(body, "normal")

            t.end()
        })
    })

    test("error works", function (t) {
        request("/error", function (err, res, body) {
            t.equal(err, null)
            t.equal(res.statusCode, 415)
            t.equal(body, "415 mediaType not supported /error")

            t.end()
        })
    })

    .on("end", done)
})

function handleRequest(req, res) {
    if (req.url === "/error") {
        return mediaTypes()(req, res)
    }

    mediaTypes({
        "application/json": json,
        "text/html": html,
        default: normal
    })(req, res)
}

function json(req, res) {
    res.end("json")
}

function html(req, res) {
    res.end("html")
}

function normal(req, res) {
    res.end("normal")
}
