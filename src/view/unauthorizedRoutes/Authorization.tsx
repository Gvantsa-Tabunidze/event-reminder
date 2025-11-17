import {SignedOut, SignInButton, useUser} from "@clerk/clerk-react";
import {Navigate} from "react-router-dom";

const Authorization = () => {
    const {isSignedIn} = useUser()
    if (isSignedIn) return <Navigate to="/" replace={true}/>

    return (
        <div>
            <h1>Authorization page</h1>
            <SignedOut>
                <SignInButton/>
            </SignedOut>
        </div>
    )
}
export default Authorization
