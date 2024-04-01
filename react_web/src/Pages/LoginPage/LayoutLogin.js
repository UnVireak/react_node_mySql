import { Outlet } from "react-router-dom";

import{ useEffect } from "react"
const LayoutLogin = () => {

    const handleLogin = () => {
        // when username and password is correct
        window.location.href = "/"
    }
   

return (
    <div style={{ backgroundColor: "gray0", height: "90vh" }}>
        <div style={{ backgroundColor: "darkblue" }}>
            <h3 style={{ color: "white", padding: 10 }}>Brand Name</h3>
        </div>

        <div style={{ padding: "10%" }}>
                <Outlet />
            </div>
        </div>

   
)
}

export default LayoutLogin;