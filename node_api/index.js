// http 
const express = require("express");
const app = express(); // extend from express 
const cors = require ("cors");
app.use(express.json()) // req.body ( get params json body )

app.use(cors({origin:"*"}))
// app.get("/",(req,res)=>{
//   res.json({
//     message:" Home Sok"
//   })
// })

// only import
const employee = require("./src/route/employee.route") 
const customer = require("./src/route/customer.route")
const category = require("./src/route/category.route")
// call route

employee(app)
customer(app)
category(app)

//  app.get("/", (req, res)=>{
//     res.send("You have request my root server.")
//  })
//  app.get("/api/user", (req, res)=>{
//     res.json({
//         list1:[10,20],
//         list2:["Sok", "Sam"]
//     })
//  })

// //  req.query, req.params

// app.get("/api/product",(req, res)=>{
//       res.json({
//          sting:1,
//          Coca:2,
//          getQuery:req.query
//       })
// })

// app.get("/api/product/:id",(req, res)=>{
//    res.json(
//       {
//          getParamsObj: req.params
//       }
//    )
// })

 const port = 8081;
 app.listen(port, ()=>{
    console.log("http://localhost:"+port)
 })