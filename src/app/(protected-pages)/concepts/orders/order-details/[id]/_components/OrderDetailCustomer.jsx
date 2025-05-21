'use client'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import IconText from '@/components/shared/IconText'
import { TbMail, TbExternalLink, TbPhone } from 'react-icons/tb'
import Link from 'next/link'

const OrderDetailCustomer = ({ customer }) => {
    return (
        <Card>
            <h4 className="mb-4">Customer</h4>
            <Link
                className="group flex items-center justify-between"
                href="/concepts/customers/customer-details/11"
            >
                <div className="flex items-center gap-2">
                    <Avatar shape="circle" src={customer.img} />
                    <div>
                        <div className="font-bold heading-text">
                            {customer.name}
                        </div>
                        <span>
                            <span className="font-semibold">
                                {customer.previousOrder}{' '}
                            </span>
                            previous orders
                        </span>
                    </div>
                </div>
                <TbExternalLink className="text-xl hidden group-hover:block" />
            </Link>
            <hr className="my-5" />
            <IconText
                className="mb-4"
                icon={<TbMail className="text-xl opacity-70" />}
            >
                <span>{customer.email}</span>
            </IconText>
            <IconText icon={<TbPhone className="text-xl opacity-70" />}>
                <span>{customer.phone}</span>
            </IconText>
            <hr className="my-5" />
            <h6 className="mb-4 font-bold">Shipping Address</h6>
            <address className="not-italic">
                <div className="mb-1">{customer.shippingAddress.line1}</div>
                <div className="mb-1">{customer.shippingAddress.line2}</div>
                <div className="mb-1">{customer.shippingAddress.line3}</div>
                <div>{customer.shippingAddress.line4}</div>
            </address>
            <hr className="my-5" />
            <h6 className="mb-4 font-bold">Billing address</h6>
            <address className="not-italic">
                <div className="mb-1">{customer.billingAddress.line1}</div>
                <div className="mb-1">{customer.billingAddress.line2}</div>
                <div className="mb-1">{customer.billingAddress.line3}</div>
                <div>{customer.billingAddress.line4}</div>
            </address>
        </Card>
    )
}

export default OrderDetailCustomer
