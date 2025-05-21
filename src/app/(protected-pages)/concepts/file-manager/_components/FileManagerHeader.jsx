'use client'
import { Fragment } from 'react'
import Segment from '@/components/ui/Segment'
import UploadFile from './UploadFile'
import { useFileManagerStore } from '../_store/useFileManagerStore'
import { TbChevronRight, TbLayoutGrid, TbList } from 'react-icons/tb'

const FileManagerHeader = ({ onEntryClick, onDirectoryClick }) => {
    const { directories, layout, setLayout } = useFileManagerStore()

    const handleEntryClick = () => {
        onEntryClick()
    }

    const handleDirectoryClick = (id) => {
        onDirectoryClick(id)
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                {directories.length > 0 ? (
                    <div className="flex items-center gap-2">
                        <h3 className="flex items-center gap-2 text-base sm:text-2xl">
                            <span
                                className="hover:text-primary cursor-pointer"
                                role="button"
                                onClick={handleEntryClick}
                            >
                                File Manager
                            </span>
                            {directories.map((dir, index) => (
                                <Fragment key={dir.id}>
                                    <TbChevronRight className="text-lg" />
                                    {directories.length - 1 === index ? (
                                        <span>{dir.label}</span>
                                    ) : (
                                        <span
                                            className="hover:text-primary cursor-pointer"
                                            role="button"
                                            onClick={() =>
                                                handleDirectoryClick(dir.id)
                                            }
                                        >
                                            {dir.label}
                                        </span>
                                    )}
                                </Fragment>
                            ))}
                        </h3>
                    </div>
                ) : (
                    <h3>File Manager</h3>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Segment value={layout} onChange={(val) => setLayout(val)}>
                    <Segment.Item value="grid" className="text-xl px-3">
                        <TbLayoutGrid />
                    </Segment.Item>
                    <Segment.Item value="list" className="text-xl px-3">
                        <TbList />
                    </Segment.Item>
                </Segment>
                <UploadFile />
            </div>
        </div>
    )
}

export default FileManagerHeader
