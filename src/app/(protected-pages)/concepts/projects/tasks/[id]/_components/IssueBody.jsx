'use client'
import { useState, useRef } from 'react'
import { useIssueStore } from '../_store/issueStore'
import DatePicker from '@/components/ui/DatePicker'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import Tag from '@/components/ui/Tag'
import Badge from '@/components/ui/Badge'
import RichTextEditor from '@/components/shared/RichTextEditor'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import IssueField from './IssueField'
import IssueFieldDropdown from './IssueFieldDropdown'
import classNames from '@/utils/classNames'
import dayjs from 'dayjs'
import ReactHtmlParser from 'html-react-parser'
import {
    TbTag,
    TbCircle,
    TbFlag,
    TbFlag2Filled,
    TbUser,
    TbClock,
    TbCheck,
} from 'react-icons/tb'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const labelList = [
    { id: '1', title: 'Bug' },
    { id: '2', title: 'Live issue' },
    { id: '3', title: 'Task' },
    { id: '4', title: 'Optimization' },
]

export const taskLabelColors = {
    'Live issue': 'bg-rose-200 dark:bg-rose-200 dark:text-gray-900',
    Task: 'bg-blue-200 dark:bg-blue-200 dark:text-gray-900',
    Bug: 'bg-amber-200 dark:bg-amber-200 dark:text-gray-900',
    Optimization: 'bg-purple-200 dark:bg-purple-200 dark:text-gray-900',
    'In progress': 'bg-sky-200 dark:bg-sky-200 dark:text-gray-900',
    Completed: 'bg-emerald-200 dark:bg-emerald-200 dark:text-gray-900',
    Pending: 'bg-amber-200 dark:bg-amber-200 dark:text-gray-900',
}

const statusList = ['Pending', 'In progress', 'Completed']

const priorityList = ['Low', 'Medium', 'High']

const flagColors = {
    Low: {
        text: 'text-success',
        bg: 'bg-success',
    },
    Medium: {
        text: 'text-warning',
        bg: 'bg-warning',
    },
    High: {
        text: 'text-error',
        bg: 'bg-error',
    },
}

const IssueBody = () => {
    const descriptionInput = useRef(null)

    const { issueData, updateIssueData, memberList } = useIssueStore()

    const [editDescription, setEditDescription] = useState(false)

    const createNewData = () => {
        return { ...issueData }
    }

    const handleAddLabelClick = (value) => {
        const newData = createNewData()
        if (newData.labels.some((label) => label.id === value)) {
            newData.labels = newData.labels.filter(
                (label) => label.id !== value,
            )
        } else {
            const label = labelList.find((label) => label.id === value)
            if (label) {
                newData.labels.push(label)
            }
        }
        updateIssueData(newData)
    }

    const handleChangeStatusClick = (value) => {
        const newData = createNewData()
        newData.status = value
        updateIssueData(newData)
    }

    const handlePriorityChange = (value) => {
        const newData = createNewData()
        newData.priority = value
        updateIssueData(newData)
    }

    const handleAddMember = (value) => {
        const newData = createNewData()
        if (newData.assignees.some((member) => member.id === value)) {
            newData.assignees = newData.assignees.filter(
                (member) => member.id !== value,
            )
        } else {
            const member = memberList.find((member) => member.id === value)
            if (member) {
                newData.assignees.push(member)
            }
        }
        updateIssueData(newData)
    }

    const handleDueDateChange = (date) => {
        const newData = createNewData()
        newData.dueDate = dayjs(date).unix()
        updateIssueData(newData)
    }

    const handleDescriptionChange = (value) => {
        const newData = createNewData()
        newData.description = value
        updateIssueData(newData)
    }

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                },
                orderedList: {
                    keepMarks: true,
                },
            }),
        ],
        editorProps: {
            attributes: {
                class: 'm-2 focus:outline-hidden',
            },
        },
        content: issueData.description,
        onUpdate({ editor }) {
            handleDescriptionChange(editor.getHTML())
        },
    })

    const handleDescriptionClick = () => {
        setEditDescription(true)
        editor?.chain().focus()
    }

    return (
        <div>
            <div className="grid grid-cols-1 xl:grid-cols-2">
                <div className="flex flex-col">
                    <IssueFieldDropdown
                        title="Label"
                        icon={<TbTag />}
                        dropdownTrigger={
                            <>
                                {issueData.labels?.map((label, index) => (
                                    <Tag
                                        key={label.title + index}
                                        className={`${
                                            taskLabelColors[label.title]
                                        }`}
                                    >
                                        {label.title}
                                    </Tag>
                                ))}
                            </>
                        }
                    >
                        {labelList.map((label) => (
                            <Dropdown.Item
                                key={label.title}
                                eventKey={label.id}
                                onSelect={handleAddLabelClick}
                            >
                                <div className="flex items-center relative">
                                    {issueData.labels.some(
                                        (labelitem) =>
                                            labelitem.id === label.id,
                                    ) && (
                                        <TbCheck className="absolute text-primary ltr:left-[-5px] text-lg" />
                                    )}
                                    <span
                                        className={classNames(
                                            issueData.labels.length > 0 &&
                                                'mx-5',
                                        )}
                                    >
                                        {label.title}
                                    </span>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </IssueFieldDropdown>
                    <IssueFieldDropdown
                        title="Status"
                        icon={<TbCircle />}
                        dropdownTrigger={
                            <Tag
                                className={`${
                                    taskLabelColors[issueData.status || '']
                                }`}
                            >
                                {issueData.status}
                            </Tag>
                        }
                    >
                        {statusList.map((status) => (
                            <Dropdown.Item
                                key={status}
                                eventKey={status}
                                active={status === issueData.status}
                                onSelect={handleChangeStatusClick}
                            >
                                <div className="flex items-center relative">
                                    <span>{status}</span>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </IssueFieldDropdown>
                    <IssueFieldDropdown
                        title="Priority"
                        icon={<TbFlag />}
                        dropdownTrigger={
                            <div className="flex items-center gap-2">
                                <TbFlag2Filled
                                    className={classNames(
                                        'text-lg',
                                        `${
                                            flagColors[issueData.priority || '']
                                                ?.text
                                        }`,
                                    )}
                                />
                                <span className="font-semibold">
                                    {issueData.priority}
                                </span>
                            </div>
                        }
                    >
                        {priorityList.map((priority) => (
                            <Dropdown.Item
                                key={priority}
                                eventKey={priority}
                                active={priority === issueData.priority}
                                onSelect={handlePriorityChange}
                            >
                                <div className="flex items-center">
                                    <Badge
                                        innerClass={`${flagColors[priority]?.bg}`}
                                    />
                                    <span className="ml-2 rtl:mr-2">
                                        {priority}
                                    </span>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </IssueFieldDropdown>
                </div>
                <div className="flex flex-col">
                    <IssueFieldDropdown
                        title="Assigned to"
                        icon={<TbUser />}
                        dropdownTrigger={
                            <UsersAvatarGroup
                                className="gap-1"
                                avatarProps={{
                                    className: 'cursor-pointer',
                                }}
                                avatarGroupProps={{ maxCount: 4 }}
                                chained={false}
                                users={issueData.assignees}
                            />
                        }
                    >
                        {memberList.map((member) => (
                            <Dropdown.Item
                                key={member.name}
                                eventKey={member.id}
                                onSelect={handleAddMember}
                            >
                                <div
                                    className={classNames(
                                        'flex items-center justify-between relative',
                                    )}
                                >
                                    {issueData.assignees.some(
                                        (assignee) => assignee.id === member.id,
                                    ) && (
                                        <TbCheck className="absolute text-primary ltr:left-[-5px] text-lg" />
                                    )}
                                    <div
                                        className={classNames(
                                            'flex items-center gap-2',
                                            issueData.labels.length > 0 &&
                                                'mx-5',
                                        )}
                                    >
                                        <Avatar
                                            shape="circle"
                                            size={22}
                                            src={member.img}
                                        />
                                        <span>{member.name}</span>
                                    </div>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </IssueFieldDropdown>
                    <IssueField title="Due date" icon={<TbClock />}>
                        <div className="flex items-center gap-1 px-3 rounded-xl hover:bg-gray-200: dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 cursor-pointer w-full min-h-[46px] relative">
                            <span className="font-semibold">
                                {dayjs
                                    .unix(issueData.dueDate || 0)
                                    .format('MMMM DD')}
                            </span>
                            <DatePicker
                                className="opacity-0 cursor-pointer absolute"
                                value={dayjs
                                    .unix(issueData.dueDate || dayjs().unix())
                                    .toDate()}
                                inputtable={false}
                                inputPrefix={null}
                                inputSuffix={null}
                                clearable={false}
                                onChange={(date) => handleDueDateChange(date)}
                            />
                        </div>
                    </IssueField>
                </div>
            </div>
            <div className="mt-8">
                <h5 className="mb-4">Description</h5>
                {editDescription ? (
                    <RichTextEditor
                        ref={descriptionInput}
                        content={issueData.description}
                        customEditor={editor}
                        onBlur={() => setEditDescription(false)}
                    />
                ) : (
                    <div
                        className="mt-2 prose max-w-full cursor-pointer"
                        role="button"
                        onClick={handleDescriptionClick}
                    >
                        <div className="prose-p:text-sm dark:prose-p:text-gray-400">
                            {ReactHtmlParser(issueData.description || '')}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default IssueBody
