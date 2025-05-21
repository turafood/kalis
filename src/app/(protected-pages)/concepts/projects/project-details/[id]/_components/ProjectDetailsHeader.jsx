'use client'
import { useState, useEffect, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Form, FormItem } from '@/components/ui/Form'
import ToggleDrawer from '@/components/shared/ToggleDrawer'
import ProjectDetailsNavigation from './ProjectDetailsNavigation'
import useResponsive from '@/utils/hooks/useResponsive'
import { apiGetProjectMembers } from '@/services/ProjectService'
import { components } from 'react-select'
import { TbChecks } from 'react-icons/tb'
import useSWRMutation from 'swr/mutation'

const { MultiValueLabel } = components

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <Avatar shape="circle" size={20} src={data.img} />
                <span className="font-semibold heading-text">{label}</span>
            </div>
            {isSelected && <TbChecks className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControlMulti = ({ children, ...props }) => {
    const { img } = props.data

    return (
        <MultiValueLabel {...props}>
            <div className="inline-flex items-center">
                <Avatar
                    className="mr-2 rtl:ml-2"
                    shape="circle"
                    size={15}
                    src={img}
                />
                {children}
            </div>
        </MultiValueLabel>
    )
}

const ProjectDetailsHeader = (props) => {
    const { title, isContentEdit, onEdit, onChange, selected } = props

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [loading, setLoading] = useState(false)

    const [copied, setCopied] = useState(false)

    const [memberOptions, setMemberOptions] = useState([])

    const drawerRef = useRef(null)

    const { smaller } = useResponsive()

    const { trigger } = useSWRMutation(
        ['/api/projects/members'],
        () => apiGetProjectMembers(),
        {
            onSuccess: (data) => {
                const members = data?.allMembers.map((item) => ({
                    value: item.id,
                    label: item.name,
                    img: item.img,
                }))
                setMemberOptions(members)
            },
        },
    )

    const handleFocus = async () => {
        if (memberOptions.length === 0) {
            setLoading(true)
            await trigger()
            setLoading(false)
        }
    }

    useEffect(() => {
        if (copied) {
            const copyFeedbackInterval = setTimeout(
                () => setCopied(false),
                2000,
            )

            return () => {
                clearTimeout(copyFeedbackInterval)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [copied])

    const handleNavigationChange = (val) => {
        onChange(val)
        drawerRef.current?.handleCloseDrawer()
    }

    return (
        <>
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 mb-6 pb-4">
                <div className="flex items-center gap-4">
                    {smaller.xl && (
                        <ToggleDrawer ref={drawerRef} title="Navigation">
                            <ProjectDetailsNavigation
                                selected={selected}
                                onChange={handleNavigationChange}
                            />
                        </ToggleDrawer>
                    )}
                    <h3>{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setIsDialogOpen(true)}>Share</Button>
                    <Button
                        disabled={isContentEdit}
                        variant="solid"
                        onClick={() => onEdit(!isContentEdit)}
                    >
                        {isContentEdit ? 'Editing' : 'Edit'}
                    </Button>
                </div>
            </div>
            <Dialog
                isOpen={isDialogOpen}
                width={640}
                onClose={() => setIsDialogOpen(false)}
                onRequestClose={() => setIsDialogOpen(false)}
            >
                <h5>Share this project</h5>
                <Form className="my-6">
                    <FormItem label="Copy link">
                        <Input
                            readOnly
                            value="https://edge.themenate.net/concepts/projects/project-details/27"
                            suffix={
                                <Button
                                    type="button"
                                    variant="solid"
                                    size="sm"
                                    customColorClass={() =>
                                        'bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200'
                                    }
                                    onClick={() => setCopied(true)}
                                >
                                    {copied ? 'Copied' : 'Copy'}
                                </Button>
                            }
                        />
                    </FormItem>
                    <FormItem label="Or share to members">
                        <Select
                            isMulti
                            instanceId="members"
                            className="min-w-[120px]"
                            components={{
                                Option: CustomSelectOption,
                                MultiValueLabel: CustomControlMulti,
                            }}
                            options={memberOptions}
                            isLoading={loading}
                            onFocus={handleFocus}
                        />
                    </FormItem>
                </Form>
                <div className="flex items-center justify-end gap-2">
                    <Button onClick={() => setIsDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Share
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default ProjectDetailsHeader
