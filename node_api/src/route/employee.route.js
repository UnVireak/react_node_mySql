
const emplyeeController = require("../controller/employee.controller")
const employee = (app) => {
    app.get("/api/employee/:emp_id",emplyeeController.getOne)
    app.get("/api/employee",emplyeeController.getAll)
    app.post("/api/employee",emplyeeController.create)
    app.delete("/api/employee/:emp_id",emplyeeController.remove)
    app.put("/api/employee",emplyeeController.update)
    app.post("/api/employee/setpassword",emplyeeController.setPassword)
    app.post("/api/employee/login",emplyeeController.login)
}

module.exports = employee


// app.get("/api/employee/",(req, res)=>{
    //     res.json({
    //         list:"List all employees."
    //     })
    // })

    // app.post("/api/employee/", (req, res)=>{
    //     res.json({
    //          message:"You have request create employee." 
    //     })
      
    // })