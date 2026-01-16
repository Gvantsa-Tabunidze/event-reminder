import { Calendar } from "@/components/ui/calendar"

interface CalendarProps {
    date:Date,
    handleDateSelect:()=>void
}

export function DatePicker({date, handleDateSelect}:CalendarProps) {
   
    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <h2 className="text-2xl font-medium">Current Month</h2>
            <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border shadow-sm"
                captionLayout="dropdown"
            />

        </div>
    )
}
