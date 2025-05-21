import { useState, useRef } from 'react'
import Button from '@/components/ui/Button'
import Upload from '@/components/ui/Upload'
import hooks from '@/components/ui/hooks'
import { TbPhotoPlus, TbArrowRight } from 'react-icons/tb'

const { useMergeRef } = hooks

const ChatInput = (props) => {
    const [attachments, setAttachments] = useState([])

    const { placeholder, onInputChange, ref = null } = props

    const inputRef = useRef(null)

    const handleInputClear = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        setAttachments([])
    }

    const handleChange = () => {
        if (inputRef.current?.value) {
            onInputChange?.({
                value: inputRef.current?.value || '',
                attachments,
            })
            handleInputClear()
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onInputChange?.({
                value: inputRef.current?.value || '',
                attachments,
            })
            handleInputClear()
        }
    }

    return (
        <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl min-h-[50px] px-3 flex flex-col">
            {attachments.length > 0 && (
                <Upload
                    fileList={attachments}
                    fileListClass="flex gap-4"
                    fileItemClass="flex gap-8"
                    onFileRemove={setAttachments}
                >
                    <></>
                </Upload>
            )}
            <div className="flex items-center gap-2 w-full h-[50px]">
                <Upload
                    fileList={attachments}
                    showList={false}
                    onChange={setAttachments}
                >
                    <button
                        className="text-xl heading-text hover:text-primary px-1 py-2"
                        type="button"
                    >
                        <TbPhotoPlus />
                    </button>
                </Upload>
                <input
                    ref={useMergeRef(inputRef, ref)}
                    className="flex-1 h-full placeholder:text-gray-400 bg-transparent focus:outline-hidden heading-text"
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                />
                <Button
                    size="xs"
                    shape="circle"
                    variant="solid"
                    icon={<TbArrowRight />}
                    onClick={handleChange}
                />
            </div>
        </div>
    )
}

export default ChatInput
