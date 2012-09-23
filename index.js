var Negotiator = require("negotiator")

module.exports = MediaTypes

function MediaTypes(req, res, object) {
    object = object || {}
    var $default = object.default

    ;delete object.default

    var types = Object.keys(object)
        , neg = new Negotiator(req)
        , mediaType = neg.preferredMediaType(types)

    return object[mediaType] || $default || defaultHandler

    function defaultHandler() {
        res.statusCode = 415
        res.end("415 mediaType not supported " + req.url)
    }
}