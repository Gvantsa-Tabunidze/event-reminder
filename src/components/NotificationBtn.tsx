import {Button} from "@/components/ui/button.tsx";
import {Bell} from "lucide-react";
import { forwardRef } from "react";




const NotificationBtn = forwardRef<HTMLButtonElement, { onClick?: () => void }>(
  (props, ref) => (
      <Button  ref={ref} {...props} variant="outline" size="icon">
            <Bell/>
        </Button>
  
  )
)
export default NotificationBtn
