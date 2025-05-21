'use client'
import { useMemo } from 'react'
import Table from '@/components/ui/Table'
import FileSegment from './FileSegment'
import FileRow from './FileRow'

const { TBody, THead, Th, Tr } = Table

const FileList = (props) => {
    const {
        layout,
        fileList,
        onDelete,
        onDownload,
        onShare,
        onRename,
        onOpen,
        onClick,
    } = props

    const folders = useMemo(() => {
        return fileList.filter((file) => file.fileType === 'directory')
    }, [fileList])

    const files = useMemo(() => {
        return fileList.filter((file) => file.fileType !== 'directory')
    }, [fileList])

    const renderFileSegment = (list, isFolder) => (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-4 gap-4 lg:gap-6">
            {list.map((file) => (
                <FileSegment
                    key={file.id}
                    fileType={file.fileType}
                    size={file.size}
                    name={file.name}
                    onClick={() => onClick(file.id)}
                    onDownload={onDownload}
                    onShare={() => onShare(file.id)}
                    onDelete={() => onDelete(file.id)}
                    onRename={() => onRename(file.id)}
                    {...(isFolder ? { onOpen: () => onOpen(file.id) } : {})}
                />
            ))}
        </div>
    )

    const renderFileRow = (list, isFolder) => (
        <Table className="mt-4">
            <THead>
                <Tr>
                    <Th>File</Th>
                    <Th>Size</Th>
                    <Th>Type</Th>
                    <Th></Th>
                </Tr>
            </THead>
            <TBody>
                {list.map((file) => (
                    <FileRow
                        key={file.id}
                        fileType={file.fileType}
                        size={file.size}
                        name={file.name}
                        onClick={() => onClick(file.id)}
                        onDownload={onDownload}
                        onShare={() => onShare(file.id)}
                        onDelete={() => onDelete(file.id)}
                        onRename={() => onRename(file.id)}
                        {...(isFolder ? { onOpen: () => onOpen(file.id) } : {})}
                    />
                ))}
            </TBody>
        </Table>
    )

    return (
        <div>
            {folders.length > 0 && (
                <div>
                    <h4>Folders</h4>
                    {layout === 'grid' && renderFileSegment(folders, true)}
                    {layout === 'list' && renderFileRow(folders, true)}
                </div>
            )}
            {files.length > 0 && (
                <div className="mt-8">
                    <h4>Files</h4>
                    {layout === 'grid' && renderFileSegment(files)}
                    {layout === 'list' && renderFileRow(files)}
                </div>
            )}
        </div>
    )
}

export default FileList
