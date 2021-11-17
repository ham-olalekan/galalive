const inventoryService = require("./inventory");
const { NotFoundError, OutOfStockError } = require("../errors/errors");

let salesList = [];

/**
 * creates a new sales object
 * for purchase made a show
 *
 * @param {int} showId
 * @param {int} itemId
 * @param {int} quantity
 */
const createShowSale = (showId, itemId, quantity) => {
  const salesItemInventory = inventoryService.getByItemId(itemId);

  if (!salesItemInventory) {
    throw new NotFoundError("Invalid item!");
  }

  if (salesItemInventory.quantity == 0) {
    throw new OutOfStockError("We're sorry, Item is currently out of stock!");
  }

  const newSale = {
    showId,
    itemId,
    quantity,
    itemName: salesItemInventory.itemName,
    timeCreated: Date.now,
  };

  salesList.push(newSale);

  //update inventory
  salesItemInventory.quantity -= 1;
  inventoryService.updateInventory(salesItemInventory);
  return newSale;
};

/**
 * fetches a list of all
 * sales made at a show
 *
 * @param {*} showId
 * @returns []
 */
const fetchSalesFromShow = (showId) => {
  const allSalesFromShow = [];
  getAllSales().forEach((sale) => {
    if (sale.showId === showId) {
      allSalesFromShow.push(sale);
    }
  });

  return allSalesFromShow;
};

/**
 * fetches a list of sales made for an Item
 * at an particular show
 *
 * @param {*} showId
 * @param {*} itemId
 */
const getSummaryOfSalesForItemAtShow = (showId, itemId) => {
  const saleAtShowWithItem = [];
  let summaryObj = {};
  let result = [];
  getAllSales().forEach((sale) => {
    if (sale.showId === showId && sale.itemId == itemId) {
      saleAtShowWithItem.push(sale);
    }
  });

  if (saleAtShowWithItem.length == 0) {
    let itemInventory = inventoryService.getByItemId(itemId);
    if (!itemInventory) {
      throw new NotFoundError("Invalid item");
    }
    summaryObj.showId = showId;
    summaryObj.itemName = itemInventory.itemName;
    summaryObj.itemId = itemInventory.itemId;
    summaryObj.quantity_sold = 0;
    return result.push(summaryObj);
  }

  summaryObj.showId = showId;
  summaryObj.itemName = saleAtShowWithItem[0].itemName;
  summaryObj.itemId = saleAtShowWithItem[0].itemId;
  summaryObj.quantity_sold = saleAtShowWithItem.length;
  return summaryObj;
};

/**
 * provides the summary for
 * all items purchased during a show
 *
 * @param {int} showId
 *
 * @returns {Array}
 */
const getShowSalesSummary = (showId) => {
  const allSalesFromShow = fetchSalesFromShow(showId);
  const summaryResult = [];
  if (allSalesFromShow.length == 0) {
    return summaryResult;
  }
};

/**
 * Gets a list of all sales
 *
 * @returns []
 */
const getAllSales = () => {
  return salesList;
};

const saveSale = (sale) => {
  return salesList.push(sale);
};

module.exports = {
  createShowSale,
  fetchSalesFromShow,
  getSummaryOfSalesForItemAtShow,
  saveSale,
  getAllSales,
};
