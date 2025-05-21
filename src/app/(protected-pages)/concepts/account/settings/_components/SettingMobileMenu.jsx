'use client'
import { useRef } from 'react'
import ToggleDrawer from '@/components/shared/ToggleDrawer'
import SettingsMenu from './SettingsMenu'

const SettingMobileMenu = () => {
    const drawerRef = useRef(null)

    return (
        <>
            <div>
                <ToggleDrawer ref={drawerRef} title="Navigation">
                    <SettingsMenu
                        onChange={() => {
                            drawerRef.current?.handleCloseDrawer()
                        }}
                    />
                </ToggleDrawer>
            </div>
        </>
    )
}

export default SettingMobileMenu
