```jsx
import Menu from '@/components/ui/Menu'

const Simple = () => {
    const handleSelect = (key, e) => {
        console.log('key', key)
        console.log('event', e)
    }

    return (
        <div
            className="border border-gray-200 dark:border-gray-700 rounded-md p-2"
            style={{ maxWidth: 250 }}
        >
            <Menu onSelect={handleSelect}>
                <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
                <Menu.MenuItem eventKey="message">Message</Menu.MenuItem>
                <Menu.MenuItem eventKey="gallery">Gallery</Menu.MenuItem>
            </Menu>
        </div>
    )
}

export default Simple
```
