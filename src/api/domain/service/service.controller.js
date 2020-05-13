/* eslint-disable max-len */
const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');
const Service = require('./service.model');
const ZarinpalCheckout = require('../../services/payment');


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


// function Payment() {

// }

exports.changeServicePaymentStatus = async (req, res, next) => {
  try {
    const authority = req.body.authority || false;
    const serviceId = req.body.service || false;
    if (authority && serviceId) {
      // check Authority by ZarinPalAPI
      const service = await Service.updateOne({ _id: serviceId }, { $set: { payment_status: true } });
      if (service) {
        res.end();
        return;
      }

      res.json({
        error: '',
      });
    } else {
      throw new APIError({
        message: 'Some thing wrong !',
        status: httpStatus.NOT_FOUND,
      });
    }
  } catch (error) {
    next(error);
  }
};


exports.create = async (req, res, next) => {
  try {
    // Payment

    const serviceData = {
      price: req.price || 0,
      mobile: req.mobile || '',
    };

    const data = req.body;
    const service = new Service(data);
    const savedService = await service.save();

    if (!savedService) {
      throw new APIError({
        message: 'Can Not Save Receipt',
        status: httpStatus.NOT_FOUND,
      });
    }

    const zarinpal = await ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
    const serviceId = savedService._id;
    if (!serviceId) {
      throw new APIError({
        message: 'Some thing wrong !',
        status: httpStatus.NOT_FOUND,
      });
    }
    await zarinpal.PaymentRequest({
      Amount: '1000',
      CallbackURL: `http://localhost:3000/service/payment?id=${serviceId}`,
      Description: 'ELMA-CENTER',
    }).then(async (response) => {
      if (response.url && response.status == 100) {
        const callBackUrl = response.url || false;

        if (callBackUrl) {
          // res.redirect(callBackUrl);
          res.json({
            status: 201,
            data: savedService,
            redirect: callBackUrl,
          });
        }
      } else {
        res.json({
          error: '',
          status: 500,
          redirect: 'http://localhost:3000/service/i/s',
          data: savedService,
        });
      }
    });

    // console.log('After payment');
    // res.json({
    //   data: savedService,
    // });
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
