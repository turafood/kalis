'use client'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import dynamic from 'next/dynamic'

const { Tr, Td, TBody, THead, Th } = Table

const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), {
    ssr: false,
})

const TopPerformingPages = ({ data }) => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Top pages</h4>
                <CSVLink
                    filename="top-page.csv"
                    data={data.map((row) => {
                        return {
                            pageUrl: row.pageUrl,
                            views: row.views.amount,
                            'View growth': `${row.views.growth}%`,
                            'Unique visitors': row.uniqueVisitor.amount,
                            'Unique visitors growth': `${row.uniqueVisitor.growth}%`,
                        }
                    })}
                >
                    <Button size="sm">Export data</Button>
                </CSVLink>
            </div>
            <div className="mt-6">
                <Table hoverable={false}>
                    <THead>
                        <Tr>
                            <Th className="px-0!">Page url</Th>
                            <Th className="text-right! max-w-[100px]">Views</Th>
                            <Th className="px-0! text-right! max-w-[100px]">
                                Unique visitors
                            </Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {data.map((row) => {
                            return (
                                <Tr key={row.pageUrl}>
                                    <Td className="px-0!">
                                        <div className="heading-text font-bold">
                                            {row.pageUrl}
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="flex items-center justify-end gap-2">
                                            <span>{row.views.amount}</span>
                                            <GrowShrinkValue
                                                className="font-bold"
                                                value={row.views.growth}
                                                suffix="%"
                                                positiveIcon="+"
                                                negativeIcon=""
                                            />
                                        </div>
                                    </Td>
                                    <Td className="px-0!">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* <ApexChart 
                                                options={{...apexSparklineChartDefaultOption, ...{colors: row.growth > 0 ? [COLORS[1]] : [COLORS[2]]}}} 
                                                series={[{
                                                    data: row.activity
                                                }]} 
                                                height={25} 
                                                width={50}
                                            /> */}
                                            <span>
                                                {row.uniqueVisitor.amount}
                                            </span>
                                            <GrowShrinkValue
                                                className="font-bold"
                                                value={row.uniqueVisitor.growth}
                                                suffix="%"
                                                positiveIcon="+"
                                                negativeIcon=""
                                            />
                                        </div>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </TBody>
                </Table>
            </div>
        </Card>
    )
}

export default TopPerformingPages
