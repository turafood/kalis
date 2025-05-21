'use client'
import { useState, useMemo } from 'react'
import Card from '@/components/ui/Card'
import Segment from '@/components/ui/Segment'
import Loading from '@/components/shared/Loading'
import { COLORS } from '@/constants/chart.constant'
import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => (
        <div className="h-[465px] flex items-center justify-center">
            <Loading loading />
        </div>
    ),
})

const AdsPerformance = ({ data }) => {
    const [category, setCategory] = useState('all')

    const series = useMemo(() => {
        const campaignSeries = {
            name: 'Campaign (ROI)',
            type: 'column',
            data: data.campagin,
            color: function ({ dataPointIndex, value }) {
                if (
                    dataPointIndex > 0 &&
                    value < data.campagin[dataPointIndex - 1]
                ) {
                    return COLORS[7]
                }
                return COLORS[9]
            },
        }

        const emailSeries = {
            name: 'Email (ROI)',
            type: 'line',
            data: data.email,
            color: COLORS[0],
        }

        if (category === 'all') {
            return [campaignSeries, emailSeries]
        }

        if (category === 'campagin') {
            return [campaignSeries]
        }

        if (category === 'email') {
            return [emailSeries]
        }

        return []
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Ads performance</h4>
                <div>
                    <Segment
                        className="gap-1"
                        value={category}
                        size="sm"
                        onChange={(val) => setCategory(val)}
                    >
                        <Segment.Item value="all">All</Segment.Item>
                        <Segment.Item value="campagin">Campagin</Segment.Item>
                        <Segment.Item value="email">Email</Segment.Item>
                    </Segment>
                </div>
            </div>
            <div className="mt-6 min-h-[465px]">
                <ApexChart
                    options={{
                        chart: {
                            type: 'line',
                            zoom: {
                                enabled: false,
                            },
                            toolbar: {
                                show: false,
                            },
                        },
                        legend: {
                            show: false,
                        },
                        stroke: {
                            width: category === 'email' ? 2.5 : [0, 2.5],
                            curve: 'smooth',
                            lineCap: 'round',
                        },
                        states: {
                            hover: {
                                filter: {
                                    type: 'none',
                                },
                            },
                        },
                        tooltip: {
                            custom: function ({ series, dataPointIndex }) {
                                const renderCampaignData = () => `
                                        <div class="flex items-center gap-2">
                                            <div class="h-[10px] w-[10px] rounded-full" style="background-color: ${COLORS[9]}"></div>
                                            <div class="flex gap-2">Campaign: <span class="font-bold">${series[0][dataPointIndex]}</span></div>
                                        </div>
                                    `
                                const renderEmailData = () => `
                                        <div class="flex items-center gap-2">
                                            <div class="h-[10px] w-[10px] rounded-full" style="background-color: ${
                                                COLORS[0]
                                            }"></div>
                                            <div class="flex gap-2">Email: <span class="font-bold">${
                                                series[
                                                    category === 'all' ? 1 : 0
                                                ][dataPointIndex]
                                            }</span></div>
                                        </div>
                                    `
                                const render = () => {
                                    switch (category) {
                                        case 'all':
                                            return `${renderCampaignData()}${renderEmailData()}`
                                        case 'campagin':
                                            return renderCampaignData()
                                        case 'email':
                                            return renderEmailData()
                                        default:
                                            return ''
                                    }
                                }
                                return `
                                        <div class="py-2 px-4 rounded-xl">
                                            <div class="flex flex-col gap-2">
                                                <div>${
                                                    data.label[dataPointIndex]
                                                }</div>
                                                ${render()}
                                            </div>
                                        </div>
                                    `
                            },
                        },
                        labels: data.label,
                        yaxis:
                            category === 'all'
                                ? [
                                      {},
                                      {
                                          opposite: true,
                                      },
                                  ]
                                : [],
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '35px',
                                borderRadius: 4,
                                borderRadiusApplication: 'end',
                            },
                        },
                    }}
                    series={series}
                    height={450}
                />
            </div>
        </Card>
    )
}

export default AdsPerformance
