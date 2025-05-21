import { useState } from 'react'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import Loading from '@/components/shared/Loading'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiGetScrumBoards } from '@/services/ProjectService'
import { TbCircleCheck, TbCircleCheckFilled } from 'react-icons/tb'
import useSWR from 'swr'
import dayjs from 'dayjs'

const ordered = ['To Do', 'In Progress', 'To Review', 'Completed']

const taskLabelColors = {
    'Live issue': 'bg-rose-100 dark:bg-rose-100 dark:text-gray-900',
    Task: 'bg-blue-100 dark:bg-blue-100 dark:text-gray-900',
    Bug: 'bg-amber-100 dark:bg-amber-100 dark:text-gray-900',
    'Low priority': 'bg-purple-100 dark:bg-purple-100 dark:text-gray-900',
}

const { Td, Tr, TBody } = Table

const ProjectDetailsTask = () => {
    const [selectedTask, setSelectedTask] = useState(null)

    const { data, isLoading, mutate } = useSWR(
        ['/api/projects/scrum-board'],
        () => apiGetScrumBoards(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    const handleCheckClick = (key, id) => {
        if (key !== 'Completed') {
            setSelectedTask({ key, id })
        }
    }

    const handleDialogConfirmClick = () => {
        if (selectedTask) {
            const { key, id } = selectedTask
            const newData = { ...data }
            if (key !== 'Completed') {
                let taskToMove = {}
                newData[key] = newData[key].filter((task) => {
                    if (task.id === id) {
                        task.checked = true
                        taskToMove = task
                    }
                    return task.id !== id
                })
                newData['Completed'].push(taskToMove)
                mutate(newData, false)
                setSelectedTask(null)
            }
        }
    }

    const handleDialogClose = () => {
        setSelectedTask(null)
    }

    return (
        <>
            <Loading loading={isLoading}>
                <div className="flex flex-col gap-12">
                    {ordered.map((key, index) => (
                        <div key={key + index}>
                            <h4 className="mb-4">{key}</h4>
                            {data && (
                                <Table compact hoverable={false}>
                                    <TBody>
                                        {data[key].map((task) => (
                                            <Tr key={task.id}>
                                                <Td className="w-[40px]">
                                                    <button
                                                        className="text-2xl cursor-pointer pt-1"
                                                        role="button"
                                                        onClick={() =>
                                                            handleCheckClick(
                                                                key,
                                                                task.id,
                                                            )
                                                        }
                                                    >
                                                        {task.checked ? (
                                                            <TbCircleCheckFilled className="text-primary" />
                                                        ) : (
                                                            <TbCircleCheck className="hover:text-primary" />
                                                        )}
                                                    </button>
                                                </Td>
                                                <Td className="w-[500px]">
                                                    <span className="heading-text font-bold">
                                                        {task.name}
                                                    </span>
                                                </Td>
                                                <Td className="w-[200px]">
                                                    {task.labels?.map(
                                                        (label, index) => (
                                                            <Tag
                                                                key={
                                                                    label +
                                                                    index
                                                                }
                                                                className={`mr-2 rtl:ml-2 mb-2 ${taskLabelColors[label]}`}
                                                            >
                                                                {label}
                                                            </Tag>
                                                        ),
                                                    )}
                                                </Td>
                                                <Td className="w-[150px]">
                                                    <span className="font-semibold">
                                                        {task.dueDate
                                                            ? dayjs(
                                                                  task.dueDate,
                                                              ).format(
                                                                  'MMMM DD',
                                                              )
                                                            : '-'}
                                                    </span>
                                                </Td>
                                                <Td>
                                                    <UsersAvatarGroup
                                                        avatarProps={{
                                                            size: 25,
                                                        }}
                                                        users={task.members}
                                                    />
                                                </Td>
                                            </Tr>
                                        ))}
                                    </TBody>
                                </Table>
                            )}
                        </div>
                    ))}
                </div>
            </Loading>
            <ConfirmDialog
                isOpen={Boolean(selectedTask)}
                type="info"
                title="Mark task as completed"
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
                onCancel={handleDialogClose}
                onConfirm={handleDialogConfirmClick}
            >
                <p>Are you sure you want mark this task as completed? </p>
            </ConfirmDialog>
        </>
    )
}

export default ProjectDetailsTask
