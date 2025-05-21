'use client'
import Article from './Article'
import { useHelpCenterStore } from '../_store/helpCenterStore'
import { categoryIcon } from '../utils'
import isLastChild from '@/utils/isLastChild'

const Categories = ({ data }) => {
    const setSelectedTopic = useHelpCenterStore(
        (state) => state.setSelectedTopic,
    )
    const setQueryText = useHelpCenterStore((state) => state.setQueryText)

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic)
        setQueryText('')
    }

    return (
        <div className="flex flex-col gap-16">
            {data.categories.map((category) => (
                <div key={category.name}>
                    <h3 className="mb-6">{category.name}</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {category.topics.map((topic) => (
                            <div
                                key={topic.id}
                                className="cursor-pointer rounded-xl bg-gray-100 dark:bg-gray-700 p-8 group hover:bg-primary transition-colors"
                                role="button"
                                onClick={() => handleTopicClick(topic.id)}
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="rounded-full p-4 bg-neutral group-hover:bg-white/25 transition-colors">
                                        <span className="text-2xl text-primary group-hover:text-neutral transition-colors">
                                            {categoryIcon[topic.id]}
                                        </span>
                                    </div>
                                    <h4 className="font-bold mt-3 group-hover:text-neutral transition-colors">
                                        {topic.name}
                                    </h4>
                                    <p className="text-center max-w-[250px] min-h-[50px] group-hover:text-neutral transition-colors">
                                        {topic.description}
                                    </p>
                                    <div className="font-bold text-primary group-hover:text-neutral transition-colors">
                                        {topic.articleCounts} Articles
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div>
                <h3 className="mb-6">Popular Articles</h3>
                <div>
                    {data.popularArticles.map((article, index) => (
                        <Article
                            key={article.id}
                            id={article.id}
                            category={article.category}
                            title={article.title}
                            timeToRead={article.timeToRead}
                            viewCount={article.viewCount}
                            commentCount={article.commentCount}
                            isLastChild={
                                !isLastChild(data.popularArticles, index)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories
