let inventoryList = [];

/**
 * finds an inventory by itemId
 *
 * @param itemId (int)
 *@requires inventory
 */
const getByItemId = (itemId) => {
  const inventory = inventoryList.filter(
    (inventory) => inventory.itemID == itemId
  );
  if (inventory.length === 0) {
    return null;
  }
  return inventory[0];
};

/**
 * adds a new innventory to
 * the list of inventories
 *
 * @returns void
 * @param {object} inventory
 */
const addNewInventory = (inventory) => {
  inventoryList.push(inventory);
};

/**
 * checks if an inventory exists
 * then updates the exisiting inventory
 *
 * @param {object} inventory
 */
const updateInventory = (inventory) => {
  let { itemID, itemName, quantity } = inventory;

  for (let i = 0; i < inventoryList.length; i++) {
    const currentInventory = inventoryList[i];
    if (currentInventory.itemID == itemID) {
      currentInventory.itemName = itemName;
      currentInventory.quantity = quantity;
      inventoryList[i] = currentInventory;
      return currentInventory;
    }
  }
};

/**
 * gets an array of all inventories
 *
 * @returns [] array
 *
 */
const getAllInventory = () => {
  return inventoryList;
};

const deleteAll = () => {
  inventoryList = [];
};

module.exports = {
  updateInventory,
  getAllInventory,
  getByItemId,
  addNewInventory,
  deleteAll,
};
