import { useState } from 'react'
import Calendar from '@/components/ui/Calendar'

const MultipleDateView = () => {
    const [value, setValue] = useState(null)

    return (
        <div className="overflow-x-auto ">
            <div className="w-[584px] mx-auto">
                <Calendar value={value} dateViewCount={2} onChange={setValue} />
            </div>
        </div>
    )
}

export default MultipleDateView
