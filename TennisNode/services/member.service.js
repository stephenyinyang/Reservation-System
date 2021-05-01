const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const Member = db.Members;
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');


module.exports = {
    authenticate,
    getAllMembers,
    getByUsername,
    addMember,
    //setGoals,
    //getGoals,
    deleteMember,
    renew
}

async function authenticate({ username, password }) {

    const member = await Member.findOne({ username });
    if (member && bcrypt.compareSync(password, member.hash)) {
        const { hash, ...memberWithoutHash } = member.toObject();
        const token = jwt.sign({ sub: member.id, role: member.role }, config.secret);
        return {
            ...memberWithoutHash,
            token
        };
    }
}

async function getAllMembers() {
    //Returning the result of the promise.
    return await Member.find().select('-hash');
}



async function getByUsername(username) {
    return await Member.find({username:username});
}

async function renew(memberParam) {
    var nextYear = new Date();
    nextYear.setMinutes(nextYear.getMinutes() + 1);

    var j = schedule.scheduleJob(nextYear, async function(){
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vttenniscenter@gmail.com',
            pass: 'tenniscenter1'
        }
        });
        
        var mailOptions = {
        from: 'vttenniscenter@gmail.com',
        to: memberParam.email,
        subject: 'Please Renew Your VT Tennis Center Membership',
        text: 'Hello ' + memberParam.firstName + ',\n\n' +
        'We would like to notify you that your membership at the Burrows-Burleson Tennis Center' +
        ' has expired. Please renew your membership. Please call to let us know if you have any questions.\n\n' +
        'Best wishes,\nJohn Pretz'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        await Member.updateOne({username: memberParam.username}, {$set: {isMember: false}});
    });

    return await Member.updateOne({username: memberParam.username}, {$set: {isMember: true, lastMembershipRenewal: new Date()}});
}

async function addMember(memberParam) {
    if (memberParam.role == "Member") {
        console.log("WTF???");
        var nextYear = new Date();
        nextYear.setMinutes(nextYear.getMinutes() + 1);

        var j = schedule.scheduleJob(nextYear, async function(){
            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vttenniscenter@gmail.com',
                pass: 'tenniscenter1'
            }
            });
            
            var mailOptions = {
            from: 'vttenniscenter@gmail.com',
            to: memberParam.email,
            subject: 'Please Renew Your VT Tennis Center Membership',
            text: 'Hello ' + memberParam.firstName + ',\n\n' +
            'We would like to notify you that your membership at the Burrows-Burleson Tennis Center' +
            ' has expired. Please renew your membership. Please call to let us know if you have any questions.\n\n' +
            'Best wishes,\nJohn Pretz'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            await Member.updateOne({username: memberParam.username}, {$set: {isMember: false}});
        });
    }
    

    // validate
    if (await Member.findOne({ username: memberParam.username })) {
        throw 'Username "' + memberParam.username + '" is already taken';
    }
    else  if (await Member.findOne({ email: memberParam.email })) {
        throw 'Email "' + memberParam.email + '" is already taken';
    }

    const member = new Member(memberParam);

    // hash password
    if (memberParam.password) {
        member.hash = bcrypt.hashSync(memberParam.password, 10);
    }
    // save member
    await member.save();

}


//  complete this function. It takes in calories and minute goal values in 'values' and saves it for a given memberid (_id). Hint: use 'updateOne' from mongoose.
/*async function setGoals(values, memberid) {
    if (await Member.findOne({_id: memberid})) {
        await Member.updateOne({_id: memberid}, {$set: {caloriegoal: values.caloriegoal, minutegoal: values.minutegoal}})
    }
    else {
        throw 'Member ID not found'
    }
}


//  complete this function. It should return calorie and minute goals for a given member.
async function getGoals(username) {
        if (await Member.findOne({ username: username })) {
            return await Member.findOne({username:username}, 'caloriegoal minutegoal');
        }
        else {
            throw 'Member not found';
        }
}*/

async function deleteMember(username)
{
  if (await Member.findOne({ username: username})) {
    await Member.deleteOne({ username: username});
  }
  else if (!(await Member.findOne({ username: username}))){
    throw 'Deleted: 0';
  }
}

