const { HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY } = require('./httpStatus');

const quantityExists = (req, res, next) => {
  const products = req.body;
  const productQuantity = products.map((item) => item.quantity);
  const quantityCheck = productQuantity.map((quantity) => {
    if (quantity || quantity === 0) return true;
    return false;
  }).every((item) => item);
  if (!quantityCheck) {
    return res.status(HTTP_BAD_REQUEST).send({ message: '"quantity" is required' }); 
  }
  next();
};

const quantityGreaterThanZero = (req, res, next) => {
  const products = req.body;
  const quantityCheck = products.map((item) => {
    if (item.quantity <= 0) return false;
    return true;
  }).every((item) => item);
  if (!quantityCheck) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY)
      .send({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  quantityExists,
  quantityGreaterThanZero,
};
