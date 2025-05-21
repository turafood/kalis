'use client'
import { useMemo } from 'react'
import Dropdown from '@/components/ui/Dropdown'
import Switcher from '@/components/ui/Switcher'
import {
    UPDATE_TICKET,
    ASSIGN_TICKET,
    ADD_TAGS_TO_TICKET,
    ADD_FILES_TO_TICKET,
    CREATE_TICKET,
} from '@/components/view/Activity/constants'
import { TbFilter, TbCheck } from 'react-icons/tb'

const filterItems = [
    { label: 'Ticket status', value: UPDATE_TICKET },
    { label: 'Assign ticket', value: ASSIGN_TICKET },
    { label: 'New ticket', value: CREATE_TICKET },
    { label: 'Add tags', value: ADD_TAGS_TO_TICKET },
    { label: 'Add files', value: ADD_FILES_TO_TICKET },
]

const LogAction = ({
    showMentionedOnly,
    selectedType = [],
    onFilterChange,
    onCheckboxChange,
}) => {
    const allUnchecked = useMemo(() => {
        return !selectedType.some((type) =>
            filterItems.map((item) => item.value).includes(type),
        )
    }, [selectedType])

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <span className="font-semibold">
                    {showMentionedOnly
                        ? 'Show all activity'
                        : 'Show mentioned only'}
                </span>
                <Switcher
                    checked={showMentionedOnly}
                    onChange={onCheckboxChange}
                />
            </div>
            <Dropdown
                placement="bottom-end"
                renderTitle={
                    <button
                        className="close-button p-2.5! button-press-feedback"
                        type="button"
                    >
                        <TbFilter />
                    </button>
                }
            >
                {filterItems.map((item) => (
                    <Dropdown.Item
                        key={item.value}
                        eventKey={item.value}
                        onClick={() => onFilterChange(item.value)}
                    >
                        {!allUnchecked && (
                            <div className="flex justify-center w-[20px]">
                                {selectedType.includes(item.value) && (
                                    <TbCheck className="text-primary text-lg" />
                                )}
                            </div>
                        )}
                        <span>{item.label}</span>
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    )
}

export default LogAction
