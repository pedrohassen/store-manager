const { HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY } = require('./httpStatus');

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(HTTP_BAD_REQUEST).send({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY)
      .send(
    { message: '"name" length must be at least 5 characters long' },
  ); 
}
  next();
};

module.exports = nameValidation;
