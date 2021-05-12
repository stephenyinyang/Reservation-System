const appService = require('../services/app.service')


module.exports = {
    getDisabled,
    setDisabled
};

function getDisabled(req, res, next) {
    appService.getDisabled().then((data) => res.json(data)).catch(err => next(err));
}

function setDisabled(req, res, next) {
    appService.setDisabled(req.body).then(() => res.json({})).catch(err => next(err));
}
