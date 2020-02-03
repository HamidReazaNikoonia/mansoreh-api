const httpStatus = require('http-status');
const Service = require('./service.model');


exports.get = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(httpStatus.OK);
    res.json({
      data: services,
    });
  } catch (e) {
    next(e);
  }
};


exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    const service = new Service(data);
    const savedService = await service.save();
    res.status(httpStatus.CREATED);
    res.json({
      data: savedService,
    });
  } catch (e) {
    next(e);
  }
};
