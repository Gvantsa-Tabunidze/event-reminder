import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button"
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useUserAuth} from "@/store/auth/hooks/useUserAuth.ts";


const validationSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password should be at least 8 characters long")
		.required("Password is required")
})

type FormValues = Yup.InferType<typeof validationSchema>;


const SignIn = () => {
 const navigate = useNavigate();
	const formik = useFormik<FormValues>({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema,
		onSubmit: async (values, {setSubmitting}) => {
			try {
				const result = await signInUser({
					email: values.email,
					password: values.password,
				});

				if (result.success) {
					navigate('/');
				}
			} catch (error) {
				console.error(error);
			} finally {
				setSubmitting(false);
			}
		}
	})


	const {values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting} = formik;
	const {authSession, signInUser} = useUserAuth()!
	console.log(authSession)

	return (
		 <div className="flex flex-col items-center gap-4">
			<form className="flex flex-col justify-center gap-6" onSubmit={handleSubmit}>
				<div className="flex flex-col justify-center gap-2">
					<Label htmlFor="email">Email</Label>
					<Input name="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
					{touched.email && errors.email && <p className="text-red-500 font-light text-sm">{errors.email}</p>}
				</div>
				<div className="flex flex-col justify-center gap-2">
					<Label htmlFor="password">Password</Label>
					<Input name="password" placeholder="Password" type="password" value = {values.password} onChange={handleChange} onBlur={handleBlur}/>
					{touched.email && errors.email && <p className="text-red-500 font-light text-sm">{errors.email}</p>}
				</div>
				<Button type="submit" disabled={isSubmitting}>Sign in</Button>
			</form>
			<div className="flex flex-col items-center">
                <p className="text-gray-600">Still don't have an account?</p>
                <Link to="/sign-up" className="text-blue-600">Sign up</Link>
            </div>
		</div>
	);
};

export default SignIn;