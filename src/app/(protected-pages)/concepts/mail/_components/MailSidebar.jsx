'use client'

import Menu from '@/components/ui/Menu'
import Badge from '@/components/ui/Badge'
import ScrollBar from '@/components/ui/ScrollBar'
import Drawer from '@/components/ui/Drawer'
import { useMailStore } from '../_store/mailStore'
import { groupList, labelList } from '../constants'
import classNames from '@/utils/classNames'
import { useRouter, useSearchParams } from 'next/navigation'

const { MenuItem, MenuGroup } = Menu

const MailSideBarContent = ({ title }) => {
    const router = useRouter()

    const { selectedCategory, setMail, setMailListFetched } = useMailStore()

    const query = useSearchParams()

    const currentPath = query.get('category') || query.get('label') || 'inbox'

    const onMenuClick = ({ category, label }) => {
        setMail({})
        setMailListFetched(false)

        const params = {}

        if (category) {
            params.category = category
        }

        if (label) {
            params.label = label
        }

        router.push(`/concepts/mail?${new URLSearchParams(params).toString()}`)
    }
    return (
        <div className="flex flex-col justify-between h-full">
            <ScrollBar className="h-full overflow-y-auto">
                {title && (
                    <div className="mb-6 mx-2">
                        <h3>{title}</h3>
                    </div>
                )}
                <Menu className="mx-2 mb-10">
                    {groupList.map((menu) => (
                        <MenuItem
                            key={menu.value}
                            eventKey={menu.value}
                            className={`mb-2 ${
                                selectedCategory.value === menu.value
                                    ? 'bg-gray-100 dark:bg-gray-700'
                                    : ''
                            }`}
                            isActive={currentPath === menu.value}
                            onSelect={() =>
                                onMenuClick({ category: menu.value, label: '' })
                            }
                        >
                            <span className="text-2xl ltr:mr-2 rtl:ml-2">
                                {menu.icon}
                            </span>
                            <span>{menu.label}</span>
                        </MenuItem>
                    ))}
                </Menu>
                <Menu className="mx-2 mb-6">
                    <MenuGroup label="Labels">
                        {labelList.map((label) => (
                            <MenuItem
                                key={label.value}
                                eventKey={label.value}
                                className={`mb-2 ${
                                    selectedCategory.value === label.value
                                        ? 'bg-gray-100 dark:bg-gray-700'
                                        : ''
                                }`}
                                isActive={currentPath === label.value}
                                onSelect={() =>
                                    onMenuClick({
                                        category: '',
                                        label: label.value,
                                    })
                                }
                            >
                                <Badge
                                    className="ltr:mr-2 rtl:ml-2"
                                    innerClass={label.dotClass}
                                />
                                <span>{label.label}</span>
                            </MenuItem>
                        ))}
                    </MenuGroup>
                </Menu>
            </ScrollBar>
        </div>
    )
}

const MailSidebar = () => {
    const { mobileSideBarExpand, toggleMobileSidebar } = useMailStore()

    const onMobileSideBarClose = () => {
        toggleMobileSidebar(false)
    }

    return (
        <>
            <Drawer
                bodyClass="p-0"
                title="Mailbox"
                isOpen={mobileSideBarExpand}
                placement="left"
                width={280}
                onClose={onMobileSideBarClose}
                onRequestClose={onMobileSideBarClose}
            >
                <div className="py-4 h-full">
                    <MailSideBarContent />
                </div>
            </Drawer>
            <div className={classNames('w-[240px]')}>
                <MailSideBarContent title="Mailbox" />
            </div>
        </>
    )
}

export default MailSidebar
