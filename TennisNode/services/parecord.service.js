const db = require('../_helpers/database');
const PArecord = db.PArecord;


module.exports = {
    getAllPArecords,
   addPArecord,
   deletePArecord
}


//: write the necessary functions that will address the needs of parecord.controller. Hint: look at the signatures in the module.exports. Hint2: look at user.service to see how you can interact with the database. Hint3: look at the class material.

async function getAllPArecords() {
    return await PArecord.find().populate('createdBy'); //check if need hash or curly brackets later
}

async function deletePArecord(date, username) {
    if (await PArecord.findOne({ createdBy: username, createdDate: date })) {
        await PArecord.deleteOne({ createdBy: username, createdDate: date });
    }
    else if (!(await PArecord.findOne({ createdBy: username, createdDate: date }))){
        throw 'Deleted: 0';
    }
}

async function addPArecord(parecord, username) {


    // validate
    if (await PArecord.findOne({ createdBy: username, createdDate: parecord.createdDate  })) {
        throw 'Parecord created by"' + parecord.createdBy +" on "+ parecord.createdDate +'" already exists';
    }
    else if(!username){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }
    //populate missing fields in the parecord object
    let newrecord= parecord;

    parecord.createdBy = username;

    parecord.createdDate =  Date.now();

    dbrecord = new PArecord(newrecord);

    await dbrecord.save();

}
