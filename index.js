var Negotiator = require("negotiator")

var varySplitter = / *, */

module.exports = MediaTypes

function MediaTypes(object) {
    object = object || {}

    var $default = object.default
    ;delete object.default
    var types = Object.keys(object)

    return requestHandler

    function requestHandler(req, res) {
        var neg = new Negotiator(req)
        var mediaType = neg.preferredMediaType(types)

        var handler = object[mediaType] || $default || defaultHandler
        vary(req, res, "Accept")

        return handler.apply(this, arguments)
    }
}

function vary(req, res, header) {
    var varyHeader = res.getHeader(header)
    if (varyHeader) {
        var parts = varyHeader.split(varySplitter)
        if (parts.indexOf(header) === -1) {
            parts.push(header)
        }
        res.setHeader(header, parts.join(", "))
    } else {
        res.setHeader(header, "Accept")
    }
}

function defaultHandler(req, res) {
    res.statusCode = 415
    res.end("415 mediaType not supported " + req.url)
}
