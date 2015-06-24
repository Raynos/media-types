var Negotiator = require("negotiator")
var vary = require("vary");

module.exports = MediaTypes

function MediaTypes(object) {
    object = object || {}

    var $default = object.default
    ;delete object.default
    var types = Object.keys(object)

    return requestHandler

    function requestHandler(req, res) {
        var neg = new Negotiator(req)
        var mediaType = neg.mediaType(types)

        var handler = object[mediaType] || $default || defaultHandler
        vary(res, "Accept")

        return handler.apply(this, arguments)
    }
}

function defaultHandler(req, res) {
    res.statusCode = 415
    res.end("415 mediaType not supported " + req.url)
}
