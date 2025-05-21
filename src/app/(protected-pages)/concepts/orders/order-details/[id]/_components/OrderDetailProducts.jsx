'use client'
import Avatar from '@/components/ui/Avatar'
import Card from '@/components/ui/Card'
import { NumericFormat } from 'react-number-format'

const OrderDetailProducts = ({ products }) => {
    return (
        <Card>
            <h4 className="mb-4">Products ordered</h4>
            <div className="flex flex-col gap-4">
                {products?.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-xl bg-gray-50 dark:bg-gray-700 p-4"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Avatar
                                    shape="round"
                                    size={60}
                                    src={product.img}
                                />
                                <div>
                                    <div className="heading-text font-bold">
                                        {product.name}
                                    </div>
                                    <div>ID: {product.productCode}</div>
                                </div>
                            </div>
                            <div className="ltr:text-right rtl:text-left">
                                <div className="heading-text font-bold">
                                    <NumericFormat
                                        fixedDecimalScale
                                        prefix="$"
                                        displayType="text"
                                        value={product.price}
                                        decimalScale={2}
                                        thousandSeparator={true}
                                    />
                                </div>
                                <div>Qty: {product.quantity}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default OrderDetailProducts
