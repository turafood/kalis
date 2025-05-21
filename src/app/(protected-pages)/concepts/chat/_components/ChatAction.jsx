'use client'
import { useRef } from 'react'
import Dropdown from '@/components/ui/Dropdown'
import { useChatStore } from '../_store/chatStore'
import {
    TbDotsVertical,
    TbBell,
    TbBellOff,
    TbShare3,
    TbTrash,
    TbUserPlus,
} from 'react-icons/tb'

const ChatAction = ({ muted }) => {
    const dropdownRef = useRef(null)
    const selectedChat = useChatStore((state) => state.selectedChat)
    const setSelectedChat = useChatStore((state) => state.setSelectedChat)
    const deleteConversationRecord = useChatStore(
        (state) => state.deleteConversationRecord,
    )
    const setChatMute = useChatStore((state) => state.setChatMute)

    const handleMute = () => {
        const nextMuted = !selectedChat.muted
        setSelectedChat({ ...selectedChat, muted: nextMuted })
        setChatMute({ id: selectedChat.id, muted: nextMuted })
    }

    const handleDelete = () => {
        deleteConversationRecord(selectedChat.id)
        setSelectedChat({})
    }

    return (
        <div className="flex items-center gap-2">
            <Dropdown
                ref={dropdownRef}
                placement="bottom-end"
                renderTitle={
                    <button className="outline-hidden rounded-full p-2 text-xl bg-white dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100">
                        <TbDotsVertical />
                    </button>
                }
            >
                <Dropdown.Item eventKey="mute" onClick={handleMute}>
                    <span className="text-lg">
                        {muted ? <TbBellOff /> : <TbBell />}
                    </span>
                    <span>{muted ? 'Unmute' : 'Mute'}</span>
                </Dropdown.Item>
                {selectedChat.chatType === 'groups' ? (
                    <Dropdown.Item eventKey="inviteMember">
                        <span className="text-lg">
                            <TbUserPlus />
                        </span>
                        <span>Invite member</span>
                    </Dropdown.Item>
                ) : (
                    <Dropdown.Item eventKey="shareContact">
                        <span className="text-lg">
                            <TbShare3 />
                        </span>
                        <span>Share contact</span>
                    </Dropdown.Item>
                )}
                <Dropdown.Item eventKey="delete" onClick={handleDelete}>
                    <span className="text-lg text-error">
                        <TbTrash />
                    </span>
                    <span className="text-error">Delete</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

export default ChatAction
