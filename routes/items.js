const { Router } = require("express");
const router = Router();

const itemDao = require('../daos/items');

router.get("/", (req, res, next) => {
  res.json(itemDao.getAll())
});

router.get("/:id", async (req, res, next) => {
  const queryId = req.params.id;
  console.log(`queryId:${queryId}`);

  const retrievedItem = await itemDao.getById(queryId);
  console.log(`retrievedItem:${JSON.stringify(retrievedItem)}`);

  if (retrievedItem) {
    res.json(retrievedItem);
  } else {
    res.sendStatus(404)
  }
});

router.post("/", async (req, res, next) => {
  await itemDao.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", async (req, res, next) => {
  const updateId = req.params.id;
  console.log(`updateId:${updateId}`);
  console.log(`request updateItem:${JSON.stringify(req.body)}`);

  const updatedItem = await itemDao.updateById(updateId, req.body);
  console.log(`updatedItem:${JSON.stringify(updatedItem)}`);

  res.json(updatedItem);
});

router.delete("/:id", async (req, res, next) => {
  const deleteId = req.params.id;
  console.log(`deleteId:${deleteId}`);

  const deletedItem = await itemDao.deleteById(deleteId);
  console.log(`deletedItem:${JSON.stringify(deletedItem)}`);

  res.json(deletedItem);
});

module.exports = router;
