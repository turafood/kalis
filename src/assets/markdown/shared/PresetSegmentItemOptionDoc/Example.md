```jsx
import { useState } from 'react'
import PresetSegmentItemOption from '@/components/shared/PresetSegmentItemOption'
import Segment from '@/components/ui/Segment'

import { HiOutlineCode, HiOutlineCube, HiOutlinePencil } from 'react-icons/hi'

const roles = [
    { value: 'softwareEngineer', label: 'Developer', icon: <HiOutlineCode /> },
    { value: 'productManager', label: 'Manager', icon: <HiOutlineCube /> },
    { value: 'designer', label: 'Designer', icon: <HiOutlinePencil /> },
]

const Example = () => {
    const [value, setValue] = useState([roles[0].value])

    const handleChange = (val) => {
        console.log('val', val)
        setValue(val)
    }

    return (
        <Segment
            value={value}
            className="bg-transparent dark:bg-transparent"
            onChange={(val) => handleChange(val)}
        >
            <div className="flex flex-col xl:flex-row items-center gap-4">
                {roles.map((item) => (
                    <Segment.Item
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {({ active, onSegmentItemClick, disabled }) => {
                            return (
                                <PresetSegmentItemOption
                                    hoverable
                                    active={active}
                                    disabled={disabled}
                                    className="bg-white dark:bg-gray-800 w-[250px]"
                                    onSegmentItemClick={onSegmentItemClick}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">
                                            {item.icon}
                                        </span>
                                        <h6>{item.label}</h6>
                                    </div>
                                </PresetSegmentItemOption>
                            )
                        }}
                    </Segment.Item>
                ))}
            </div>
        </Segment>
    )
}

export default Example
```
