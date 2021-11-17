const sendApiError = (res, error) => {
  const errorResp = {
    status: false,
    message: error.message,
    data: null,
  };

  if (error.name == "NotFoundError") {
    return res.status(404).send(errorResp);
  } else if (error.name == "OutOfStockError") {
    return res.status(419).send(errorResp);
  }
};

module.exports = {
  sendApiError,
};
