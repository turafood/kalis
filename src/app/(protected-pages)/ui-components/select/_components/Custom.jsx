import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { components } from 'react-select'

const { MultiValueLabel, Control } = components

const countryOptions = [
    { value: 'us', label: 'United State', imgPath: '/img/countries/US.png' },
    { value: 'cn', label: 'China', imgPath: '/img/countries/CN.png' },
    { value: 'jp', label: 'Japan', imgPath: '/img/countries/JP.png' },
    { value: 'fr', label: 'French', imgPath: '/img/countries/FR.png' },
]

const CustomSelectOption = (props) => {
    return (
        <DefaultOption
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Avatar shape="circle" size={20} src={data.imgPath} />
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={18}
                    src={selected.imgPath}
                />
            )}
            {children}
        </Control>
    )
}

const CustomControlMulti = ({ children, ...props }) => {
    const { imgPath } = props.data
    return (
        <MultiValueLabel {...props}>
            <div className="inline-flex items-center">
                <Avatar
                    className="mr-2 rtl:ml-2"
                    shape="circle"
                    size={15}
                    src={imgPath}
                />
                {children}
            </div>
        </MultiValueLabel>
    )
}

const Custom = () => {
    return (
        <div>
            <Select
                instanceId="custom"
                options={countryOptions}
                components={{
                    Option: CustomSelectOption,
                    Control: CustomControl,
                }}
                defaultValue={countryOptions[0]}
                className="mb-4"
            />
            <Select
                isMulti
                instanceId="custom-multi"
                options={countryOptions}
                components={{
                    Option: CustomSelectOption,
                    MultiValueLabel: CustomControlMulti,
                }}
                defaultValue={[countryOptions[1], countryOptions[2]]}
                className="mb-4"
            />
        </div>
    )
}

export default Custom
