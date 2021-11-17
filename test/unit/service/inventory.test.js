const inventoryService = require("../../../service/inventory");

let validItemId = 12345;
let invalidItemId = 98765;

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

const tearDown = () => {
  inventoryService.deleteAll();
};

describe("inventoryService.getAllInventory", () => {
  it("should return a list of all inventories", () => {
    const countBefore = inventoryService.getAllInventory().length;
    populateInventory();
    const countAfter = inventoryService.getAllInventory().length;
    expect(countAfter).toBe(countBefore + 2);
  });
});

describe("inventoryService.getByItemId", () => {
  afterEach(() => {
    tearDown();
  });

  it("should return null when no inventory is not found", () => {
    const inventory = inventoryService.getByItemId(invalidItemId);
    expect(inventory).toBe(null);
  });

  it("should return valid object when valid itemId is passed", () => {
    populateInventory();
    const inventory = inventoryService.getByItemId(validItemId);
    expect(inventory).toMatchObject({
      itemID: 12345,
      itemName: "Fancy Dresses",
      quantity: 10,
    });
  });
});

describe("inventoryService.addNewInventory", () => {
  afterEach(() => {
    tearDown();
  });

  it("should add a new inventory to list of inventories", () => {
    populateInventory();
    const initialCount = inventoryService.getAllInventory().length;
    inventoryService.addNewInventory({
      itemID: 23456,
      itemName: "Sneakers",
      quantity: 10,
    });
    const currentCount = inventoryService.getAllInventory().length;
    expect(currentCount).toBe(initialCount + 1);
  });
});

describe("inventoryService.updateInventory", () => {
  afterEach(() => {
    tearDown();
  });
  it("should update an exisiting inventory item", () => {
    populateInventory();
    const oldItemInventory = inventoryService.getByItemId(validItemId);

    oldItemInventory.itemName = "newname";
    oldItemInventory.quantity = 90;
    inventoryService.updateInventory(oldItemInventory);
    const updatemItemInventory = inventoryService.getByItemId(
      oldItemInventory.itemID
    );
    expect(updatemItemInventory.itemName).toBe("newname");
    expect(updatemItemInventory.quantity).toBe(90);
  });
});
