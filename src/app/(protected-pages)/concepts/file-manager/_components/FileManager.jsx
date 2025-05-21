'use client'
import { useEffect } from 'react'
import Table from '@/components/ui/Table'
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton'
import FileManagerHeader from './FileManagerHeader'
import FileSegment from './FileSegment'
import FileList from './FileList'
import FileDetails from './FileDetails'
import FileManagerDeleteDialog from './FileManagerDeleteDialog'
import FileManagerInviteDialog from './FileManagerInviteDialog'
import FileManagerRenameDialog from './FileManagerRenameDialog'
import { useFileManagerStore } from '../_store/useFileManagerStore'
import { apiGetFiles } from '@/services/FileService'
import useSWRMutation from 'swr/mutation'

const { THead, Th, Tr } = Table

async function getFile(_, { arg }) {
    const data = await apiGetFiles({
        id: arg,
    })
    return data
}

const FileManager = () => {
    const {
        layout,
        fileList,
        setFileList,
        setDeleteDialog,
        setInviteDialog,
        setRenameDialog,
        openedDirectoryId,
        setOpenedDirectoryId,
        setDirectories,
        setSelectedFile,
    } = useFileManagerStore()

    const { trigger, isMutating } = useSWRMutation(
        `/api/files/${openedDirectoryId}`,
        getFile,
        {
            onSuccess: (resp) => {
                setDirectories(resp.directory)
                setFileList(resp.list)
            },
        },
    )

    useEffect(() => {
        if (fileList.length === 0) {
            trigger(openedDirectoryId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleShare = (id) => {
        setInviteDialog({ id, open: true })
    }

    const handleDelete = (id) => {
        setDeleteDialog({ id, open: true })
    }

    const handleDownload = () => {
        const blob = new Blob(
            [
                'This text file is created to demonstrate how file downloading works in our template demo.',
            ],
            { type: 'text/plain;charset=utf-8' },
        )

        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'sample-dowoad-file'
        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
        window.URL.revokeObjectURL(link.href)
    }

    const handleRename = (id) => {
        setRenameDialog({ id, open: true })
    }

    const handleOpen = (id) => {
        setOpenedDirectoryId(id)
        trigger(id)
    }

    const handleEntryClick = () => {
        setOpenedDirectoryId('')
        trigger('')
    }

    const handleDirectoryClick = (id) => {
        setOpenedDirectoryId(id)
        trigger(id)
    }

    const handleClick = (fileId) => {
        setSelectedFile(fileId)
    }

    return (
        <>
            <div>
                <FileManagerHeader
                    onEntryClick={handleEntryClick}
                    onDirectoryClick={handleDirectoryClick}
                />
                <div className="mt-6">
                    {isMutating ? (
                        layout === 'grid' ? (
                            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-4 gap-4 lg:gap-6">
                                {Array.from(Array(4).keys()).map((item) => (
                                    <FileSegment
                                        key={item}
                                        loading={isMutating}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Table>
                                <THead>
                                    <Tr>
                                        <Th>File</Th>
                                        <Th>Size</Th>
                                        <Th>Type</Th>
                                        <Th></Th>
                                    </Tr>
                                </THead>
                                <TableRowSkeleton
                                    avatarInColumns={[0]}
                                    columns={4}
                                    rows={5}
                                    avatarProps={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            </Table>
                        )
                    ) : (
                        <FileList
                            fileList={fileList}
                            layout={layout}
                            onDownload={handleDownload}
                            onShare={handleShare}
                            onDelete={handleDelete}
                            onRename={handleRename}
                            onOpen={handleOpen}
                            onClick={handleClick}
                        />
                    )}
                </div>
            </div>
            <FileDetails onShare={handleShare} />
            <FileManagerDeleteDialog />
            <FileManagerInviteDialog />
            <FileManagerRenameDialog />
        </>
    )
}

export default FileManager
