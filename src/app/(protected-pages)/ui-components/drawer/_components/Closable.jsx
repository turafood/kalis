import { useState } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'

const Closable = () => {
    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = (e) => {
        console.log('onDrawerClose', e)
        setIsOpen(false)
    }

    return (
        <div>
            <Button onClick={() => openDrawer()}>Open Drawer</Button>
            <Drawer
                title="Drawer Title"
                isOpen={isOpen}
                closable={false}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                Drawer Content
            </Drawer>
        </div>
    )
}

export default Closable
