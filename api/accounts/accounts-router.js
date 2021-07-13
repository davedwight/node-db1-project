const router = require("express").Router();

const Account = require("./accounts-model");

const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  res.json(req.account);
});

router.post("/", checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const post = await Account.create(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const updatedRecord = await Account.updateById(req.params.id, req.body);
      res.json(updatedRecord);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
