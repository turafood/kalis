'use client'
import { useEffect, useRef } from 'react'
import Card from '@/components/ui/Card'
import CardFooter from './CardFooter'
import ReactHtmlParser from 'html-react-parser'

const DemoCard = (props) => {
    const { demoComponent, id, title, desc = '', hideFooter, ...rest } = props

    const lastHash = useRef('')

    useEffect(() => {
        if (location.hash) {
            lastHash.current = location.hash.slice(1)
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            setTimeout(() => {
                document
                    .getElementById(lastHash.current)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                lastHash.current = ''
            }, 100)
        }
    }, [])

    return (
        <div className="demo-card py-5" id={id}>
            <div className="mb-6">
                <h4>{title}</h4>
                {desc && (
                    <div className="mt-1 demo-card-description">
                        {ReactHtmlParser(desc)}
                    </div>
                )}
            </div>
            <Card
                bordered
                footer={{
                    content: !hideFooter && <CardFooter {...rest} />,
                    className:
                        'bg-gray-50 dark:bg-gray-700 pb-2 pt-2 rounded-b-2xl',
                }}
            >
                {demoComponent}
            </Card>
        </div>
    )
}

export default DemoCard
