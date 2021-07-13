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
