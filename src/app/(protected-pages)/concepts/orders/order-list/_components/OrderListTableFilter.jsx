'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import Drawer from '@/components/ui/Drawer'
import Checkbox from '@/components/ui/Checkbox'
import Badge from '@/components/ui/Badge'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { components } from 'react-select'
import { Form, FormItem } from '@/components/ui/Form'
import { useOrderListStore } from '../_store/orderListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { TbFilter } from 'react-icons/tb'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import classNames from '@/utils/classNames'

const { Control } = components

const statusOption = [
    { value: 'paid', label: 'Paid', className: 'bg-emerald-500' },
    { value: 'failed', label: 'Failed', className: 'bg-red-500' },
    { value: 'pending', label: 'Pending', className: 'bg-amber-500' },
    { value: 'all', label: 'All', className: 'bg-gray-400' },
]

const paymentMethodList = [
    'Credit card',
    'Debit card',
    'Paypal',
    'Stripe',
    'Cash',
]

const CustomSelectOption = (props) => {
    return (
        <DefaultOption
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Badge className={data.className} />
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Badge className={classNames('ml-4', selected.className)} />
            )}
            {children}
        </Control>
    )
}

const validationSchema = z.object({
    date: z.tuple([z.date(), z.date()]),
    status: z.string(),
    paymentMethod: z.array(z.string()),
})

const OrderListTableFilter = () => {
    const [filterIsOpen, setFilterIsOpen] = useState(false)

    const filterData = useOrderListStore((state) => state.filterData)
    const setFilterData = useOrderListStore((state) => state.setFilterData)

    const { onAppendQueryParams } = useAppendQueryParams()

    const { handleSubmit, control } = useForm({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values) => {
        setFilterData(values)
        onAppendQueryParams({
            minDate: values.date.toString(),
            maxDate: values.date.toString(),
            status: values.status,
            paymentMethod: values.paymentMethod.toString(),
        })
        setFilterIsOpen(false)
    }

    return (
        <>
            <Button icon={<TbFilter />} onClick={() => setFilterIsOpen(true)}>
                Filter
            </Button>
            <Drawer
                title="Filter"
                isOpen={filterIsOpen}
                onClose={() => setFilterIsOpen(false)}
                onRequestClose={() => setFilterIsOpen(false)}
            >
                <Form
                    className="h-full"
                    containerClassName="flex flex-col justify-between h-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <FormItem label="Product price">
                            <div className="flex items-center gap-2">
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker.DatePickerRange
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </FormItem>
                        <FormItem label="Product status">
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        instanceId="status"
                                        options={statusOption}
                                        {...field}
                                        value={statusOption.filter(
                                            (option) =>
                                                option.value === field.value,
                                        )}
                                        components={{
                                            Option: CustomSelectOption,
                                            Control: CustomControl,
                                        }}
                                        onChange={(option) =>
                                            field.onChange(option?.value)
                                        }
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem label="Product type">
                            <div className="mt-4">
                                <Controller
                                    name="paymentMethod"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox.Group
                                            vertical
                                            className="flex"
                                            {...field}
                                        >
                                            {paymentMethodList.map(
                                                (type, index) => (
                                                    <Checkbox
                                                        key={type + index}
                                                        name={field.name}
                                                        value={type}
                                                        className="justify-between flex-row-reverse heading-text"
                                                    >
                                                        {type}
                                                    </Checkbox>
                                                ),
                                            )}
                                        </Checkbox.Group>
                                    )}
                                />
                            </div>
                        </FormItem>
                    </div>
                    <Button variant="solid" type="submit">
                        Query
                    </Button>
                </Form>
            </Drawer>
        </>
    )
}

export default OrderListTableFilter
