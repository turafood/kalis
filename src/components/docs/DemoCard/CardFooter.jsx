import { useState, useCallback, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import Spinner from '@/components/ui/Spinner'
import Segment from '@/components/ui/Segment'
import { CgCodeSlash, CgCode, CgCopy } from 'react-icons/cg'
import { HiCheck } from 'react-icons/hi'
import CodeBox from './CodeBox'
import axios from 'axios'

const CardFooter = (props) => {
    const { mdPath, mdName, mdPrefixPath = 'ui-components' } = props

    const [expand, setExpand] = useState(false)
    const [tsMarkdown, setTsMarkdown] = useState(null)
    const [jsMarkdown, setJsMarkdown] = useState(null)
    const [copied, setCopied] = useState(false)
    const [loadingMd, setLoadingMd] = useState(false)
    const [mdType, setMdType] = useState('ts')

    const onExpand = useCallback(() => {
        setExpand(!expand)
    }, [expand])

    const fetchMd = async () => {
        setLoadingMd(true)

        try {
            const resp = await axios.get('/api/md', {
                params: {
                    mdPath,
                    mdName,
                    mdPrefixPath,
                    mdType,
                },
            })

            const md = resp.data.content
            if (mdType === 'js') {
                setJsMarkdown(md)
            }
            if (mdType === 'ts') {
                setTsMarkdown(md)
            }
            setLoadingMd(false)
        } catch (error) {
            console.log(error)
            setLoadingMd(false)
        }
    }

    useEffect(() => {
        const markdown = mdType === 'ts' ? tsMarkdown : jsMarkdown

        if (expand && !markdown) {
            fetchMd()
        }
        if (copied && markdown) {
            navigator.clipboard.writeText(markdown.replace(/```jsx|```/g, ''))
            if (copied) {
                const copyFeedbackInterval = setTimeout(
                    () => setCopied(false),
                    3000,
                )

                return () => {
                    clearTimeout(copyFeedbackInterval)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mdPath, expand, copied, mdType])

    const onCodeCopy = async () => {
        if (!tsMarkdown || !jsMarkdown) {
            await fetchMd()
        }
        setCopied(true)
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {expand && (
                        <Segment
                            size={'xs'}
                            value={mdType}
                            className="bg-[#ebebeb] dark:bg-gray-950 gap-1 rounded-lg"
                            onChange={(value) => setMdType(value)}
                        >
                            <Segment.Item className="rounded-lg" value="ts">
                                TS
                            </Segment.Item>
                            <Segment.Item className="rounded-lg" value="js">
                                JS
                            </Segment.Item>
                        </Segment>
                    )}
                    {loadingMd && <Spinner />}
                </div>
                <div className="flex items-center">
                    <Tooltip
                        title={copied ? 'Copied' : 'Copy Code'}
                        wrapperClass="mr-1"
                    >
                        <Button
                            variant="plain"
                            shape="circle"
                            size="xs"
                            icon={
                                copied ? (
                                    <HiCheck className="text-emerald-500" />
                                ) : (
                                    <CgCopy />
                                )
                            }
                            onClick={onCodeCopy}
                        />
                    </Tooltip>
                    <Tooltip title={expand ? 'Hide Code' : 'Show Code'}>
                        <Button
                            variant="plain"
                            shape="circle"
                            size="xs"
                            icon={expand ? <CgCode /> : <CgCodeSlash />}
                            onClick={() => onExpand()}
                        />
                    </Tooltip>
                </div>
            </div>
            <div className={expand ? 'block' : 'hidden'}>
                {mdType === 'ts' && (
                    <CodeBox markdown={tsMarkdown} className="text-base" />
                )}
                {mdType === 'js' && (
                    <CodeBox
                        markdown={jsMarkdown || tsMarkdown}
                        className="text-base"
                    />
                )}
            </div>
        </div>
    )
}

export default CardFooter
