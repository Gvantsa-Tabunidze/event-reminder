import type { EventItem } from "@/api/type.ts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useFormik } from "formik"
import { useEvents } from "@/store/events/hooks/EventsContextHook"
import { useState } from "react"

interface Props {
    onClose: () => void
    event: EventItem
}

export function EditEventModal({  onClose, event }: Props) {
    const {updateEvent} = useEvents()
    const formik = useFormik({
        initialValues: {
            title:event.title ||'',
            badge:event.badge || '',
            date:event.date || '',
            time:event.time || '',
            address:event.address || '',
            attendees: event.attendees || [] 
        },
        onSubmit: async (values, {setSubmitting, resetForm}) => {
            try {
                const result = await updateEvent(event.id, {
                    title: values.title,
                    badge:values.badge,
                    date:values.date,
                    time:values.time,
                    address:values.address,
                    attendees:values.attendees
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

    if (!open) return null

     return (
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
                    <Input name="attendees" placeholder="Attendees" value={values.attendees} onChange={handleChange} onBlur={handleBlur}/>
                    <CardFooter className="flex justify-end gap-4 px-0">
                        <Button variant="outline" onClick={()=>onClose()}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting} >Save</Button>
                    </CardFooter>
                </form>
            </CardContent>
    </Card>
  )    
}
