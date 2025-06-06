import reoderArray from './reoderArray'

export const reorderDragable = ({ quoteMap, source, destination }) => {
    const current = [...quoteMap[source.droppableId]]
    const next = [...quoteMap[destination.droppableId]]
    const target = current[source.index]

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reoderArray(current, source.index, destination.index)
        const result = {
            ...quoteMap,
            [source.droppableId]: reordered,
        }
        return {
            quoteMap: result,
        }
    }
    current.splice(source.index, 1)
    next.splice(destination.index, 0, target)
    const result = {
        ...quoteMap,
        [source.droppableId]: current,
        [destination.droppableId]: next,
    }

    return {
        quoteMap: result,
    }
}

export default reorderDragable
