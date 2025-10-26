const { BadRequestError } = require("../utils/AppError");

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(", ");
      return next(new BadRequestError(message));
    }
    req.validated = result.data;
    next();
  };
}

module.exports = { validate };
