'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Segment from '@/components/ui/Segment'
import { Form, FormItem } from '@/components/ui/Form'
import { campaignTypeOption } from '../utils'
import NumericInput from '@/components/shared/NumericInput'
import classNames from '@/utils/classNames'
import sleep from '@/utils/sleep'
import dayjs from 'dayjs'
import CreatableSelect from 'react-select/creatable'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import uniqueId from 'lodash/uniqueId'

const audienceGroupOption = [
    { label: 'Existing customers', value: 'existingCustomer' },
    { label: 'Tech enthusiasts', value: 'techEnthusiasts' },
    { label: 'Students and parents', value: 'studentsParents' },
    { label: 'General public', value: 'generalPublic' },
    { label: 'Gift shoppers', value: 'giftShoppers' },
]

const validationSchema = z.object({
    name: z.string({ required_error: 'Please enter campaign name' }),
    startDate: z.number({ required_error: 'Please select a start date' }),
    endDate: z.number({ required_error: 'Please select a end date' }),
    budget: z.number({ required_error: 'Please enter budget' }),
    campaignType: z.string({ required_error: 'Please select campaign type' }),
    audienceGroup: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .nonempty('At least one is selected!'),
})

const CreateCampaign = ({ onCreate }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        resetField,
        control,
        watch,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleDialogCancel = () => {
        reset()
        handleDialogClose()
    }

    const onSubmit = async (formValue) => {
        await sleep(500)
        onCreate({
            id: uniqueId('campaign-'),
            name: formValue.name || 'Untitle campaign',
            startDate: formValue.startDate * 1000,
            endDate: formValue.endDate * 1000,
            budget: formValue.budget,
            leadsGenerated: 0,
            conversions: 0,
            conversionRate: 0,
            status: 'disabled',
            type: formValue.campaignType,
            audienceGroup: formValue.audienceGroup.map((group) => group.value),
        })
        reset()
        handleDialogClose()
    }

    return (
        <>
            <Button size="sm" onClick={() => setDialogOpen(true)}>
                Create campaign
            </Button>
            <Dialog
                isOpen={dialogOpen}
                width={600}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h4>New campaign</h4>
                <Form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <FormItem
                        label="Type"
                        invalid={Boolean(errors.campaignType)}
                        errorMessage={errors.campaignType?.message}
                    >
                        <Controller
                            name="campaignType"
                            control={control}
                            render={({ field }) => (
                                <Segment
                                    value={field.value}
                                    className="grid grid-cols-3 gap-4 bg-transparent"
                                    onChange={(value) => field.onChange(value)}
                                >
                                    {Object.entries(campaignTypeOption).map(
                                        ([key, props]) => (
                                            <Segment.Item key={key} value={key}>
                                                {({
                                                    active,
                                                    onSegmentItemClick,
                                                }) => {
                                                    return (
                                                        <div
                                                            className={classNames(
                                                                'flex justify-between border rounded-xl border-gray-300 py-5 px-4 select-none ring-1',
                                                                active
                                                                    ? 'ring-primary border-primary '
                                                                    : 'ring-transparent bg-gray-100',
                                                            )}
                                                            role="button"
                                                            onClick={
                                                                onSegmentItemClick
                                                            }
                                                        >
                                                            <div className="flex flex-col items-center justify-center flex-1 gap-2 heading-text font-bold">
                                                                <div className="text-3xl">
                                                                    {props.icon}
                                                                </div>
                                                                <div className="font-bold">
                                                                    {
                                                                        props.label
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }}
                                            </Segment.Item>
                                        ),
                                    )}
                                </Segment>
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Campaign name"
                        invalid={Boolean(errors.name)}
                        errorMessage={errors.name?.message}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Campaign name"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <div className="flex gap-4">
                        <FormItem
                            className="flex-1"
                            label="Start date"
                            invalid={Boolean(errors.startDate)}
                            errorMessage={errors.startDate?.message}
                        >
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        value={
                                            field.value
                                                ? dayjs
                                                      .unix(field.value)
                                                      .toDate()
                                                : null
                                        }
                                        placeholder="Select date"
                                        minDate={dayjs()
                                            .startOf('day')
                                            .toDate()}
                                        onChange={(date) => {
                                            if (watch('endDate')) {
                                                resetField('endDate')
                                            }
                                            field.onChange(dayjs(date).unix())
                                        }}
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            className="flex-1"
                            label="End date"
                            invalid={Boolean(errors.endDate)}
                            errorMessage={errors.endDate?.message}
                        >
                            <Controller
                                name="endDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        value={
                                            field.value
                                                ? dayjs
                                                      .unix(field.value)
                                                      .toDate()
                                                : null
                                        }
                                        placeholder="Select date"
                                        minDate={dayjs(
                                            dayjs.unix(watch('startDate')),
                                        )
                                            .endOf('day')
                                            .toDate()}
                                        onChange={(date) =>
                                            field.onChange(dayjs(date).unix())
                                        }
                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                    <FormItem
                        label="Budget"
                        invalid={Boolean(errors.budget)}
                        errorMessage={errors.budget?.message}
                    >
                        <Controller
                            name="budget"
                            control={control}
                            render={({ field }) => (
                                <NumericInput
                                    allowLeadingZeros
                                    thousandSeparator=","
                                    value={field.value}
                                    inputPrefix={'$'}
                                    placeholder="0.00"
                                    onValueChange={(e) => {
                                        field.onChange(e.floatValue)
                                    }}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Multiple Select"
                        invalid={Boolean(errors.audienceGroup)}
                        errorMessage={errors.audienceGroup?.message}
                    >
                        <Controller
                            name="audienceGroup"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    isMulti
                                    instanceId="audience-group"
                                    componentAs={CreatableSelect}
                                    options={audienceGroupOption}
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <div className="flex justify-end gap-2">
                        <Button type="button" onClick={handleDialogCancel}>
                            Cancel
                        </Button>
                        <Button
                            loading={isSubmitting}
                            variant="solid"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </Dialog>
        </>
    )
}

export default CreateCampaign
