'use client'
import useSWR from 'swr'
import { apiGetFiles } from '@/services/FileService'
import Table from '@/components/ui/Table'
import Avatar from '@/components/ui/Avatar'
import Loading from '@/components/shared/Loading'
import fileSizeUnit from '@/utils/fileSizeUnit'
import FileIcon from '@/components/view/FileIcon'
import dayjs from 'dayjs'

const { TBody, THead, Th, Tr, Td } = Table

const FileSegment = ({ fileType, size, name }) => {
    return (
        <div
            className="bg-white rounded-2xl dark:bg-gray-800 border border-gray-200 dark:border-transparent p-2.5 lg:p-3.5 flex items-center gap-2 transition-all hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] cursor-pointer"
            role="button"
        >
            <div className="text-3xl">
                <FileIcon type={fileType} size={35} />
            </div>
            <div>
                <div className="font-bold heading-text">{name}</div>
                <span className="text-xs">{fileSizeUnit(size)}</span>
            </div>
        </div>
    )
}

const ProjectDetailsAttachments = () => {
    const { data, isLoading } = useSWR(['/api/fles'], () => apiGetFiles({}), {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    })

    return (
        <Loading loading={isLoading}>
            <div>
                <h4>Recently added</h4>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-4 gap-4 lg:gap-6">
                    {data &&
                        data.list
                            .filter((file) => file.recent)
                            .map((file) => (
                                <FileSegment
                                    key={file.id}
                                    fileType={file.fileType}
                                    size={file.size}
                                    name={file.name}
                                />
                            ))}
                </div>
            </div>
            <div className="mt-10">
                <h4>Others files</h4>
                <Table className="mt-6">
                    <THead>
                        <Tr>
                            <Th>File</Th>
                            <Th>Size</Th>
                            <Th>Upload date</Th>
                            <Th>Last modified</Th>
                            <Th>Uploaded by</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {data &&
                            data.list
                                .filter((file) => !file.recent)
                                .map((file) => (
                                    <Tr
                                        key={file.id}
                                        className="cursor-pointer"
                                    >
                                        <Td>
                                            <div className="flex items-center gap-2">
                                                <div className="text-2xl">
                                                    <FileIcon
                                                        type={file.fileType}
                                                        size={35}
                                                    />
                                                </div>
                                                <div className="font-bold heading-text">
                                                    {file.name}
                                                </div>
                                            </div>
                                        </Td>
                                        <Td className="font-semibold text-nowrap">
                                            {fileSizeUnit(file.size)}
                                        </Td>
                                        <Td className="font-semibold text-nowrap">
                                            {dayjs
                                                .unix(file.uploadDate)
                                                .format('DD MMM YYYY')}
                                        </Td>
                                        <Td className="font-semibold">
                                            {dayjs
                                                .unix(
                                                    file.activities[0]
                                                        .timestamp,
                                                )
                                                .format('DD MMM YYYY')}
                                        </Td>
                                        <Td>
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    size={28}
                                                    src={file.author.img}
                                                />
                                                <span className="heading-text font-bold">
                                                    {file.author.name}
                                                </span>
                                            </div>
                                        </Td>
                                    </Tr>
                                ))}
                    </TBody>
                </Table>
            </div>
        </Loading>
    )
}

export default ProjectDetailsAttachments
