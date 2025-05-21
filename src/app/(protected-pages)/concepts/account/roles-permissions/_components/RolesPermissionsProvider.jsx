'use client'
import { useEffect } from 'react'
import { useRolePermissionsStore } from '../_store/rolePermissionsStore'

const RolesPermissionsProvider = ({
    children,
    roleList,
    userList,
    role,
    status,
}) => {
    const setRoleList = useRolePermissionsStore((state) => state.setRoleList)
    const setInitialLoading = useRolePermissionsStore(
        (state) => state.setInitialLoading,
    )
    const setUserList = useRolePermissionsStore((state) => state.setUserList)
    const setFilterData = useRolePermissionsStore(
        (state) => state.setFilterData,
    )
    const filterData = useRolePermissionsStore((state) => state.filterData)

    useEffect(() => {
        setRoleList(roleList)
        setUserList(userList)

        if (role) {
            setFilterData({ ...filterData, role })
        }

        if (status) {
            setFilterData({ ...filterData, status })
        }

        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roleList])

    return <>{children}</>
}

export default RolesPermissionsProvider
