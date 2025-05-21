import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'
const Page = () => {
    return (
        <>
            <p>
                Once you&apos;ve installed all the dependencies, you can start
                the development server by running the following command in your
                terminal:
            </p>
            <SyntaxHighlighter>npm run dev</SyntaxHighlighter>
            <p>
                Open your browser and go to{' '}
                <a
                    href="http://localhost:3000/"
                    target="_blank"
                    rel="noreferrer"
                >
                    http://localhost:3000/
                </a>
                . The app will automatically reload whenever you make changes to
                the source files.
            </p>
        </>
    )
}

export default Page
