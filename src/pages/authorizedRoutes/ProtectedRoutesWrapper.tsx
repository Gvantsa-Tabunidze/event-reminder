import {Navigate, Outlet} from 'react-router-dom'
import Header from "@/components/Header.tsx";
import {useUser} from "@clerk/clerk-react";

const ProtectedRoutesWrapper = () => {
    const {isSignedIn} = useUser()
    if (!isSignedIn) return <Navigate to={"/authorization"} replace={true}/>

    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}
export default ProtectedRoutesWrapper
