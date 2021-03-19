const memberService = require('../services/member.service')


module.exports = {
    authenticate,
    getAllMembers,
    register,
    setGoals,
    getGoals,
    deleteMember
};


function authenticate(req, res, next) {
    console.log("Authenticate():", req.body);
       memberService.authenticate(req.body)
        .then(member => member ? res.json(member) : res.status(400).json({ message: 'username or password is incorrect' }))
        .catch(err => next(err));
}

function getAllMembers(req, res, next) {
    //  console.log("getAll", req.body);
    memberService.getAllMembers()
        .then(members => res.json(members))
        .catch(err => next(err));
}

function register(req, res, next) {

   memberService.addMember(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}




// get goals (calorie goal and minute goal) for the specific username in 'req.params...' and send the JSON back the to the member that requested the information. Hint: write a middleware function and add it to the exports.
function getGoals(req, res, next) {
    memberService.getGoals(req.params.username).then((data) => res.json(data)).catch(err => next(err));
}

// set goals (calorie goal and minute goal) for a member. Hint: write a middleware function and add it to the module exports.
function setGoals(req, res, next) {
    memberService.setGoals(req.body, req.member.sub).then(() => res.json({})).catch(err => next(err));
}

function deleteMember(req, res, next) {
  memberService.deleteMember(req.params.username).then(() => res.json("Deleted: 1")).catch(err => next(err));
}
// req.member.username
