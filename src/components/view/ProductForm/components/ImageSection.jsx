'use client'
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Upload from '@/components/ui/Upload'
import { FormItem } from '@/components/ui/Form'
import Dialog from '@/components/ui/Dialog'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Controller } from 'react-hook-form'
import { HiEye, HiTrash } from 'react-icons/hi'
import cloneDeep from 'lodash/cloneDeep'
import { PiImagesThin } from 'react-icons/pi'

const ImageList = (props) => {
    const { imgList, onImageDelete } = props

    const [selectedImg, setSelectedImg] = useState({})
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const onViewOpen = (img) => {
        setSelectedImg(img)
        setViewOpen(true)
    }

    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => {
            setSelectedImg({})
        }, 300)
    }

    const onDeleteConfirmation = (img) => {
        setSelectedImg(img)
        setDeleteConfirmationOpen(true)
    }

    const onDeleteConfirmationClose = () => {
        setSelectedImg({})
        setDeleteConfirmationOpen(false)
    }

    const onDelete = () => {
        onImageDelete?.(selectedImg)
        setDeleteConfirmationOpen(false)
    }

    return (
        <>
            {imgList.map((img) => (
                <div
                    key={img.id}
                    className="group relative rounded-xl border border-gray-200 dark:border-gray-600 p-2 flex"
                >
                    <img
                        className="rounded-lg max-h-[140px] mx-auto max-w-full dark:bg-transparent"
                        src={img.img}
                        alt={img.name}
                    />
                    <div className="absolute inset-2 bg-[#000000ba] group-hover:flex hidden text-xl items-center justify-center">
                        <span
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                            onClick={() => onViewOpen(img)}
                        >
                            <HiEye />
                        </span>
                        <span
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                            onClick={() => onDeleteConfirmation(img)}
                        >
                            <HiTrash />
                        </span>
                    </div>
                </div>
            ))}
            <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">{selectedImg.name}</h5>
                <img
                    className="w-full"
                    src={selectedImg.img}
                    alt={selectedImg.name}
                />
            </Dialog>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove image"
                onClose={onDeleteConfirmationClose}
                onRequestClose={onDeleteConfirmationClose}
                onCancel={onDeleteConfirmationClose}
                onConfirm={onDelete}
            >
                <p> Are you sure you want to remove this image? </p>
            </ConfirmDialog>
        </>
    )
}

const ImageSection = ({ control, errors }) => {
    const beforeUpload = (file) => {
        let valid = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 500000

        if (file) {
            Array.from(file).forEach((f) => {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot more then 500kb!'
                }
            })
        }

        return valid
    }

    const handleUpload = (onChange, originalImageList = [], files) => {
        let imageId = '1-img-0'
        const latestUpload = files.length - 1
        if (originalImageList.length > 0) {
            const prevImgId = originalImageList[originalImageList.length - 1].id
            const splitImgId = prevImgId.split('-')
            const newIdNumber = parseInt(splitImgId[splitImgId.length - 1]) + 1
            splitImgId.pop()
            const newIdArr = [...splitImgId, ...[newIdNumber]]
            imageId = newIdArr.join('-')
        }
        const image = {
            id: imageId,
            name: files[latestUpload].name,
            img: URL.createObjectURL(files[latestUpload]),
        }
        const imageList = [...originalImageList, ...[image]]
        onChange(imageList)
    }

    const handleImageDelete = (
        onChange,
        originalImageList = [],
        deletedImg,
    ) => {
        let imgList = cloneDeep(originalImageList)
        imgList = imgList.filter((img) => img.id !== deletedImg.id)
        onChange(imgList)
    }

    return (
        <Card>
            <h4 className="mb-2">Product Image</h4>
            <p>
                Choose a product photo or simply drag and drop up to 5 photos
                here.
            </p>
            <div className="mt-4">
                <FormItem
                    invalid={Boolean(errors.imgList)}
                    errorMessage={errors.imgList?.message}
                    className="mb-4"
                >
                    <Controller
                        name="imgList"
                        control={control}
                        render={({ field }) => (
                            <>
                                {field.value && field.value.length ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                                        <ImageList
                                            imgList={field.value}
                                            onImageDelete={(img) =>
                                                handleImageDelete(
                                                    field.onChange,
                                                    field.value,
                                                    img,
                                                )
                                            }
                                        />
                                        <Upload
                                            draggable
                                            className="min-h-fit"
                                            beforeUpload={beforeUpload}
                                            showList={false}
                                            onChange={(files) =>
                                                handleUpload(
                                                    field.onChange,
                                                    field.value,
                                                    files,
                                                )
                                            }
                                        >
                                            <div className="max-w-full flex flex-col px-4 py-2 justify-center items-center min-h-[130px]">
                                                <div className="text-[50px]">
                                                    <PiImagesThin />
                                                </div>
                                                <p className="text-center mt-1 text-xs">
                                                    <span className="text-gray-800 dark:text-white">
                                                        Drop your image here, or{' '}
                                                        {''}
                                                    </span>
                                                    <span className="text-primary">
                                                        Click to browse
                                                    </span>
                                                </p>
                                            </div>
                                        </Upload>
                                    </div>
                                ) : (
                                    <Upload
                                        draggable
                                        beforeUpload={beforeUpload}
                                        showList={false}
                                        onChange={(files) =>
                                            handleUpload(
                                                field.onChange,
                                                field.value,
                                                files,
                                            )
                                        }
                                    >
                                        <div className="max-w-full flex flex-col px-4 py-8 justify-center items-center">
                                            <div className="text-[60px]">
                                                <PiImagesThin />
                                            </div>
                                            <p className="flex flex-col items-center mt-2">
                                                <span className="text-gray-800 dark:text-white">
                                                    Drop your image here, or{' '}
                                                    {''}
                                                </span>
                                                <span className="text-primary">
                                                    Click to browse
                                                </span>
                                            </p>
                                        </div>
                                    </Upload>
                                )}
                            </>
                        )}
                    />
                </FormItem>
            </div>
            <p>
                Image formats: .jpg, .jpeg, .png, preferred size: 1:1, file size
                is restricted to a maximum of 500kb.
            </p>
        </Card>
    )
}

export default ImageSection
