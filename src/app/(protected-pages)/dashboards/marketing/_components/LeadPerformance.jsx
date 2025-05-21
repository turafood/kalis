'use client'
import Card from '@/components/ui/Card'
import Loading from '@/components/shared/Loading'
import classNames from '@/utils/classNames'
import { COLORS } from '@/constants/chart.constant'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/components/shared/Chart'), {
    ssr: false,
    loading: () => (
        <div className="h-[250px] flex items-center justify-center">
            <Loading loading />
        </div>
    ),
})

const LeadPerformance = ({ data }) => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Lead performance score</h4>
            </div>
            <div className="mt-6 ">
                <div className="min-h-[250px]">
                    <Chart
                        type="radar"
                        customOptions={{
                            xaxis: {
                                categories: data.categories,
                                labels: {
                                    formatter: (val) => {
                                        return `${data.categories.indexOf(val) + 1}`
                                    },
                                },
                            },
                            yaxis: {
                                show: false,
                            },
                            tooltip: {
                                custom: function ({ dataPointIndex }) {
                                    return `
                                        <div class="py-2 px-4 rounded-xl">
                                            <div class="flex items-center gap-2">
                                                <div class="h-[10px] w-[10px] rounded-full" style="background-color: ${COLORS[0]}"></div>
                                                <div class="flex gap-2">${data.categories[dataPointIndex]}: <span class="font-bold">${data.series[dataPointIndex]}</span></div>
                                            </div>
                                        </div>
                                    `
                                },
                            },
                        }}
                        series={[
                            {
                                name: 'Lead performance score',
                                data: data.series,
                            },
                        ]}
                        height={250}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    {data.categories.map((lead, index) => (
                        <div
                            key={lead + index}
                            className="flex items-center gap-4"
                        >
                            <div className="flex items-center gap-2">
                                <div className="rounded-full h-8 w-8 border-2 border-gray-200 dark:border-gray-600 font-bold heading-text flex items-center justify-center">
                                    {index + 1}
                                </div>
                                <div className="heading-text">{lead}</div>
                            </div>
                            <div className="border-dashed border-[1.5px] border-gray-300 dark:border-gray-500 flex-1" />
                            <div>
                                <span
                                    className={classNames(
                                        'rounded-full px-2 py-1 text-white',
                                        data.series[index] > 75 && 'bg-success',
                                        data.series[index] <= 30 && 'bg-error',
                                        data.series[index] > 30 &&
                                            data.series[index] < 75 &&
                                            'bg-warning',
                                    )}
                                >
                                    {data.series[index]}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}

export default LeadPerformance
