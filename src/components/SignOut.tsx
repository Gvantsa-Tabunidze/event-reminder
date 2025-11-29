import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useUserAuth} from "@/store/auth/hooks/useUserAuth.ts";


const SignOutButton = () => {
    const {signOut} = useUserAuth()
    const exitUser = async () => {
        try {
            await signOut();
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
