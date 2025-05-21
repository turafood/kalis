'use client'
import { useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import { Form, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { usGenerativeChatStore } from '../_store/generativeChatStore'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const validationSchema = z.object({
    title: z.string().min(1, 'Please do not leave chat title blank!'),
})

const ChatHistoryRenameDialog = () => {
    const { renameDialog, setRenameDialog, setChatHistoryName } =
        usGenerativeChatStore()

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            title: renameDialog.title,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (renameDialog.open) {
            reset({
                title: renameDialog.title,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renameDialog.title, renameDialog.open])

    const handleDialogClose = () => {
        setRenameDialog({
            id: '',
            title: '',
            open: false,
        })
    }

    const onFormSubmit = async ({ title }) => {
        setChatHistoryName({
            id: renameDialog.id,
            title,
        })
        handleDialogClose()
    }

    return (
        <Dialog
            isOpen={renameDialog.open}
            onClose={handleDialogClose}
            onRequestClose={handleDialogClose}
        >
            <h5>Rename chat</h5>
            <div className="mt-8">
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <FormItem
                        label="Chat title"
                        invalid={Boolean(errors.title)}
                        errorMessage={errors.title?.message}
                    >
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input
                                    placeholder="Rename chat"
                                    type="text"
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <div className="flex justify-end gap-2">
                        <Button type="button" onClick={handleDialogClose}>
                            Cancel
                        </Button>
                        <Button variant="solid" type="submit">
                            Rename
                        </Button>
                    </div>
                </Form>
            </div>
        </Dialog>
    )
}

export default ChatHistoryRenameDialog
