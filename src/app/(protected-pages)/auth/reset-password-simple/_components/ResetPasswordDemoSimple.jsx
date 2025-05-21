'use client'
import ResetPassword from '@/components/auth/ResetPassword'
import Simple from '@/components/layouts/AuthLayout/Simple'
import { apiResetPassword } from '@/services/AuthService'
import { useSearchParams } from 'next/navigation'

const ResetPasswordDemoSimple = () => {
    const searchParams = useSearchParams()

    /** Token or Verification Code ensures the request is tied to the correct user */
    const token = searchParams.get('token')

    const handleResetPassword = async (payload) => {
        const { values, setSubmitting, setMessage, setResetComplete } = payload
        try {
            setSubmitting(true)
            await apiResetPassword({
                ...values,
                token: token || '',
            })
            setResetComplete?.(true)
        } catch (error) {
            setMessage(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Simple>
            <ResetPassword
                signInUrl="/auth/sign-in-simple"
                onResetPasswordSubmit={handleResetPassword}
            />
        </Simple>
    )
}

export default ResetPasswordDemoSimple
