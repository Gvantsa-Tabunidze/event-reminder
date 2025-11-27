import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

const SignIn = () => {
	return (
		<div>
			<form>
				<Label htmlFor="email">Email</Label>
				<Input name="email"/>
				<Label htmlFor="password">Password</Label>
				<Input name="password"/>
			</form>
		</div>
	);
};

export default SignIn;