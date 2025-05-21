'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'

// Demo
import Example from './Example'

const mdPath = 'UseAuthorityDoc'

const demoHeader = {
    title: 'useAuthority',
    desc: 'useAuthority hook help to check whether the current user has permmision to access.',
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
                propName: 'userAuthority',
                type: `<code>Array</code>`,
                default: `<code>[]</code>`,
                desc: 'List of the user roles',
            },
            {
                propName: 'authority',
                type: `<code>Array</code>`,
                default: `<code>[]</code>`,
                desc: 'List of roles that allow to access',
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
                        propName: 'roleMatched',
                        type: `<code>boolean</code>`,
                        default: `-`,
                        desc: 'Result of authority match',
                    },
                ],
            },
        ]}
    />
)

const UseAuthorityDoc = () => {
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

export default UseAuthorityDoc
