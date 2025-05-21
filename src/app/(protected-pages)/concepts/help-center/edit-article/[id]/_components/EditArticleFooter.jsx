'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import sleep from '@/utils/sleep'
import { TbDeviceFloppy, TbArrowNarrowLeft } from 'react-icons/tb'

const EditArticleFooter = () => {
    const [isPublishing, setIsPublishing] = useState(false)

    const [isSaving, setIsSaving] = useState(false)

    const router = useRouter()

    const handleBack = () => {
        history.back()
    }

    const handleSave = async () => {
        setIsSaving(true)
        await sleep(1000)
        toast.push(<Notification type="success">Saved as draft</Notification>, {
            placement: 'top-center',
        })
        setIsSaving(false)
    }

    const handlePublish = async () => {
        setIsPublishing(true)
        await sleep(1000)
        toast.push(
            <Notification type="success">Article published</Notification>,
            { placement: 'top-center' },
        )
        setIsPublishing(false)
        router.push('/concepts/help-center/manage-article')
    }

    return (
        <div className="sticky bottom-0 left-0 right-0 z-10 mt-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 -mx-4 sm:-mx-8 py-4">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center justify-between px-8">
                    <Button
                        className="ltr:mr-3 rtl:ml-3"
                        type="button"
                        variant="plain"
                        icon={<TbArrowNarrowLeft />}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <div className="flex items-center">
                        <Button
                            className="ltr:mr-3 rtl:ml-3"
                            type="button"
                            icon={<TbDeviceFloppy />}
                            loading={isSaving}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            variant="solid"
                            type="button"
                            loading={isPublishing}
                            onClick={handlePublish}
                        >
                            Publish
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditArticleFooter
