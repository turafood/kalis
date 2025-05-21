'use client'
import { useRef } from 'react'
import Dropdown from '@/components/ui/Dropdown'
import Tooltip from '@/components/ui/Tooltip'
import Badge from '@/components/ui/Badge'
import ActionButton from './ActionButton'
import { useMailStore } from '../_store/mailStore'
import useMailAction from '../_hooks/useMailAction'
import { labelList } from '../constants'
import classNames from '@/utils/classNames'
import {
    TbDotsVertical,
    TbArrowBackUp,
    TbStarFilled,
    TbFlag,
    TbFolderSymlink,
    TbStar,
} from 'react-icons/tb'

const MailDetailAction = () => {
    const dropdownRef = useRef(null)

    const { mail, toggleMessageDialog } = useMailStore()

    const { onFlagToggle, onMoveMailClick, onStarToggle } = useMailAction()

    const handleMoveMailClick = (destination) => {
        onMoveMailClick(mail, destination)
        dropdownRef.current?.handleDropdownClose()
    }

    const handleReplyClick = () => {
        toggleMessageDialog({
            mode: 'reply',
            open: true,
        })
    }

    return (
        <div className="flex items-center gap-2">
            <Tooltip title="Reply">
                <ActionButton onClick={handleReplyClick}>
                    <TbArrowBackUp />
                </ActionButton>
            </Tooltip>
            <Dropdown
                ref={dropdownRef}
                placement="bottom-end"
                renderTitle={
                    <ActionButton>
                        <TbDotsVertical />
                    </ActionButton>
                }
            >
                <Dropdown.Item
                    eventKey="star"
                    onClick={() => onStarToggle(mail)}
                >
                    <span className="text-lg">
                        {mail.starred ? (
                            <TbStarFilled className="text-amber-500" />
                        ) : (
                            <TbStar />
                        )}
                    </span>
                    <span>Star</span>
                </Dropdown.Item>
                <Dropdown.Item
                    eventKey="flag"
                    onClick={() => onFlagToggle(mail)}
                >
                    <TbFlag
                        className={classNames(
                            'text-lg',
                            mail.flagged && 'text-red-500',
                        )}
                    />
                    <span>Flag</span>
                </Dropdown.Item>
                <Dropdown.Menu
                    renderTitle={
                        <>
                            <span className="flex items-center gap-2">
                                <TbFolderSymlink className="text-lg" />
                                <span>Move to</span>
                            </span>
                        </>
                    }
                    placement="left-start"
                >
                    {labelList.map((item) => (
                        <Dropdown.Item
                            key={item.value}
                            onClick={() => handleMoveMailClick(item.value)}
                        >
                            <Badge className={item.dotClass} />
                            <span>{item.label}</span>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default MailDetailAction
