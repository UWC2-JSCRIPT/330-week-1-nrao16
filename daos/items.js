const uuid = require('uuid');

const itemsModel = require('../models/items');

module.exports = {};


module.exports.getAll = () => {
  return itemsModel.items;
}

module.exports.getById = (itemId) => {
  return itemsModel?.items?.find(item => item['id'] === itemId)
}

module.exports.deleteById = async (itemId) => {
  const index = itemsModel?.items?.findIndex(item => item['id'] === itemId);

  if (index >= 0) {
    console.log(`found delete item at index: ${index}`);
    const deleted = itemsModel?.items?.splice(index, 1);
    return deleted[0];
  }
  else return undefined;
}

module.exports.updateById = async (itemId, newObj) => {
  const index = itemsModel?.items?.findIndex(item => item['id'] === itemId);
  if (index >= 0) {
    console.log(`found update item at index: ${index}`);

    itemsModel.items[index] = { ...newObj, id: itemsModel.items[index].id };

    console.log(`updated itemsModel.items[${index}]: ${JSON.stringify(itemsModel.items[index])}`);

    return itemsModel.items[index];
  }
  else return undefined;
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  itemsModel.items.push(newItem);
  return newItem;
}