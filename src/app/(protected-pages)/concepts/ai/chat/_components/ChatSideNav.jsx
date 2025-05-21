'use client'
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ChatHistory from './ChatHistory'
import { usGenerativeChatStore } from '../_store/generativeChatStore'
import useDebounce from '@/utils/hooks/useDebounce'
import classNames from '@/utils/classNames'
import { TbSearch } from 'react-icons/tb'

const ChatSideNav = ({ className, bodyClass, onClick }) => {
    const [queryText, setQueryText] = useState('')

    const { setSelectedConversation } = usGenerativeChatStore()

    function handleDebounceFn(e) {
        setQueryText?.(e.target.value)
    }

    const debounceFn = useDebounce(handleDebounceFn, 500)

    const handleInputChange = (e) => {
        debounceFn(e)
    }

    const handleNewChat = () => {
        setSelectedConversation('')
        onClick?.()
    }

    return (
        <Card
            header={{
                content: (
                    <div className="flex items-center gap-2 px-5 w-full h-[60px]">
                        <TbSearch className="text-xl" />
                        <input
                            className="flex-1 h-full placeholder:text-gray-400 placeholder:text-base bg-transparent focus:outline-hidden heading-text"
                            placeholder="Search chat"
                            onChange={handleInputChange}
                        />
                    </div>
                ),
                className: 'p-0',
            }}
            className={classNames(
                'flex-1 xl:max-w-[320px] h-full hidden xl:block',
                className,
            )}
            bodyClass={classNames('h-[calc(100%-60px-80px)] p-0', bodyClass)}
        >
            <ChatHistory queryText={queryText} onClick={onClick} />
            <div className="px-5 py-2">
                <Button block variant="solid" onClick={handleNewChat}>
                    New chat
                </Button>
            </div>
        </Card>
    )
}

export default ChatSideNav
