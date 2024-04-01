const customerController = require("../controller/customer.controller")
const customer = (app) => {
    app.get("/api/customer",customerController.getAll) // get list
    app.post("/api/customer",customerController.create) // for create new record
    app.delete("/api/customer/:id",customerController.remove) // remove data from database
    app.put("/api/customer",customerController.update) // update
}
module.exports = customer