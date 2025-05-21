'use client'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import { usePricingStore } from '../_store/pricingStore'
import { featuresList } from '../constants'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import { NumericFormat } from 'react-number-format'
import { TbCheck } from 'react-icons/tb'

const Plans = ({ data, subcription, cycle }) => {
    const { paymentCycle, setPaymentDialog, setSelectedPlan } =
        usePricingStore()

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-4">
            {data?.plans.map((plan, index) => (
                <div
                    key={plan.id}
                    className={classNames(
                        'px-6 pt-2 flex flex-col justify-between',
                        !isLastChild(data.plans, index) &&
                            'border-r-0 xl:border-r border-gray-200 dark:border-gray-700',
                    )}
                >
                    <div>
                        <h5 className="mb-6 flex items-center gap-2">
                            <span>{plan.name}</span>
                            {plan.recommended && (
                                <Tag className="rounded-full bg-green-200 font-bold">
                                    Recommended
                                </Tag>
                            )}
                        </h5>
                        <div className="">{plan.description}</div>
                        <div className="mt-6">
                            <NumericFormat
                                className="h1"
                                displayType="text"
                                value={plan.price[paymentCycle]}
                                prefix={'$'}
                                thousandSeparator={true}
                            />
                            <span className="text-lg font-bold">
                                {' '}
                                /{' '}
                                {paymentCycle === 'monthly' ? 'month' : 'year'}
                            </span>
                        </div>
                        <div className="flex flex-col gap-4 border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                            {featuresList.map((feature) => (
                                <div
                                    key={feature.id}
                                    className="flex items-center gap-4 font-semibold heading-text"
                                >
                                    {plan.features.includes(feature.id) && (
                                        <>
                                            <TbCheck
                                                className={classNames(
                                                    'text-2xl',
                                                    plan.features.includes(
                                                        feature.id,
                                                    )
                                                        ? 'text-primary'
                                                        : 'text-gray-100',
                                                )}
                                            />
                                            <span>
                                                {feature.description[plan.id]}
                                            </span>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10">
                        <Button
                            block
                            disabled={
                                subcription === plan.id &&
                                cycle === paymentCycle
                            }
                            onClick={() => {
                                setSelectedPlan({
                                    paymentCycle,
                                    planName: plan.name,
                                    price: plan.price,
                                })
                                setPaymentDialog(true)
                            }}
                        >
                            {subcription === plan.id && cycle === paymentCycle
                                ? 'Current plan'
                                : 'Select plan'}
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Plans
