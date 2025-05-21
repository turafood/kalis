'use client'
import ResetPassword from '@/components/auth/ResetPassword'
import Side from '@/components/layouts/AuthLayout/Side'
import { apiResetPassword } from '@/services/AuthService'
import { useSearchParams } from 'next/navigation'

const ResetPasswordDemoSide = () => {
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
        <Side>
            <ResetPassword
                signInUrl="/auth/sign-in-side"
                onResetPasswordSubmit={handleResetPassword}
            />
        </Side>
    )
}

export default ResetPasswordDemoSide
