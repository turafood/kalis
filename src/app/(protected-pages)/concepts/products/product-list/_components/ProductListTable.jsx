'use client'
import { useMemo, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Progress from '@/components/ui/Progress'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useProductListStore } from '../_store/productListStore'
import classNames from '@/utils/classNames'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useRouter } from 'next/navigation'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { FiPackage } from 'react-icons/fi'
import { NumericFormat } from 'react-number-format'

const ProductColumn = ({ row }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar
                shape="round"
                size={60}
                {...(row.img ? { src: row.img } : { icon: <FiPackage /> })}
            />
            <div>
                <div className="font-bold heading-text mb-1">{row.name}</div>
                <span>ID: {row.productCode}</span>
            </div>
        </div>
    )
}

const ActionColumn = ({ onEdit, onDelete }) => {
    return (
        <div className="flex items-center justify-end gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="Delete">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onDelete}
                >
                    <TbTrash />
                </div>
            </Tooltip>
        </div>
    )
}

const ProductListTable = ({
    productListTotal,
    pageIndex = 1,
    pageSize = 10,
}) => {
    const router = useRouter()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [toDeleteId, setToDeleteId] = useState('')

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleDelete = (product) => {
        setDeleteConfirmationOpen(true)
        setToDeleteId(product.id)
    }

    const productList = useProductListStore((state) => state.productList)
    const selectedProduct = useProductListStore(
        (state) => state.selectedProduct,
    )
    const setSelectAllProduct = useProductListStore(
        (state) => state.setSelectAllProduct,
    )
    const setProductList = useProductListStore((state) => state.setProductList)
    const setSelectedProduct = useProductListStore(
        (state) => state.setSelectedProduct,
    )
    const initialLoading = useProductListStore((state) => state.initialLoading)

    const { onAppendQueryParams } = useAppendQueryParams()

    const handleEdit = (product) => {
        router.push(`/concepts/products/product-edit/${product.id}`)
    }

    const handleConfirmDelete = () => {
        const newProductList = productList.filter((product) => {
            return !(toDeleteId === product.id)
        })
        setSelectAllProduct([])
        setProductList(newProductList)
        setDeleteConfirmationOpen(false)
        setToDeleteId('')
    }

    const columns = useMemo(
        () => [
            {
                header: 'Product',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: (props) => {
                    const { price } = props.row.original
                    return (
                        <span className="font-bold heading-text">
                            <NumericFormat
                                fixedDecimalScale
                                prefix="$"
                                displayType="text"
                                value={price}
                                decimalScale={2}
                                thousandSeparator={true}
                            />
                        </span>
                    )
                },
            },
            {
                header: 'Quantity',
                accessorKey: 'stock',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-bold heading-text">
                            {row.stock}
                        </span>
                    )
                },
            },
            {
                header: 'Sales',
                accessorKey: 'status',
                cell: (props) => {
                    const { salesPercentage, sales } = props.row.original
                    return (
                        <div className="flex flex-col gap-1">
                            <span className="flex gap-1">
                                <span className="font-semibold">
                                    <NumericFormat
                                        displayType="text"
                                        value={sales}
                                        thousandSeparator={true}
                                    />
                                </span>
                                <span>Sales</span>
                            </span>
                            <Progress
                                percent={salesPercentage}
                                showInfo={false}
                                customColorClass={classNames(
                                    'bg-error',
                                    salesPercentage > 40 && 'bg-warning',
                                    salesPercentage > 70 && 'bg-success',
                                )}
                            />
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onDelete={() => handleDelete(props.row.original)}
                    />
                ),
            },
        ], // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handlePaginationChange = (page) => {
        onAppendQueryParams({
            pageIndex: String(page),
        })
    }

    const handleSelectChange = (value) => {
        onAppendQueryParams({
            pageSize: String(value),
            pageIndex: '1',
        })
    }

    const handleSort = (sort) => {
        onAppendQueryParams({
            order: sort.order,
            sortKey: sort.key,
        })
    }

    const handleRowSelect = (checked, row) => {
        setSelectedProduct(checked, row)
    }

    const handleAllRowSelect = (checked, rows) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllProduct(originalRows)
        } else {
            setSelectAllProduct([])
        }
    }

    return (
        <>
            <DataTable
                selectable
                columns={columns}
                data={productList}
                noData={productList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={initialLoading}
                pagingData={{
                    total: productListTotal,
                    pageIndex,
                    pageSize,
                }}
                checkboxChecked={(row) =>
                    selectedProduct.some((selected) => selected.id === row.id)
                }
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove products"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    Are you sure you want to remove this product? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default ProductListTable
