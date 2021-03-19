module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.Member or 'Member')
    // or an array of roles (e.g. [Role.Admin, Role.Member] or ['Admin', 'Member'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

     return (req, res, next) => {


        if  (roles.length && !roles.includes(req.member.role)) {
            // user's role is not authorized for the given route.
            console.log("Req inside authorize:",roles, req.member, !roles.includes(req.member.role));
            return res.status(501).json({ message: 'Unauthorized' });
        }
        // authentication and authorization successful
        next();
    }
}


