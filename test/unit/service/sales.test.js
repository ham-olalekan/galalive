const saleService = require("../../../service/sales");
const inventoryService = require("../../../service/inventory");
const { NotFoundError, OutOfStockError } = require("../../../errors/errors");

let validItemId = 12345;
let invalidItemId = 98765;
const validShowId = 1;

const populateInventory = () => {
  const testInventory = [
    { itemID: 12345, itemName: "Fancy Dresses", quantity: 10 },
    { itemID: 12349, itemName: "Fancy Short", quantity: 20 },
  ];
  testInventory.forEach((inventory) => {
    inventoryService.addNewInventory(inventory);
  });
  return testInventory;
};

const populateSaleList = () => {
  for (let i = 0; i <= 5; i++) {
    populateInventory().forEach((inventory) => {
      saleService.saveSale({
        showId: validShowId,
        itemID: inventory.itemID,
        itemName: inventory.itemName,
        quantity: 1,
      });
    });
  }
};

describe("saleService.createShowSale", () => {
  it("should create a single sale for item at a show", () => {
    populateSaleList();
    let quantity = 1;
    let initialCount = saleService.getAllSales().length;
    saleService.createShowSale(validShowId, validItemId, quantity);
    let currentCount = saleService.getAllSales().length;
    expect(currentCount).toBe(initialCount + quantity);
  });

  it("should throw NotFoundError for Invalid ItemID", () => {
    expect(() => {
      saleService.createShowSale(validShowId, invalidItemId, 3);
    }).toThrow(NotFoundError);
  });

  it("should throw OutOfStockError for inventory with 0 quantiy in inventory", () => {
    inventoryService.updateInventory({
      itemID: validItemId,
      itemName: "Fancy Dresses",
      quantity: 0,
    });
    expect(() => {
      saleService.createShowSale(validShowId, validItemId, 1);
    }).toThrow(OutOfStockError);
  });
});

describe("saleService.fetchSalesFromShow", () => {
  it("should return all summary objects with given showId", () => {
    populateSaleList();
    saleService.fetchSalesFromShow(validShowId).forEach((sale) => {
      expect(sale.showId).toBe(validShowId);
    });
  });
});

describe("saleService.getSummaryOfSalesForItemAtShow", () => {
  it("should return all summary objects with given showId and itemId", () => {
    populateSaleList();
    let sale = saleService.getSummaryOfSalesForItemAtShow(
      validShowId,
      validItemId
    );

    expect(sale.showId).toBe(validShowId);
    expect(sale.itemId).toBe(validItemId);
  });
});
