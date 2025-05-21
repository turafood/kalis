'use client'
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Segment from '@/components/ui/Segment'
import Badge from '@/components/ui/Badge'
import Loading from '@/components/shared/Loading'
import { COLORS } from '@/constants/chart.constant'
import isEmpty from 'lodash/isEmpty'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/components/shared/Chart'), {
    ssr: false,
    loading: () => {
        return (
            <div className="h-[300px] flex items-center justify-center">
                <Loading loading />
            </div>
        )
    },
})

const ChartLegend = ({ label, value, color, showBadge = true }) => {
    return (
        <div className="flex gap-2">
            {showBadge && (
                <Badge className="mt-2.5" style={{ backgroundColor: color }} />
            )}
            <div>
                <h5 className="font-bold">{value}</h5>
                <p>{label}</p>
            </div>
        </div>
    )
}

const TaskOverview = ({ data }) => {
    const [timeRange, setTimeRange] = useState('weekly')

    return (
        <Card>
            <div className="flex sm:flex-row flex-col md:items-center justify-between mb-6 gap-4">
                <h4>Task overview</h4>
                <Segment
                    value={timeRange}
                    size="sm"
                    onChange={(val) => setTimeRange(val)}
                >
                    <Segment.Item value="daily">Daily</Segment.Item>
                    <Segment.Item value="weekly">Weekly</Segment.Item>
                </Segment>
            </div>
            {!isEmpty(data) && (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <ChartLegend
                                showBadge={false}
                                label="Total Tasks"
                                value={data[timeRange].total}
                            />
                        </div>
                        <div className="flex gap-x-6">
                            <ChartLegend
                                color={COLORS[7]}
                                label={data[timeRange].series[0].name}
                                value={data[timeRange].onGoing}
                            />
                            <ChartLegend
                                color={COLORS[8]}
                                label={data[timeRange].series[1].name}
                                value={data[timeRange].finished}
                            />
                        </div>
                    </div>
                    <div>
                        <Chart
                            series={data[timeRange].series}
                            xAxis={data[timeRange].range}
                            type="bar"
                            customOptions={{
                                colors: [COLORS[7], COLORS[8]],
                                legend: { show: false },
                                plotOptions: {
                                    bar: {
                                        columnWidth: '15px',
                                        borderRadius: 4,
                                        borderRadiusApplication: 'end',
                                    },
                                },
                            }}
                        />
                    </div>
                </>
            )}
        </Card>
    )
}

export default TaskOverview
