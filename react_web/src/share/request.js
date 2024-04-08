import axios from "axios"
const base_url = "http://localhost:8081/api/"
export const request =(url="", method="", data={})=>{
  var header = {"Content-Type" : "application/json"}
  if (data instanceof FormData){
    header = {"Content-Type" : "multiparh/form-data"}
  }
   return  axios ({
        url:base_url+url,
        method:method,
        data:data,
        headers:header
    }).then(res=>{
      return res.data;
    }).catch(error=>{
        return false
    }).finally(()=>{
    })
}

// const functionGetDataFromApi = () =>{
//     //body function
//     axios ({
//         url:"",
//         method:"",
//         data:{}
//     }).then(res=>{
//         //block respone succes from api

//     }).catch(error=>{
//         //block error
//     }).finally(()=>{
//         //always execute

//     })
// }
export default request;