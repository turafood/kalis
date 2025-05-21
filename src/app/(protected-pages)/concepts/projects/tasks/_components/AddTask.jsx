'use client'
import { useEffect, useState, useRef } from 'react'
import classNames from '@/utils/classNames'
import Tag from '@/components/ui/Tag'
import Avatar from '@/components/ui/Avatar'
import Table from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import Badge from '@/components/ui/Badge'
import DatePicker from '@/components/ui/DatePicker'
import { labelClass } from '../utils'
import { useTasksStore } from '../_store/tasksStore'
import {
    TbPlus,
    TbCircleCheck,
    TbChevronDown,
    TbCalendar,
    TbUser,
} from 'react-icons/tb'
import dayjs from 'dayjs'
import uniqueId from 'lodash/uniqueId'

const { TBody, Tr, Td } = Table

const priorityList = ['Low', 'Medium', 'High']

const statusList = ['Pending', 'In Progress']

const AddTask = ({
    groupKey,
    isCreatingTask,
    onAddTaskClick,
    onCreateTask,
}) => {
    const inputRef = useRef(null)

    const [focused, setFocused] = useState(false)

    const [status, setStatus] = useState('')
    const [priority, setPriority] = useState('')
    const [assignee, setAssignee] = useState('')
    const [dueDate, setDuedate] = useState(null)

    const { boardMembers } = useTasksStore()

    useEffect(() => {
        if (isCreatingTask) {
            inputRef.current?.focus()
        }
    }, [isCreatingTask])

    const handleCreateClick = () => {
        const task = {
            id: uniqueId('task_'),
            name: inputRef.current?.value || 'Untitled task',
            progress: status || statusList[0],
            assignee: {
                id: assignee,
                name:
                    boardMembers.find((member) => member.id === assignee)
                        ?.name || '',
                img:
                    boardMembers.find((member) => member.id === assignee)
                        ?.img || '',
            },
            priority: priority || priorityList[0],
            dueDate,
            checked: false,
        }

        onCreateTask(task)
        setStatus('')
        setPriority('')
        setAssignee('')
        setDuedate(null)
    }

    return (
        <>
            {isCreatingTask ? (
                <>
                    <div
                        className={classNames(
                            'rounded-lg transition-shadow duration-150',
                            focused && 'shadow-xl',
                        )}
                    >
                        <Table hoverable={false} overflow={false}>
                            <TBody>
                                <Tr>
                                    <Td className="w-[66px]"></Td>
                                    <Td className="w-[40px] text-2xl">
                                        <TbCircleCheck />
                                    </Td>
                                    <Td className="w-[500px]">
                                        <input
                                            ref={inputRef}
                                            className="outline-0 font-semibold w-full heading-text bg-transparent"
                                            placeholder="Enter task name"
                                            onFocus={() => setFocused(true)}
                                            onBlur={() => setFocused(false)}
                                        />
                                    </Td>
                                    <Td className="w-[150px]">
                                        <Dropdown
                                            renderTitle={
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    {status ? (
                                                        <Tag
                                                            className={`${
                                                                status
                                                                    ? labelClass[
                                                                          status
                                                                      ]
                                                                    : ''
                                                            }`}
                                                        >
                                                            {status}
                                                        </Tag>
                                                    ) : (
                                                        <span className="font-semibold">
                                                            Status
                                                        </span>
                                                    )}
                                                    <TbChevronDown className="text-lg" />
                                                </div>
                                            }
                                            placement="bottom-end"
                                        >
                                            {statusList.map((status) => (
                                                <Dropdown.Item
                                                    key={status}
                                                    eventKey={status}
                                                    onSelect={setStatus}
                                                >
                                                    <div className="flex items-center">
                                                        <Badge
                                                            innerClass={`${labelClass[status]}`}
                                                        />
                                                        <span className="ml-2 rtl:mr-2">
                                                            {status}
                                                        </span>
                                                    </div>
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown>
                                    </Td>
                                    <Td className="w-[150px]">
                                        <Dropdown
                                            renderTitle={
                                                <div className="flex items-center gap-1 cursor-pointer">
                                                    {priority ? (
                                                        <Tag
                                                            className={`${
                                                                priority
                                                                    ? labelClass[
                                                                          priority
                                                                      ]
                                                                    : ''
                                                            }`}
                                                        >
                                                            {priority}
                                                        </Tag>
                                                    ) : (
                                                        <span className="font-semibold">
                                                            Priority
                                                        </span>
                                                    )}
                                                    <TbChevronDown className="text-lg" />
                                                </div>
                                            }
                                            placement="bottom-end"
                                        >
                                            {priorityList.map((priority) => (
                                                <Dropdown.Item
                                                    key={priority}
                                                    eventKey={priority}
                                                    onSelect={setPriority}
                                                >
                                                    <div className="flex items-center">
                                                        <Badge
                                                            innerClass={`${labelClass[priority]}`}
                                                        />
                                                        <span className="ml-2 rtl:mr-2">
                                                            {priority}
                                                        </span>
                                                    </div>
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown>
                                    </Td>
                                    <Td className="w-[150px]">
                                        <div className="flex items-center gap-2 cursor-pointer relative max-w-[200px]">
                                            <TbCalendar className="text-xl" />
                                            <span className="font-semibold">
                                                {dueDate
                                                    ? dayjs
                                                          .unix(dueDate)
                                                          .format('DD MMM')
                                                    : 'Due date'}
                                            </span>
                                            <DatePicker
                                                className="opacity-0 cursor-pointer absolute"
                                                value={dayjs
                                                    .unix(
                                                        dueDate ||
                                                            dayjs().unix(),
                                                    )
                                                    .toDate()}
                                                inputtable={false}
                                                inputPrefix={null}
                                                inputSuffix={null}
                                                clearable={false}
                                                onChange={(date) =>
                                                    setDuedate(
                                                        dayjs(date).unix(),
                                                    )
                                                }
                                            />
                                        </div>
                                    </Td>
                                    <Td className="py-1">
                                        <div className="flex items-center justify-between">
                                            <Dropdown
                                                placement="bottom"
                                                renderTitle={
                                                    <div className="flex items-center gap-2 cursor-pointer">
                                                        {assignee ? (
                                                            <>
                                                                <Avatar
                                                                    shape="circle"
                                                                    size="sm"
                                                                    src={
                                                                        boardMembers.find(
                                                                            (
                                                                                member,
                                                                            ) =>
                                                                                member.id ===
                                                                                assignee,
                                                                        )?.img
                                                                    }
                                                                />
                                                                <span className="font-bold heading-text">
                                                                    {
                                                                        boardMembers.find(
                                                                            (
                                                                                member,
                                                                            ) =>
                                                                                member.id ===
                                                                                assignee,
                                                                        )?.name
                                                                    }
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <TbUser className="text-xl" />
                                                                <span className="font-semibold">
                                                                    Assignee
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                }
                                            >
                                                {boardMembers.map((member) => (
                                                    <Dropdown.Item
                                                        key={member.name}
                                                        eventKey={member.id}
                                                        onSelect={() =>
                                                            setAssignee(
                                                                member.id,
                                                            )
                                                        }
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <Avatar
                                                                    shape="circle"
                                                                    size={22}
                                                                    src={
                                                                        member.img
                                                                    }
                                                                />
                                                                <span className="ml-2 rtl:mr-2">
                                                                    {
                                                                        member.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown>

                                            <Button
                                                size="sm"
                                                variant="solid"
                                                onClick={handleCreateClick}
                                            >
                                                Create
                                            </Button>
                                        </div>
                                    </Td>
                                </Tr>
                            </TBody>
                        </Table>
                    </div>
                </>
            ) : (
                <Button
                    block
                    icon={<TbPlus />}
                    customColorClass={() =>
                        'border-dashed border-2 hover:ring-transparent bg-gray-50'
                    }
                    onClick={() => onAddTaskClick(groupKey)}
                >
                    Add task
                </Button>
            )}
        </>
    )
}

export default AddTask
