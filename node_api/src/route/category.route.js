

const categoryRoute = require("../controller/category.controller")


const category = (app) =>{
    app.get("/api/category/:category_id", categoryRoute.getOne)
    app.get("/api/category", categoryRoute.getAll)
    app.post("/api/category", categoryRoute.create)
    app.put("/api/category", categoryRoute.update)
    app.delete("/api/category/:category_id", categoryRoute.remove)
}
module.exports = category;