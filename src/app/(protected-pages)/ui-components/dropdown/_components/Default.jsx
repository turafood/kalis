import Dropdown from '@/components/ui/Dropdown'

const Default = () => {
    const dropdownItems = [
        { key: 'a', name: 'Item A' },
        { key: 'b', name: 'Item B' },
        { key: 'c', name: 'Item C' },
        { key: 'd', name: 'Item D' },
    ]

    const onDropdownItemClick = (eventKey, e) => {
        console.log('Dropdown Item Clicked', eventKey, e)
    }

    const onDropdownClick = (e) => {
        console.log('Dropdown Clicked', e)
    }

    return (
        <div>
            <Dropdown title="Click Me!" onClick={onDropdownClick}>
                {dropdownItems.map((item) => (
                    <Dropdown.Item
                        key={item.key}
                        eventKey={item.key}
                        onSelect={onDropdownItemClick}
                    >
                        {item.name}
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    )
}

export default Default
