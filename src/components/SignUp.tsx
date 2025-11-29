import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button"
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useUserAuth} from "@/store/auth/hooks/useUserAuth.ts";


const validationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Name can only contain letters"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password should be at least 8 characters long")
        .required("Password is required"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords should match")
        .required("Password confirmation is required")
})

type FormValues = Yup.InferType<typeof validationSchema>;

const SignUp = () => {
    const navigate = useNavigate();
    const formik = useFormik<FormValues>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                const result = await signUpNewUser({
                    email: values.email,
                    password: values.password,
                    name: values.name
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
    

    const {authSession, signUpNewUser} = useUserAuth()!
    console.log(authSession)

    return (
        <div className="flex flex-col items-center gap-4">
            <form className="flex flex-col justify-center gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center gap-2">
                    <Label htmlFor="email">Full name</Label>
                    <Input type="text" name="name" placeholder='Full name'
                           onChange={handleChange} onBlur={handleBlur} value={values.name}/>
                    {touched.name && errors.name && <p className="text-red-500 font-light text-sm">{errors.name}</p>}
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" placeholder='Email' value={values.email} onChange={handleChange}
                           onBlur={handleBlur}/>
                    {touched.email && errors.email && <p className="text-red-500 font-light text-sm">{errors.email}</p>}
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" placeholder="Password" value={values.password}
                           onChange={handleChange} onBlur={handleBlur}/>
                    {touched.password && errors.password &&
                        <p className="text-red-500 font-light text-sm">{errors.password}</p>}
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <Label htmlFor="password_confirmation">Confirm password</Label>
                    <Input type="password" name="password_confirmation" placeholder="Confirm password"
                           value={values.password_confirmation} onChange={handleChange} onBlur={handleBlur}/>
                    {touched.password_confirmation && errors.password_confirmation &&
                        <p className="text-red-500 font-light text-sm">{errors.password_confirmation}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting}>Sign Up</Button>
            </form>
            <div className="flex flex-col items-center">
                <p className="text-gray-600">Already have an account?</p>
                <Link to="/sign-in" className="text-blue-600">Sign in</Link>
            </div>
        </div>
    );
};

export default SignUp;