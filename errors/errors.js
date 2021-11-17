class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

class OutOfStockError extends Error {
  constructor(message) {
    super(message);
    this.name = "OutOfStockError";
  }
}

module.exports = {
  NotFoundError,
  OutOfStockError,
};
