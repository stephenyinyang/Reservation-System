const db = require('../_helpers/database');
const App = db.App;


module.exports = {
    getDisabled,
    setDisabled
}

async function getDisabled() {
    // make sure there is an app option
    if (await App.findOne({})) {
        return await App.findOne({});
    }
    else {
        const app = new App({
            disabled: false
        });
        // save app option
        await app.save();
        return app;
    }
}

async function setDisabled(option) {
    // make sure there is an app option
    if (await App.findOne({})) {
        return await App.updateOne({}, {$set: {disabled: option.disable}});
    }
    else {
        const app = new App({
            disabled: false
        });
        // save app option
        await app.save();
        return app;
    }
}