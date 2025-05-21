'use client'
import Button from '@/components/ui/Button'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import { useScrumBoardStore } from '../_store/scrumBoardStore'
import { TbUserPlus, TbSettings, TbPlus } from 'react-icons/tb'
import { useRouter } from 'next/navigation'

const ScrumBoardHeader = ({ boardMembers = [] }) => {
    const router = useRouter()

    const { updateDialogView, openDialog } = useScrumBoardStore()

    const onAddMember = () => {
        updateDialogView('ADD_MEMBER')
        openDialog()
    }

    const handleAddNewColumn = () => {
        updateDialogView('NEW_COLUMN')
        openDialog()
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h3>Sprint 2</h3>
                <p className="font-semibold">Web App Project</p>
            </div>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <UsersAvatarGroup
                        className="flex items-center"
                        avatarProps={{ size: 35 }}
                        users={boardMembers}
                    />
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            icon={<TbUserPlus />}
                            onClick={onAddMember}
                        />
                        <Button
                            size="sm"
                            icon={<TbSettings />}
                            onClick={() =>
                                router.push('/app/account/settings/profile')
                            }
                        />
                        <Button
                            size="sm"
                            icon={<TbPlus />}
                            onClick={handleAddNewColumn}
                        >
                            <span>New Board</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrumBoardHeader
