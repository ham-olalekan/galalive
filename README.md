# Galalive Coding Test

## Installation instructions

### Using NPM

- Run `npm i` to install the project dependencies

### Run Test

- Run `npm test` all test cases should pass

### Starting the service

- Run `npm start` to start the application. The application starts on port 8080 by default.
  The port can be changed to you preference by setting the value of the `PORT` env var on your
  local.

### Terminating the service

- Press `cmd + c`

## Test your service

### NB: This application does not have a persistence layer, data is stored in memory and all data is lost when service is restarted.

This service contains a bunch of endpoints for as listed below:

- `localhost:8080/api/inventory`
  To add or update item inventory in stock right now. If the itemID already exists, the itemName and inventory should be updated.

       HTTP Method: POST
       Sample request:
       [
          { "itemID": 12345,  "itemName": "Fancy Dresses", "quantity": 10},
          { "itemID": 12349,  "itemName": "Fancy Short", "quantity": 20}
      ]

      Sample Response:
      {
      "status": true,
      "message": "Inventory updated successfully",
      "data": [
          {
              "itemID": 12345,
              "itemName": "Fancy Dresses",
              "quantity": 2
          },
          {
              "itemID": 12349,
              "itemName": "Fancy Short",
              "quantity": 20
          }
      ]

  }

- `localhost:8080/api/sales/show/1/buy_item/12345`
  To buy a single item during a show You should make sure there is sufficient inventory and, if so, deduct one item. Then record the item as being sold on show show_ID and return a success code. If there isn’t sufficient inventory, return an appropriate http status code and a message indicating so.

  HTTP Method: POST
  Sample request: {}

                Sample Response:
                {
                    "status": true,
                    "message": "sales created successfully",
                    "data": {
                    "showId": "1",
                    "itemId": "12345",
                    "quantity": 1,
                    "itemName": "Fancy Dresses"
                    }
                }

- `localhost:8080/api/sales/show/1/buy_item/12345`
  Return the name and quantity of item_id sold by show_ID.
  If no item_id is passed, return a list of all items sold
  by show_id with the same information.

        HTTP Method: GET

        Sample Respons:
        {
            "status": true,
            "message": "successful",
            "data": {
                "itemName": "Fancy Dresses",
                "itemId": "12345",
                "quantity_sold": 2
            }
        }
