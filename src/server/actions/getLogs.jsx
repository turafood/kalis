import { logData } from '@/mock/data/logData'

const getLogs = async (activityIndex = 1, filter) => {
    let loadable = true
    const maxGetItem = 3
    const count = (activityIndex - 1) * maxGetItem
    let logs = logData
    if (count >= logs.length) {
        loadable = false
    }
    logs = logs.slice(count, activityIndex * maxGetItem)

    if (filter) {
        logs = structuredClone(logs).map((log) => {
            log.events = log.events.filter((event) =>
                filter.includes(event.type),
            )
            return log
        })
    }

    const response = {
        data: logs,
        loadable,
    }

    return response
}

export default getLogs
