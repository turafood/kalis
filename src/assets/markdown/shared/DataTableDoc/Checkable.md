```jsx
import { useState, useEffect, useMemo } from 'react'
import Button from '@/components/ui/Button'
import DataTable from '@/components/shared/DataTable'
import { apiGetCustomers } from '@/services/CustomersService'

const Checkable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        order: '',
        key: '',
    })

    const handleAction = (cellProps) => {
        console.log('Action clicked', cellProps)
    }

    const handleBatchAction = () => {
        console.log('selectedRows', selectedRows)
    }

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <Button size="xs" onClick={() => handleAction(props)}>
                        Action
                    </Button>
                ),
            },
        ],
        [],
    )

    const handlePaginationChange = (pageIndex) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageIndex } }))
    }

    const handleSelectChange = (pageSize) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageSize } }))
    }

    const handleSort = ({ order, key }) => {
        setTableData((prevData) => ({
            ...prevData,
            ...{ sort: { order, key } },
        }))
    }

    const handleRowSelect = (checked, row) => {
        console.log('row', row)
        if (checked) {
            setSelectedRows((prevData) => {
                if (!prevData.includes(row.name)) {
                    return [...prevData, ...[row.name]]
                }
                return prevData
            })
        } else {
            setSelectedRows((prevData) => {
                if (prevData.includes(row.name)) {
                    return prevData.filter((id) => id !== row.name)
                }
                return prevData
            })
        }
    }

    const handleAllRowSelect = (checked, rows) => {
        console.log('rows', rows)
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            const selectedIds = []
            originalRows.forEach((row) => {
                selectedIds.push(row.name)
            })
            setSelectedRows(selectedIds)
        } else {
            setSelectedRows([])
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await apiGetCustomers(tableData)
            if (response.list) {
                setData(response.list)
                setLoading(false)
                setTableData((prevData) => ({
                    ...prevData,
                    ...{ total: response.total },
                }))
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        tableData.pageIndex,
        tableData.order,
        tableData.key,
        tableData.pageSize,
    ])

    return (
        <>
            {selectedRows.length > 0 && (
                <div className="flex justify-end mb-4">
                    <Button
                        size="sm"
                        variant="solid"
                        onClick={handleBatchAction}
                    >
                        Batch Action
                    </Button>
                </div>
            )}
            <DataTable
                selectable
                columns={columns}
                data={data}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
        </>
    )
}

export default Checkable
```
