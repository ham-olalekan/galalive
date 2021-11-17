const express = require("express");
const router = express.Router();
const inventoryService = require("../service/inventory");

router.post("/", (req, res) => {
  const payload = req.body;

  //reject empty payload
  if (payload.length == 0) {
    return res.status(400).send("Inventory list must contain atleast one item");
  }

  payload.forEach((inventory) => {
    const existingInventory = inventoryService.getByItemId(inventory.itemID);

    if (!existingInventory) {
      inventoryService.addNewInventory(inventory);
    } else {
      inventoryService.updateInventory(inventory);
    }
  });

  return res.status(200).send({
    status: true,
    message: "Inventory updated successfully",
    data: inventoryService.getAllInventory(),
  });
});

module.exports = router;
