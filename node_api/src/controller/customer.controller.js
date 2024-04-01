

const db = require("../ulit/db")

const getAll = (req, res)=>{
    db.query(" SELECT * FROM `customer` ", (error, rows) => {
        if (!error) {
            res.json({
                list: rows
            })
        }
        else {
            res.json({
                error: true,
                message: error
            })
        }

    })
}

// const create = (req, res)=>{
//  var sqlInsert = "INSERT INTO customer (FirstName, LastName, Gender, Phone) VALUES ('Vann','Sreyne','0','02222222') "

//  db.query(sqlInsert,(error, rows)=>{
//     if(!error){
//         res.json({
//             message:"Insert successfully",
//             data:rows
//         })
//     }else{
//             res.json({
//                 error:true,
//                 data:rows
//             })
//         }
//  })

 /////////////// case2 ////////////////////
 const create = (req, res)=>{
    var {
         FirstName,
         LastName,
         Gender,
         Phone 
        } = req.body

       

         var sqlInsert = " INSERT INTO customer ( FirstName, LastName, Gender, Phone) VALUES ( ?, ?, ?, ?)"
         var sqlParam = [FirstName,LastName,Gender,Phone]

            db.query(sqlInsert,sqlParam,(error,rows)=>{
                if(!error){
                    res.json({
                        message:"Insert successfully!",
                        data:rows
                    })
                }else{
                    res.json({
                        error:true,
                        message:error
                    })
                }
            })

        }

const update = (req, res)=>{
   var {
    Id,
    FirstName,
    LastName,
    Gender,
    Phone
   }=req.body

   var sqlUpdate = "UPDATE customer SET FirstName=?, LastName=?, Gender=?, Phone=? WHERE Id=?"
   var sqlParam = [ FirstName,  LastName, Gender, Phone, Id]
    
   db.query(sqlUpdate, sqlParam, (error, rows)=>{
    if(!error){
        res.json({
            message:"Updated successfully",
            data:rows
        })
    }else{
        res.json({
            error:true,
            message:error
        })
    }
   })
  
}

const remove = (req, res)=>{
    var {id} = req.params
    var sql = (" delete from customer where Id=?")
    db.query(sql, [id], (error, rows)=>{
        if (!error) {
            res.json({
                // message:"Customer Id: " +id+ " has been removed",
                // data:rows

                message :(rows.affectedRows == 1 ? "Customer remove" : "Customer not found")
            })
        }
        else {
            res.json({
                error: true,
                message: error
            })
        }
 
    })
}


module.exports = {
    getAll,
    create,
    update,
    remove
}
// db.query(" select * from `customer` ", (error, rows, fields) => {
//     if (error) {
        
//        return console.log(error)
//     }
//     else {
//      return console.log(rows)
//     }

// })

// const db = require("../util/db")

// const getAll = (req,res) => {
//     // db.query("sql statemen","handler")
//     db.query(" SELECT * FROM `customer`",(error,rows)=>{
//         if(!error){// mean no error
//             res.json({
//                 customer_list: rows
//             })
//         }else{ // mean some wrong
//             res.json({
//                 error:true,
//                 message : error
//             })
//         }
//     })
    
// }

// const create = (req,res) => {
//     var {
//        firstname,
//        lastname,
//        gender,
//        dob,
//        tel,
//        email 
//     } = req.body
//     var sqlInsert = " INSERT INTO customer ( firstname, lastname, gender, dob, tel, email) VALUES ( ?, ?, ?, ?, ?, ?)"
//     var sqlParam = [firstname,lastname,gender,dob,tel,email]
//     db.query(sqlInsert,sqlParam,(error,rows)=>{
//         if(!error){
//             res.json({
//                 message:"Insert successfully!",
//                 data:rows
//             })
//         }else{
//             res.json({
//                 error:true,
//                 message:error
//             })
//         }
//     })
// }

// const remove = (req,res) => {
//     var {id} = req.params
//     var sql = "DELETE FROM customer WHERE customer_id = ?"
//     db.query(sql,[id],(error,rows)=>{
//         if(!error){
//             res.json({
//                 message: (rows.affectedRows != 0 ? "Customer removed!" : "Customer not found!"),
//                 data:rows
//             })
//         }else{
//             res.json({
//                 error : true,
//                 message: error
//             })
//         }
//     })
// }

// const update = (req,res) => {
//     res.json({
//         message: "Update customer"
//     })
// }

// module.exports = {
//     getAll,
//     create,
//     remove,
//     update
// }