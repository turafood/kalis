'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'

// Demo
import Example from './Example'

const mdPath = 'IsLastChildDoc'

const demoHeader = {
    title: 'isLastChild',
    desc: 'A function to discriminate last index of an array.',
}

const demos = [
    {
        mdName: 'Example',
        mdPath: mdPath,
        title: 'Example',
        desc: ``,
        component: <Example />,
    },
]

const demoApi = [
    {
        component: 'Params',
        api: [
            {
                propName: 'arr',
                type: `<code>Array</code>`,
                default: `-`,
                desc: 'Array',
            },
            {
                propName: 'index',
                type: `<code>number</code>`,
                default: `-`,
                desc: 'Current index',
            },
        ],
    },
]

const extra = (
    <DemoComponentApi
        hideApiTitle
        keyText="return"
        api={[
            {
                component: 'Return',
                api: [
                    {
                        propName: 'lastChild',
                        type: `<code>boolean</code>`,
                        default: `-`,
                        desc: 'Whether the input index is last of the array.',
                    },
                ],
            },
        ]}
    />
)

const IsLastChildDoc = () => {
    return (
        <DemoLayout
            hideApiTitle
            hideFooter
            innerFrame={false}
            header={demoHeader}
            demos={demos}
            api={demoApi}
            mdPrefixPath="utils"
            extra={extra}
            keyText="param"
        />
    )
}

export default IsLastChildDoc
