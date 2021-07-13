const db = require('../../data/db-config');

const getAll = async () => {
  const records = await db('accounts');
  return records;
}

const getById = async id => {
  const record = await db('accounts').where('id', id).first()
  return record;
}

const create = async (name, budget) => {
  const [id] = await db('accounts').insert({ name, budget });
  const newAccount = await getById(id);
  return newAccount;
}

const updateById = async (id, account) => {
  console.log(id, account);
  const numOfUpdatedRecords = await db('accounts')
    .where('id', id)
    .update(account)
  const updatedRecord = await getById(id);
  return updatedRecord;
}

const deleteById = async id => {
  const toBeDeleted = await getById(id);
  const numOfDeletedRecords = await db('accounts')
    .where('id', id)
    .del()
  return toBeDeleted;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
