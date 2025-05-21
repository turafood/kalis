'use client'
import Card from '@/components/ui/Card'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import classNames from '@/utils/classNames'
import { NumericFormat } from 'react-number-format'
import {
    TbMoneybag,
    TbReportMoney,
    TbRefreshAlert,
    TbMagnet,
} from 'react-icons/tb'

const SummarySegment = ({
    title,
    value,
    growShrink,
    icon,
    iconClass,
    className,
}) => {
    return (
        <div className={classNames('flex flex-col gap-2 py-4 px-6', className)}>
            <div
                className={classNames(
                    'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 text-gray-900 rounded-full text-2xl',
                    iconClass,
                )}
            >
                {icon}
            </div>
            <div className="mt-4">
                <div className="mb-1">{title}</div>
                <h3 className="mb-1">{value}</h3>
                <div className="inline-flex items-center flex-wrap gap-1">
                    <GrowShrinkValue
                        className="font-bold"
                        value={growShrink}
                        suffix="%"
                        positiveIcon="+"
                        negativeIcon=""
                    />
                    <span>vs last month</span>
                </div>
            </div>
        </div>
    )
}

const KpiSummary = ({ data }) => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Kpi summary</h4>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                <SummarySegment
                    title="Total marketing spend"
                    value={
                        <NumericFormat
                            prefix="$"
                            displayType="text"
                            value={data.totalMarketingSpend.value}
                            thousandSeparator={true}
                        />
                    }
                    growShrink={data.totalMarketingSpend.growShrink}
                    icon={<TbMoneybag />}
                    iconClass="bg-rose-200"
                    className="border-b border-r-0 md:border-b-0 md:ltr:border-r md:rtl:border-l border-gray-200 dark:border-gray-700"
                />
                <SummarySegment
                    title="ROI"
                    value={
                        <NumericFormat
                            suffix="%"
                            displayType="text"
                            value={data.roi.value}
                            thousandSeparator={true}
                        />
                    }
                    growShrink={data.roi.growShrink}
                    icon={<TbReportMoney />}
                    iconClass="bg-sky-200"
                    className="border-b md:border-b-0 xl:ltr:border-r xl:rtl:border-l border-gray-200 dark:border-gray-700"
                />
                <SummarySegment
                    title="Conversion rates"
                    value={
                        <NumericFormat
                            suffix="%"
                            displayType="text"
                            value={data.conversionRates.value}
                            thousandSeparator={true}
                        />
                    }
                    growShrink={data.conversionRates.growShrink}
                    icon={<TbRefreshAlert />}
                    iconClass="bg-emerald-200"
                    className="border-b border-r-0 md:border-b-0 md:ltr:border-r md:rtl:border-l border-gray-200 dark:border-gray-700"
                />
                <SummarySegment
                    title="Total leads"
                    value={
                        <NumericFormat
                            displayType="text"
                            value={data.totalLeads.value}
                            thousandSeparator={true}
                        />
                    }
                    growShrink={data.totalLeads.growShrink}
                    icon={<TbMagnet />}
                    iconClass="bg-purple-200"
                />
            </div>
        </Card>
    )
}

export default KpiSummary
