const express = require("express");
const router = express.Router();
const salesService = require("../service/sales");
const { sendApiError } = require("../utils/error");

router.post("/show/:show_ID/buy_item/:item_ID", (req, res) => {
  const { show_ID, item_ID } = req.params;
  try {
    let sale = salesService.createShowSale(show_ID, item_ID, 1);
    return res.status(201).send({
      status: true,
      message: "sales created successfully",
      data: sale,
    });
  } catch (err) {
    console.log("show sales failed with err: ", err.message);
    return sendApiError(res, err);
  }
});

router.get("/show/:show_ID/sold_items/:item_ID", (req, res) => {
  const { show_ID, item_ID } = req.params;
  try {
    const data = salesService.getSummaryOfSalesForItemAtShow(show_ID, item_ID);
    return res.status(200).send({
      status: true,
      message: "successful",
      data,
    });
  } catch (err) {
    console.log("get item sales failed with error: ", err.message);
    return sendApiError(res, err);
  }
});

module.exports = router;
