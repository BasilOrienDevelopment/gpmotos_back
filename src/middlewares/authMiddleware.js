const verifyAuthentication = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json(false)
    } else {
        return next()
    }
}
export default verifyAuthentication