'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import Checkbox from '@/components/ui/Checkbox'
import Badge from '@/components/ui/Badge'
import { useProductListStore } from '../_store/productListStore'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { components } from 'react-select'
import { Form, FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { TbFilter, TbMinus } from 'react-icons/tb'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import classNames from '@/utils/classNames'

const { Control } = components

const productStatusOption = [
    { value: 'published', label: 'Published', className: 'bg-emerald-500' },
    { value: 'inactive', label: 'Inactive', className: 'bg-red-500' },
    { value: 'scheduled', label: 'Scheduled', className: 'bg-amber-500' },
    { value: 'draft', label: 'Draft', className: 'bg-gray-400' },
]

const productTypeList = ['Bags', 'Cloths', 'Devices', 'Shoes', 'Watches']

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
    minAmount: z.union([z.string(), z.number()]),
    maxAmount: z.union([z.string(), z.number()]),
    productStatus: z.string(),
    productType: z.array(z.string()),
})

const ProductTableFilter = () => {
    const [filterIsOpen, setFilterIsOpen] = useState(false)

    const { filterData, setFilterData } = useProductListStore()

    const { onAppendQueryParams } = useAppendQueryParams()

    const { handleSubmit, control, getValues } = useForm({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values) => {
        setFilterData(values)

        onAppendQueryParams({
            minAmount: values.minAmount,
            maxAmount: values.maxAmount,
            productStatus: values.productStatus,
            productType: values.productType.join(','),
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
                                    name="minAmount"
                                    control={control}
                                    render={({ field }) => (
                                        <NumericInput
                                            thousandSeparator
                                            type="text"
                                            inputPrefix="$"
                                            autoComplete="off"
                                            placeholder="0.00"
                                            value={field.value}
                                            max={getValues('maxAmount')}
                                            isAllowed={(values) => {
                                                const { floatValue } = values
                                                return (
                                                    (floatValue || 0) <=
                                                    getValues('maxAmount')
                                                )
                                            }}
                                            onChange={(e) =>
                                                field.onChange(e.target.value)
                                            }
                                        />
                                    )}
                                />
                                <span>
                                    <TbMinus />
                                </span>
                                <Controller
                                    name="maxAmount"
                                    control={control}
                                    render={({ field }) => (
                                        <NumericInput
                                            thousandSeparator
                                            type="text"
                                            inputPrefix="$"
                                            autoComplete="off"
                                            placeholder="0.00"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </FormItem>
                        <FormItem label="Product status">
                            <Controller
                                name="productStatus"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        instanceId="status"
                                        options={productStatusOption}
                                        {...field}
                                        value={productStatusOption.filter(
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
                                    name="productType"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox.Group
                                            vertical
                                            className="flex"
                                            {...field}
                                        >
                                            {productTypeList.map(
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

export default ProductTableFilter
