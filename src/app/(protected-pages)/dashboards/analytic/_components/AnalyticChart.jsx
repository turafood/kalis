'use client'
import { useEffect, useRef } from 'react'
import Card from '@/components/ui/Card'
import Loading from '@/components/shared/Loading'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import { COLORS } from '@/constants/chart.constant'
import useTheme from '@/utils/hooks/useTheme'
import { NumericFormat } from 'react-number-format'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/components/shared/Chart'), {
    ssr: false,
    loading: () => (
        <div className="h-[330px] flex items-center justify-center">
            <Loading loading />
        </div>
    ),
})

const WebAnalytic = ({ data }) => {
    const isFirstRender = useRef(true)

    const sideNavCollapse = useTheme((state) => state.layout.sideNavCollapse)

    useEffect(() => {
        if (!sideNavCollapse && isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (!isFirstRender.current) {
            window.dispatchEvent(new Event('resize'))
        }
    }, [sideNavCollapse])

    return (
        <Card className="h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h4>Web analytic</h4>
                <div className="inline-flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <div
                            className="h-3.5 w-3.5 rounded-sm"
                            style={{ backgroundColor: COLORS[0] }}
                        />
                        <div>Natural</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div
                            className="h-3.5 w-3.5 rounded-sm"
                            style={{ backgroundColor: COLORS[7] }}
                        />
                        <div>Referral</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div
                            className="h-3.5 w-3.5 rounded-sm"
                            style={{ backgroundColor: COLORS[8] }}
                        />
                        <div>Direct</div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="flex items-center gap-10">
                    <div>
                        <div className="mb-2">Page views</div>
                        <div className="flex items-end gap-2">
                            <h3>
                                <NumericFormat
                                    displayType="text"
                                    value={data.pageView.value}
                                    prefix={'$'}
                                    thousandSeparator={true}
                                />
                            </h3>
                            <GrowShrinkValue
                                className="font-bold"
                                value={data.pageView.growShrink}
                                suffix="%"
                                positiveIcon="+"
                                negativeIcon=""
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">Avg. Time on page</div>
                        <div className="flex items-end gap-2">
                            <h3>{data.avgTimeOnPage.value}</h3>
                            <GrowShrinkValue
                                className="font-bold"
                                value={data.avgTimeOnPage.growShrink}
                                suffix="%"
                                positiveIcon="+"
                                negativeIcon=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 min-h-[330px]">
                <Chart
                    type="line"
                    series={data.series}
                    xAxis={data.date}
                    height="330px"
                    customOptions={{
                        legend: { show: false },
                        colors: [COLORS[0], COLORS[7], COLORS[8]],
                    }}
                />
            </div>
        </Card>
    )
}

export default WebAnalytic
