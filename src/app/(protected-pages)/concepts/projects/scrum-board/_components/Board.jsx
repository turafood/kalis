'use client'
import { lazy, Suspense } from 'react'
import Dialog from '@/components/ui/Dialog'
import Spinner from '@/components/ui/Spinner'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import reorderDragable from '@/utils/reorderDragable'
import BoardColumn from './BoardColumn'
import ScrumBoardHeader from './ScrumBoardHeader'
import { useScrumBoardStore } from '../_store/scrumBoardStore'
import sleep from '@/utils/sleep'
import reoderArray from '@/utils/reoderArray'
import { Droppable, DragDropContext } from '@hello-pangea/dnd'

const TicketContent = lazy(() => import('./TicketContent'))
const AddNewTicketContent = lazy(() => import('./AddNewTicketContent'))
const AddNewMemberContent = lazy(() => import('./AddNewMemberContent'))
const AddNewColumnContent = lazy(() => import('./AddNewColumnContent'))

const Board = (props) => {
    const {
        columns,
        ordered,
        boardMembers,
        updateOrdered,
        updateColumns,
        closeDialog,
        resetView,
        dialogView,
        dialogOpen,
    } = useScrumBoardStore()

    const {
        containerHeight,
        useClone,
        isCombineEnabled,
        withScrollableColumns,
    } = props

    const onDialogClose = async () => {
        closeDialog()
        await sleep(200)
        resetView()
    }

    const onDragEnd = (result) => {
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...ordered]
                shallow.splice(result.source.index, 1)
                updateOrdered(shallow)
                return
            }

            const column = columns[result.source.droppableId]
            const withQuoteRemoved = [...column]
            withQuoteRemoved.splice(result.source.index, 1)
            const newColumns = {
                ...columns,
                [result.source.droppableId]: withQuoteRemoved,
            }
            updateColumns(newColumns)
            return
        }

        if (!result.destination) {
            return
        }

        const source = result.source
        const destination = result.destination

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return
        }

        if (result.type === 'COLUMN') {
            const newOrdered = reoderArray(
                ordered,
                source.index,
                destination.index,
            )
            updateOrdered(newOrdered)
            return
        }

        const data = reorderDragable({
            quoteMap: columns,
            source,
            destination,
        })

        updateColumns(data.quoteMap)
    }

    return (
        <>
            <AdaptiveCard className="h-full" bodyClass="h-full flex flex-col">
                <ScrumBoardHeader boardMembers={boardMembers} />
                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                    <Droppable
                        droppableId="board"
                        type="COLUMN"
                        direction="horizontal"
                        ignoreContainerClipping={containerHeight}
                        isCombineEnabled={isCombineEnabled}
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                className="scrumboard flex flex-col flex-auto w-full mb-2"
                                {...provided.droppableProps}
                            >
                                <div className="scrumboard-body flex max-w-full overflow-x-auto h-full mt-4 gap-4">
                                    {ordered.map((key, index) => (
                                        <BoardColumn
                                            key={key}
                                            index={index}
                                            title={key}
                                            contents={columns[key]}
                                            isScrollable={withScrollableColumns}
                                            isCombineEnabled={isCombineEnabled}
                                            useClone={useClone}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </AdaptiveCard>
            <Dialog
                isOpen={dialogOpen}
                width={dialogView === 'TICKET' ? 700 : 520}
                closable={dialogView !== 'TICKET'}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <Suspense
                    fallback={
                        <div className="my-4 text-center">
                            <Spinner />
                        </div>
                    }
                >
                    {dialogView === 'TICKET' && (
                        <TicketContent onTicketClose={onDialogClose} />
                    )}
                    {dialogView === 'NEW_TICKET' && <AddNewTicketContent />}
                    {dialogView === 'NEW_COLUMN' && <AddNewColumnContent />}
                    {dialogView === 'ADD_MEMBER' && <AddNewMemberContent />}
                </Suspense>
            </Dialog>
        </>
    )
}

export default Board
