'use client'
import { useState } from 'react'
import { Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Dropdown from '@/components/ui/Dropdown'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import EllipsisButton from '@/components/shared/EllipsisButton'
import { useScrumBoardStore } from '../_store/scrumBoardStore'
import {
    TbPencil,
    TbCirclePlus,
    TbTrash,
    TbCircleXFilled,
} from 'react-icons/tb'
import { useForm, Controller } from 'react-hook-form'

const RenameForm = ({
    title,
    closeRenameForm,
    columns = {},
    ordered,
    onEnter,
}) => {
    const onFormSubmit = (value) => {
        const newTitle = value.title

        if (ordered.some((elm) => elm === newTitle)) {
            closeRenameForm()
            return
        }

        const newColumns = {}
        delete Object.assign(newColumns, columns, {
            [newTitle]: columns[title],
        })[title]

        const newOrder = ordered.map((elm) => {
            if (elm === title) {
                return newTitle
            }
            return elm
        })
        onEnter(newColumns, newOrder)
        closeRenameForm()
    }

    const { control, handleSubmit } = useForm({
        defaultValues: {
            title,
        },
    })

    return (
        <>
            <Form onSubmit={handleSubmit(onFormSubmit)}>
                <Controller
                    name="title"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input type="text" autoComplete="off" {...field} />
                    )}
                />
            </Form>
        </>
    )
}

const BoardTitle = (props) => {
    const { dragHandleProps, title } = props

    const {
        columns,
        ordered,
        openDialog,
        updateColumns,
        updateDialogView,
        setSelectedBoard,
        updateOrdered,
    } = useScrumBoardStore()

    const [renameActive, setRenameActive] = useState(false)
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

    const onRenameActive = () => {
        setRenameActive(true)
    }

    const onRenameDeactivate = () => {
        setRenameActive(false)
    }

    const onConfirmDeleteClose = () => {
        setConfirmDeleteDialog(false)
    }

    const onBoardDelete = () => {
        setConfirmDeleteDialog(true)
    }

    const onAddNewTicket = () => {
        openDialog()
        updateDialogView('NEW_TICKET')
        setSelectedBoard(title)
    }

    const onDelete = () => {
        const newOrder = ordered.filter((elm) => elm !== title)
        const newColumns = {}
        Object.assign(newColumns, columns)
        delete newColumns[title]
        updateOrdered(newOrder)
    }

    const handleEnter = (newColumns, newOrder) => {
        updateColumns(newColumns)
        updateOrdered(newOrder)
    }

    return (
        <div
            className="board-title px-5 py-4 flex justify-between items-center"
            {...dragHandleProps}
        >
            {renameActive ? (
                <>
                    <RenameForm
                        title={title}
                        closeRenameForm={onRenameDeactivate}
                        columns={columns}
                        ordered={ordered}
                        onEnter={handleEnter}
                    />
                    <TbCircleXFilled
                        className="cursor-pointer text-lg"
                        onClick={onRenameDeactivate}
                    />
                </>
            ) : (
                <>
                    <h6>{title}</h6>
                    <Dropdown
                        placement="bottom-end"
                        renderTitle={<EllipsisButton />}
                    >
                        <Dropdown.Item
                            eventKey="renameBoard"
                            onClick={onRenameActive}
                        >
                            <span className="text-lg">
                                <TbPencil />
                            </span>
                            <span>Rename</span>
                        </Dropdown.Item>
                        <Dropdown.Item
                            eventKey="addTicket"
                            onClick={onAddNewTicket}
                        >
                            <span className="text-lg">
                                <TbCirclePlus />
                            </span>
                            <span>Add Ticket</span>
                        </Dropdown.Item>
                        <Dropdown.Item
                            eventKey="deleteBoard"
                            onClick={onBoardDelete}
                        >
                            <span className="text-lg">
                                <TbTrash />
                            </span>
                            <span>Delete Board</span>
                        </Dropdown.Item>
                    </Dropdown>
                </>
            )}
            <ConfirmDialog
                isOpen={confirmDeleteDialog}
                type="danger"
                title="Delete Board"
                onClose={onConfirmDeleteClose}
                onRequestClose={onConfirmDeleteClose}
                onCancel={onConfirmDeleteClose}
                onConfirm={onDelete}
            >
                <p>
                    Are you sure you want to delete this board? All the tickets
                    under this board will be deleted as well. This action cannot
                    be undone.
                </p>
            </ConfirmDialog>
        </div>
    )
}

export default BoardTitle
