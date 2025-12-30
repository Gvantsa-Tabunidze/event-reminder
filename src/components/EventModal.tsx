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




interface EventModalProps{
    onClose:()=>void
    }


export const EventModal:React.FC<EventModalProps> = ({onClose}) => {
    const {createEvent} = useEvents()
    const formik = useFormik({
        initialValues: {
            title:'',
            badge:'',
            date:'',
            time:'',
            address:'',
            attendees:''
        },
        onSubmit: async (values, {setSubmitting, resetForm}) => {
            try {
                const result = await createEvent({
                    title: values.title,
                    badge:values.badge,
                    date:values.date,
                    time:values.time,
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
                    <Input name="title" placeholder="Title" value={values.title} onChange={handleChange} onBlur={handleBlur}/>
                    <Input name="badge" placeholder="Badge"  value={values.badge} onChange={handleChange} onBlur={handleBlur}/>
                    <Input name="date" type="date" value={values.date} onChange={handleChange} onBlur={handleBlur}/>
                    <Input name="time" type="time"  value={values.time} onChange={handleChange} onBlur={handleBlur}/>
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


