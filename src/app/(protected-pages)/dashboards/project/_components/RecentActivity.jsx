'use client'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ScrollBar from '@/components/ui/ScrollBar'
import Timeline from '@/components/ui/Timeline'
import { ActivityAvatar, ActivityEvent } from '@/components/view/Activity'
import isEmpty from 'lodash/isEmpty'

const RecentActivity = ({ data }) => {
    return (
        <Card>
            <div className="flex sm:flex-row flex-col md:items-center justify-between mb-6 gap-4">
                <h4>Recent activity</h4>
                <Button size="sm">View all</Button>
            </div>
            <div className="mt-4 lg:*:min-h-[390px]">
                <ScrollBar className="max-h-[390px]">
                    <Timeline>
                        {isEmpty(data) ? (
                            <Timeline.Item>No Activities</Timeline.Item>
                        ) : (
                            data.map((event, index) => (
                                <Timeline.Item
                                    key={event.type + index}
                                    media={<ActivityAvatar data={event} />}
                                >
                                    <div className="mt-1">
                                        <ActivityEvent compact data={event} />
                                    </div>
                                </Timeline.Item>
                            ))
                        )}
                    </Timeline>
                </ScrollBar>
            </div>
        </Card>
    )
}

export default RecentActivity
