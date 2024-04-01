import moment from "moment";

export const formatDateClient = (date, pattern="DD/MM/YYYY") =>{
    return  moment(date).format(pattern);
}

export const formatDateServer = (date, pattern="YYYY-MM-DD") =>{
    return  moment(date).format(pattern);
}
export const getCurrentUser = () =>{
    var user = localStorage.getItem("user")
    if(user != "" && user != null){
        user = JSON.parse(user)
        return user;
    }
    return null;
}

export const isLogin = () => {
    const isUserLogin = localStorage.getItem("isLogin");
    if(isUserLogin == null || isUserLogin == "null" || isUserLogin == "" || isUserLogin == 0){
        return false;
    }
    return true;
}