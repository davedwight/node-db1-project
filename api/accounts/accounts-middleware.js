const Account = require("./accounts-model");
const db = require("../../data/db-config");

exports.checkAccountPayload = (req, res, next) => {
  if (req.body.name === undefined || req.body.budget === undefined) {
    next({
      status: 400,
      message: "name and budget are required",
    });
  } else if (typeof req.body.name !== "string") {
    next({
      status: 400,
      message: "name of account must be a string",
    });
  } else if (
    req.body.name.trim().length < 3 ||
    req.body.name.trim().length > 100
  ) {
    next({
      status: 400,
      message: "name of account must be between 3 and 100",
    });
  } else if (typeof req.body.budget !== "number") {
    next({
      status: 400,
      message: "budget of account must be a number",
    });
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const duplicates = await db("accounts").where("name", req.body.name);
  if (duplicates.length > 0) {
    next({
      status: 400,
      message: "that name is taken",
    });
  } else {
    next();
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await Account.getById(id);
    if (account) {
      req.account = account;
      next();
    } else {
      next({
        status: 404,
        message: "account not found",
      });
    }
  } catch (err) {
    next(err);
  }
};
