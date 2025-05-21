import ScrollBar from '@/components/ui/ScrollBar'
import Message from './Message'
import classNames from '@/utils/classNames'

const MessageList = (props) => {
    const {
        list = [],
        showAvatar = true,
        typing = false,
        avatarGap,
        customRenderer,
        customAction,
        messageListClass,
        bubbleClass,
        ref,
    } = props

    return (
        <div className={classNames('relative', messageListClass)}>
            <div className="absolute top-0 left-0 h-full w-full py-4">
                <ScrollBar
                    autoHide
                    className="overflow-y-auto h-full max-w-full"
                    scrollableNodeProps={{ ref }}
                >
                    <div className="flex flex-col gap-4 px-4">
                        {list.map((message, index) => (
                            <Message
                                key={message.id}
                                showAvatar={showAvatar}
                                avatarGap={avatarGap}
                                bubbleClass={bubbleClass}
                                {...message}
                                {...(customRenderer
                                    ? {
                                          customRenderer: () =>
                                              customRenderer(message, index),
                                      }
                                    : {})}
                                {...(customAction
                                    ? {
                                          customAction: () =>
                                              customAction(message, index),
                                      }
                                    : {})}
                            />
                        ))}
                        {typing && (
                            <Message
                                id={typing.name + 'typing'}
                                sender={typing}
                                type="regular"
                                showAvatar={showAvatar}
                                bubbleClass={bubbleClass}
                                avatarGap={avatarGap}
                                content={
                                    <span className="flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-gray-700 motion-safe:animate-[bounce_1s_ease-in-out_infinite] dark:bg-gray-300"></span>
                                        <span className="size-1.5 rounded-full bg-gray-700 motion-safe:animate-[bounce_0.5s_ease-in-out_infinite] dark:bg-gray-300"></span>
                                        <span className="size-1.5 rounded-full bg-gray-700 motion-safe:animate-[bounce_1s_ease-in-out_infinite] dark:bg-gray-300"></span>
                                    </span>
                                }
                            />
                        )}
                    </div>
                </ScrollBar>
            </div>
        </div>
    )
}

export default MessageList
