const expressJwt = require('express-jwt');
const memberService = require('../services/member.service');
const config = require('../config.json');

//const pathToRegexp = require('path-to-regexp');
module.exports = jwt;

//expressJwt(...) returns a function that takes three paramaters req, res and next. Thus, this will register as middleware.
function jwt() {
const secret = config.secret;
    return new expressJwt({ secret , isRevoked, algorithms: ['sha1', 'RS256', 'HS256'], }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/member/register',
            '/member/authenticate',
            // pathToRegexp('/*')
        ]
    });}


async function isRevoked(req, payload, done) {
   // console.log("isRevoked():", req.body, payload);

    const member = await memberService.getByUsername(payload.sub);



   // console.log("user in JWT",user);
    // revoke token if user no longer exists
    if (!member) {

        return done(null, true);
    }

    // done (Function) - A function with signature function(err, secret) to be invoked when the secret is retrieved.
    done();
};
