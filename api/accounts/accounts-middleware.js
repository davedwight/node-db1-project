exports.checkAccountPayload = (req, res, next) => {
  if (req.body.name === undefined || req.body.budget === undefined) {
    next({
      status: 400,
      message: "name and budget are required",
    })
  } else if (typeof req.body.name !== 'string') {
      next({
        status: 400,
        message: "name of account must be a string",
      })
  } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    next({
      status: 400,
      message: "name of account must be between 3 and 100",
    })
  } else if (typeof req.body.budget !== 'number') {
    next({
      status: 400,
      message: "budget of account must be a number",
    })
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
      next({
        status: 400,
        message: "budget of account is too large or too small",
      })
  } else {
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}
