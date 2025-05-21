'use client'
import { useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import Dialog from '@/components/ui/Dialog'
import { Form, FormItem } from '@/components/ui/Form'
import Badge from '@/components/ui/Badge'
import hooks from '@/components/ui/hooks'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TbChecks } from 'react-icons/tb'
import { components } from 'react-select'
import dayjs from 'dayjs'

const { Control } = components

const { useUniqueId } = hooks

const colorOptions = [
    {
        value: 'red',
        label: 'red',
        color: 'bg-red-400',
    },
    {
        value: 'orange',
        label: 'orange',
        color: 'bg-orange-400',
    },
    {
        value: 'yellow',
        label: 'yellow',
        color: 'bg-yellow-400',
    },
    {
        value: 'green',
        label: 'green',
        color: 'bg-green-400',
    },
    {
        value: 'blue',
        label: 'blue',
        color: 'bg-blue-400',
    },
    {
        value: 'purple',
        label: 'purple',
        color: 'bg-purple-400',
    },
]

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between rounded-lg p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Badge className={data.color} />
                <span className="ml-2 rtl:mr-2 capitalize">{label}</span>
            </div>
            {isSelected && <TbChecks className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]

    return (
        <Control className="capitalize" {...props}>
            {selected && (
                <Badge className={`${selected.color} ltr:ml-4 rtl:mr-4`} />
            )}
            {children}
        </Control>
    )
}

const validationSchema = z.object({
    title: z.string().min(1, { message: 'Event title required' }),
    startDate: z.date({
        required_error: 'Please select a date',
        invalid_type_error: "That's not a date!",
    }),
    endDate: z.date({
        required_error: 'Please select a date',
        invalid_type_error: "That's not a date!",
    }),
    color: z.string().min(1, { message: 'Color required' }),
})

const EventDialog = (props) => {
    const { submit, open, selected, onDialogOpen } = props

    const newId = useUniqueId('event-')

    const handleDialogClose = () => {
        onDialogOpen(false)
    }

    const onSubmit = (values) => {
        const eventData = {
            id: selected.id || newId,
            title: values.title,
            start: dayjs(values.startDate).format(),
            eventColor: values.color,
        }
        if (values.endDate) {
            eventData.end = dayjs(values.endDate).format()
        }
        console.log('eventData', eventData)
        submit?.(eventData, selected.type)
        handleDialogClose()
    }

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (selected) {
            reset({
                title: selected.title || '',
                startDate: selected.start && dayjs(selected.start).toDate(),
                endDate: selected.end && dayjs(selected.end).toDate(),
                color: selected.eventColor || colorOptions[0].value,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    return (
        <Dialog
            isOpen={open}
            onClose={handleDialogClose}
            onRequestClose={handleDialogClose}
        >
            <h5 className="mb-4">
                {selected.type === 'NEW' ? 'Add New Event' : 'Edit Event'}
            </h5>
            <Form
                className="flex-1 flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormItem
                    label="Event title"
                    invalid={Boolean(errors.title)}
                    errorMessage={errors.title?.message}
                >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Event title"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Start date"
                    invalid={Boolean(errors.startDate)}
                    errorMessage={errors.startDate?.message}
                >
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="End date"
                    invalid={Boolean(errors.endDate)}
                    errorMessage={errors.endDate?.message}
                >
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Event color"
                    asterisk={true}
                    invalid={Boolean(errors.color)}
                    errorMessage={errors.color?.message}
                >
                    <Controller
                        name="color"
                        control={control}
                        render={({ field }) => (
                            <Select
                                instanceId="event-color"
                                options={colorOptions}
                                value={colorOptions.filter(
                                    (option) => option.value === field.value,
                                )}
                                components={{
                                    Option: CustomSelectOption,
                                    Control: CustomControl,
                                }}
                                onChange={(selected) => {
                                    field.onChange(selected?.value)
                                }}
                            />
                        )}
                    />
                </FormItem>
                <FormItem className="mb-0 text-right rtl:text-left">
                    <Button block variant="solid" type="submit">
                        {selected.type === 'NEW' ? 'Create' : 'Update'}
                    </Button>
                </FormItem>
            </Form>
        </Dialog>
    )
}

export default EventDialog
