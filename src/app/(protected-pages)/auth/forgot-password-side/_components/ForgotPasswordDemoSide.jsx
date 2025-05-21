'use client'
import ForgotPassword from '@/components/auth/ForgotPassword'
import Side from '@/components/layouts/AuthLayout/Side'
import { apiForgotPassword } from '@/services/AuthService'

const ForgotPasswordDemoSide = () => {
    const handleForgotPasswordSubmit = async ({
        values,
        setSubmitting,
        setMessage,
        setEmailSent,
    }) => {
        try {
            setSubmitting(true)
            await apiForgotPassword(values)
            setEmailSent(true)
        } catch (error) {
            setMessage(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Side>
            <ForgotPassword
                signInUrl="/auth/sign-in-side"
                onForgotPasswordSubmit={handleForgotPasswordSubmit}
            />
        </Side>
    )
}

export default ForgotPasswordDemoSide
