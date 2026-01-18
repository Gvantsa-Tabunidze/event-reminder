import {Outlet} from "react-router-dom";


const Authorization = () => {


    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <h2 className="mt-4">Authorization</h2>
            <Outlet/>
        </div>
    )
}
export default Authorization
