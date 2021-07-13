const router = require('express').Router();

const Account = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Account.getById(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const post = await Account.create(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedRecord = await Account.updateById(req.params.id, req.body);
    console.log(updatedRecord);
    res.json(updatedRecord);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedRecord = await Account.deleteById(req.params.id);
    console.log(deletedRecord);
    res.json(deletedRecord);
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
