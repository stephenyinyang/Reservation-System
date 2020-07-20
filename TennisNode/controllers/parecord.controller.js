const parecordService = require('../services/parecord.service')

module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord
};


function createPArecord(req, res, next) {
  // via parecordSerice you should add a PA record and respond to the client confirming that the record was successfully added.
    /*
    parecordService.addPArecord(req.body, req.user.sub)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Successfully added' }))
        .catch(err => next(err));
     */

    parecordService.addPArecord(req.body, req.user.sub).then(() => res.json("Recorded!"))
        .catch(err => res.json(err));
}

function getPArecords(req,res,next){
// return all parecords from the database and send to the client.
    /*
    parecordService.getAllPArecords()
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Got all records successfully' }))
        .catch(err => next(err));

     */
    parecordService.getAllPArecords().then((records) => res.json(records))
        .catch(err => res.json(err));
    }


function deletePArecord(req,res,next){

// delete parecord from the database and respond to the client by conforming the action. //req.user.username

    parecordService.deletePArecord(req.params.date, req.user.sub).then(() => res.json("Deleted: 1"))
        .catch(err => res.json(err))
}
