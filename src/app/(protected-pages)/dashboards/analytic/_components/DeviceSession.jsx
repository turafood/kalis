'use client'
import Card from '@/components/ui/Card'
import Loading from '@/components/shared/Loading'
import { COLORS } from '@/constants/chart.constant'
import { TbDeviceDesktop, TbDeviceMobile, TbDeviceTablet } from 'react-icons/tb'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/components/shared/Chart'), {
    ssr: false,
    loading: () => (
        <div className="h-[280px] flex items-center justify-center">
            <Loading loading />
        </div>
    ),
})

const DeviceSession = ({ data }) => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Session devices</h4>
            </div>
            <div className="mt-6">
                <Chart
                    height={280}
                    series={data.series}
                    customOptions={{
                        colors: [COLORS[0], COLORS[7], COLORS[8]],
                        labels: data.labels,
                        plotOptions: {
                            pie: {
                                donut: {
                                    labels: {
                                        show: true,
                                        total: {
                                            show: true,
                                            showAlways: true,
                                            label: '',
                                            formatter: function () {
                                                return ''
                                            },
                                        },
                                    },
                                    size: '75%',
                                },
                            },
                        },
                    }}
                    type="donut"
                />
            </div>
            <div className="mt-8 flex justify-center gap-12 mx-auto">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-3xl" style={{ color: COLORS[0] }}>
                        <TbDeviceDesktop />
                    </div>
                    <div className="text-center">
                        <span>Desktop</span>
                        <h5>{data.percentage[0]}%</h5>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-3xl" style={{ color: COLORS[7] }}>
                        <TbDeviceMobile />
                    </div>
                    <div className="text-center">
                        <span>Mobile</span>
                        <h5>{data.percentage[1]}%</h5>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-3xl" style={{ color: COLORS[8] }}>
                        <TbDeviceTablet />
                    </div>
                    <div className="text-center">
                        <span>Tablet</span>
                        <h5>{data.percentage[2]}%</h5>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default DeviceSession
