const httpStatus = require('http-status');
const Service = require('./service.model');


exports.get = async (req, res, next) => {
  try {
    const services = await Service.find().populate('service_file service_result');
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

exports.update = async (req, res, next) => {
  try {
    Service.findByIdAndUpdate({
      _id: req.body.id,
    }, req.body.data, (err, doc) => {
      if (err) {
        next(err);
      } else {
        res.json({
          doc,
        });
      }
    });
  } catch (e) {
    next(e);
  }
};
