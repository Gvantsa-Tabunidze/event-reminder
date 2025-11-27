import { Label } from "@/components/ui/label"
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button"

const SignUp = () => {
	return (
		<div className="flex items-center justify-center w-full">
			<form className="flex flex-col justify-center gap-6" onSubmit={SignUp}>
				<div className="flex flex-col justify-center gap-2">
					<Label htmlFor="email">Email</Label>
					<Input name="email"/>
				</div>
				<div className="flex flex-col justify-center gap-2">
					<Label htmlFor="password">Password</Label>
					<Input name="password"/>
				</div>
				<div className="flex flex-col justify-center gap-2">
					<Label htmlFor="confirmpassword">Confirm password</Label>
					<Input name="confirmpassword"/>
				</div>
				<Button>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUp;