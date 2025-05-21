'use client'
import { useState } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import hooks from '@/components/ui/hooks'
import NewTaskField from './NewTaskField'
import { useProjectListStore } from '../_store/projectListStore'
import { useForm, Controller } from 'react-hook-form'
import sleep from '@/utils/sleep'
import { TbChecks } from 'react-icons/tb'
import { components } from 'react-select'
import cloneDeep from 'lodash/cloneDeep'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const { MultiValueLabel } = components

const { useUniqueId } = hooks

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <Avatar shape="circle" size={20} src={data.img} />
                <span className="font-semibold heading-text">{label}</span>
            </div>
            {isSelected && <TbChecks className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControlMulti = ({ children, ...props }) => {
    const { img } = props.data

    return (
        <MultiValueLabel {...props}>
            <div className="inline-flex items-center">
                <Avatar
                    className="mr-2 rtl:ml-2"
                    shape="circle"
                    size={15}
                    src={img}
                />
                {children}
            </div>
        </MultiValueLabel>
    )
}

const validationSchema = z.object({
    title: z.string().min(1, { message: 'Title required' }),
    content: z.string().min(1, { message: 'Content required' }),
    assignees: z.array(
        z.object({ value: z.string(), label: z.string(), img: z.string() }),
    ),
})

const NewProjectForm = ({ onClose }) => {
    const { memberList, updateProjectList } = useProjectListStore()

    const newId = useUniqueId()

    const [taskCount, setTaskCount] = useState({})
    const [isSubmiting, setSubmiting] = useState(false)

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            title: '',
            content: '',
            assignees: [],
        },
        resolver: zodResolver(validationSchema),
    })

    const handleAddNewTask = (count) => {
        setTaskCount(count)
    }

    const onSubmit = async (formValue) => {
        setSubmiting(true)
        const { title, content, assignees } = formValue

        const { totalTask, completedTask } = taskCount

        const member = cloneDeep(assignees).map((assignee) => {
            return {
                name: assignee.label,
                img: assignee.img,
            }
        })

        const values = {
            id: newId,
            name: title,
            desc: content,
            totalTask: totalTask,
            completedTask: completedTask,
            progression: (completedTask / totalTask) * 100 || 0,
            member,
        }

        updateProjectList(values)
        await sleep(500)
        setSubmiting(false)
        onClose()
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormItem
                label="Title"
                invalid={Boolean(errors.title)}
                errorMessage={errors.title?.message}
            >
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <Input type="text" autoComplete="off" {...field} />
                    )}
                />
            </FormItem>
            <FormItem
                label="Assignees"
                invalid={Boolean(errors.assignees)}
                errorMessage={errors.assignees?.message}
            >
                <Controller
                    name="assignees"
                    control={control}
                    render={({ field }) => (
                        <Select
                            isMulti
                            instanceId="assignees"
                            className="min-w-[120px]"
                            components={{
                                Option: CustomSelectOption,
                                MultiValueLabel: CustomControlMulti,
                            }}
                            value={field.value}
                            options={memberList}
                            onChange={field.onChange}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Content"
                invalid={Boolean(errors.content)}
                errorMessage={errors.content?.message}
            >
                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                        <Input textArea autoComplete="off" {...field} />
                    )}
                />
            </FormItem>
            <NewTaskField onAddNewTask={handleAddNewTask} />
            <Button block variant="solid" type="submit" loading={isSubmiting}>
                Submit
            </Button>
        </Form>
    )
}

export default NewProjectForm
