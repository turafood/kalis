import { usGenerativeChatStore } from '../_store/generativeChatStore'
import { apiPostChat } from '@/services/AiService'
import dayjs from 'dayjs'
import uniqueId from 'lodash/uniqueId'

const useChatSend = () => {
    const {
        selectedConversation,
        setSelectedConversation,
        pushChatHistory,
        pushConversation,
        setIsTyping,
    } = usGenerativeChatStore()

    const creteMyMessage = (id, prompt) => {
        pushConversation(id, {
            id: uniqueId('ai-conversation-'),
            sender: {
                id: '1',
                name: 'Angelina Gotelli',
                avatarImageUrl: '/img/avatars/thumb-1.jpg',
            },
            content: prompt,
            timestamp: dayjs().toDate(),
            type: 'regular',
            isMyMessage: true,
        })
    }

    const sendMessage = async (id, prompt, attachments) => {
        const resp = await apiPostChat({
            prompt,
            attachments,
        })
        pushConversation(id, {
            id: uniqueId('ai-conversation-'),
            sender: {
                id: 'ai',
                name: 'Chat AI',
                avatarImageUrl: '/img/thumbs/ai.jpg',
            },
            content: resp.choices[0].message.content || '',
            timestamp: dayjs().toDate(),
            type: 'regular',
            isMyMessage: false,
            fresh: true,
        })
        setIsTyping(false)
    }

    const createConversation = async (id, prompt, attachments) => {
        setSelectedConversation(id)
        await sendMessage(id, prompt, attachments)
    }

    const handleSend = async (prompt, attachments) => {
        setIsTyping(true)
        if (selectedConversation) {
            creteMyMessage(selectedConversation, prompt)
            await sendMessage(selectedConversation, prompt)
        } else {
            const newId = uniqueId('ai-chat-')
            pushChatHistory({
                id: newId,
                title: prompt,
                lastConversation: '',
                createdTime: dayjs().unix(),
                updatedTime: dayjs().unix(),
                enable: false,
            })
            creteMyMessage(newId, prompt)
            await createConversation(newId, prompt, attachments)
        }
    }

    return {
        handleSend,
    }
}

export default useChatSend
