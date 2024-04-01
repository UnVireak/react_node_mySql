

const db = require("../ulit/db")

const getOne = (req, res) => {
    var { category_id } = req.params
    var sqlSelect1 = "SELECT * FROM category WHERE category_id=?"
    db.query(sqlSelect1, [category_id], (error, rows) => {
        if (!error) {
            res.json({
                message: " Category found",
                data: rows
            })
        } else{
            res.json({
                error:true,
                list:data
            })
            
        }
    })

}


const getAll = (req, res) => {
    
    var sqlSelectAll = "SELECT * FROM category"
    db.query(sqlSelectAll,(error, rows) => {
        if (!error) {
            res.json({
                message: " Category found",
                list: rows
            })
        } else{
            res.json({
                error:true,
                data:data
            })
            
        }
    })
}
const create = (req, res) => {

    var {
        category_name,
        description
    }= req.body

    var sqlInsert = " INSERT INTO category( category_name, description) VALUES (?, ?)"
    var sqlParams =                        [category_name, description]
    db.query (sqlInsert,sqlParams , (error, rows)=>{
        if(!error){
            res.json({
                message:" Data insert successfully",
                list:rows
            })

        }
        else{
            res.json({
                error:true,
                message:error
            })
        }
    })

    
}
const update = (req, res) => {

}
const remove = (req, res) => {

}

module.exports = {
    getOne,
    getAll,
    create,
    update,
    remove
}

