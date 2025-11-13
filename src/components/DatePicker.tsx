import {Calendar} from "@/components/ui/calendar"
import {useState} from "react";

export function DatePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h2 className="text-2xl font-medium">Current Month</h2>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm"
                captionLayout="dropdown"
            />
        </div>

    )
}
