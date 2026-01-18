import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useFormik} from "formik";
import { useEvents } from "@/store/events/hooks/EventsContextHook";
import * as Yup from "yup";



interface EventModalProps{
    onClose:()=>void
    }

const validationSchema = Yup.object({
    title: Yup.string()
        .required("Field is required"),
    badge: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Name can only contain letters"),
    date:Yup.date()
    .transform((value, originalValue) => {
      // Convert empty string to undefined so .required() catches it
      return originalValue === "" ? undefined : value;
    })
    .required("Field is required")
    .min(new Date(), "Event must be in the future")
    .typeError("Please enter a valid date"),
})

interface FormValues {
  title: string;
  badge: string;
  date: string; // Keep as string for the HTML input and initial state
  address: string;
  attendees: string;
}

export const EventModal:React.FC<EventModalProps> = ({onClose}) => {
    
    const {createEvent} = useEvents()
    const formik = useFormik<FormValues>({
        initialValues: {
            title:'',
            badge:'',
            date:'',
            address:'',
            attendees:''
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting, resetForm}) => {
            try {
                const result = await createEvent({
                    title: values.title,
                    badge:values.badge,
                    date:values.date,
                    address:values.address,
                    attendees:values.attendees.split(',').map((s)=>s.trim())
                });
                console.log(result)
                if(result.success) {
                    resetForm()
                    onClose()
                }
            } catch (error) {
                console.log(error)
            } finally{
                setSubmitting(false)
            }
        },
    })

    const {values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting} = formik;

  return (
<div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="w-full max-w-lg animate-in fade-in zoom-in duration-200">
   <Card>
        <CardHeader>
            <CardTitle>Add or Edit event</CardTitle>
        </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                    <Input name="title" placeholder="Title" value={values.title} onChange={handleChange} onBlur={handleBlur}/>
                    {errors.title  && (
                    <p className="text-[0.8rem] font-medium text-destructive leading-none p-0 m-0 mt-1.5">
                    {errors.title}
                    </p>
                    )}  
                    </div>
                    <Input name="badge" placeholder="Badge"  value={values.badge} onChange={handleChange} onBlur={handleBlur}/>
                    <div>
                        <Input name="date" type="datetime-local" min={new Date().toISOString().split("T")[0]} value={values.date} onChange={handleChange} onBlur={handleBlur}/>
                    {errors.date && touched.date && (
                        <p className="text-[0.8rem] font-medium text-destructive leading-none p-0 m-0 mt-1.5">
                        {errors.date}
                        </p>
                    )}  
                    </div>              
                    <Input name="address" placeholder="Address" value={values.address} onChange={handleChange} onBlur={handleBlur}/>
                    <Input name="attendees" placeholder="Attendees" value={values.attendees}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                    <CardFooter className="flex justify-end gap-4 px-0">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>Save</Button>
                    </CardFooter>
                </form>
            </CardContent>
    </Card>
 </div>
</div>
  )
}


