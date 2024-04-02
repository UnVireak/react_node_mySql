
const emplyeeController = require("../controller/employee.controller")
const { upload } = require("../ulit/helper")

const employee = (app) => {
    app.get("/api/employee/:emp_id",emplyeeController.getOne)
    app.get("/api/employee",emplyeeController.getAll)
    // app.post("/api/employee",emplyeeController.create)
    app.post("/api/employee",upload.single("emp_img") ,emplyeeController.create)
    app.delete("/api/employee/:emp_id",emplyeeController.remove)
    app.put("/api/employee",emplyeeController.update)
    app.post("/api/employee/SETpassword",emplyeeController.setPassword)
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