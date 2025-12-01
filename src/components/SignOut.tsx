import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useUserAuth} from "@/store/auth/hooks/useUserAuth.ts";
import { useNavigate } from "react-router-dom";


const SignOutButton = () => {
    const {signOut} = useUserAuth()
    const navigate = useNavigate()
    const exitUser = async () => {
        try {
            await signOut();
            navigate('/sign-in')
            //toast with success message or navigate
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Button variant="outline" size="icon" onClick={exitUser}>
            <LogOut/>
        </Button>
    )
}
export default SignOutButton
