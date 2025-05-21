'use client'
import { useState, useRef, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import uniqueId from 'lodash/uniqueId'

const Field = (props) => {
    const { title, icon, children } = props

    return (
        <div className="flex items-center mb-2">
            <div className="flex items-center gap-2 font-semibold min-w-[150px]">
                <span className="text-lg">{icon}</span>
                <span>{title}</span>
            </div>
            {children}
        </div>
    )
}

const EditArticleHeader = (props) => {
    const { title, authors, updateTime, tags } = props

    const [articleTitle, setArticleTitle] = useState(title)
    const [articleTags, setArticleTags] = useState(tags)

    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [articleTags])

    return (
        <div>
            <input
                className="ring-0 outline-hidden block w-full p-2 bg-transparent heading-text h3"
                placeholder="Untitle article"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
            />
            <div className="mt-3 flex flex-col gap-6 border-t border-gray-200 dark:border-gray-700 py-6">
                <Field title="Created by:">
                    {authors.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Avatar size={25} src={authors[0].img} />
                            <span className="heading-text font-bold">
                                {authors[0].name}
                            </span>
                        </div>
                    )}
                </Field>
                <Field title="Last updated:">
                    <span className="heading-text font-bold">{updateTime}</span>
                </Field>
                <Field title="Tags:">
                    <div className="flex flex-wrap items-center gap-2">
                        {articleTags.map((tag) => (
                            <Tag key={tag.id}>{tag.label}</Tag>
                        ))}
                        <input
                            ref={inputRef}
                            className="ring-0 outline-hidden block py-2 bg-transparent heading-text text-sm"
                            type="text"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    const eventTarget = event.target
                                    setArticleTags((tag) => {
                                        const newTags = structuredClone(tag)

                                        newTags.push({
                                            id: uniqueId('article-tag-'),
                                            label: eventTarget.value,
                                        })
                                        return newTags
                                    })
                                    inputRef.current?.blur()
                                }

                                if (
                                    event.key === 'Backspace' &&
                                    event.target.value.length === 0
                                ) {
                                    setArticleTags((tag) => {
                                        const newTags = structuredClone(tag)
                                        newTags.pop()
                                        return newTags
                                    })
                                }
                            }}
                        />
                    </div>
                </Field>
            </div>
        </div>
    )
}

export default EditArticleHeader
