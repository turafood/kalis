```jsx
import Progress from '@/components/ui/Progress'
import { HiXCircle, HiCheckCircle } from 'react-icons/hi'

const CircleCustomInfo = ({ percent }) => {
    return (
        <div className="text-center">
            <h3>{percent}%</h3>
            <span>completion</span>
        </div>
    )
}

const CustomInfo = () => {
    return (
        <div className="md:flex items-center">
            <div style={{ minWidth: '50%' }} className="md:mb-0 mb-4 mx-6">
                <Progress
                    customColorClass="bg-red-500"
                    percent={60}
                    className="mb-4"
                    customInfo={<HiXCircle className="text-red-500 text-xl" />}
                />
                <Progress
                    customColorClass="bg-green-500"
                    percent={100}
                    customInfo={
                        <HiCheckCircle className="text-emerald-500 text-xl" />
                    }
                />
            </div>
            <Progress
                variant="circle"
                percent={40}
                width={150}
                customInfo={<CircleCustomInfo percent={40} />}
            />
        </div>
    )
}

export default CustomInfo
```
