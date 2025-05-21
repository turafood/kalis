import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const validationSchema = z
    .object({
        password: z.string().min(1, { message: 'Password Required' }),
        confirmPassword: z
            .string()
            .min(1, { message: 'Confirm Password Required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password not match',
        path: ['confirmPassword'],
    })

const DependentValidation = () => {
    const [submitting, setSubmitting] = useState(false)

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values) => {
        setSubmitting(true)
        setTimeout(() => {
            window.alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
            reset()
        }, 400)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormItem
                label="Password"
                invalid={Boolean(errors.password)}
                errorMessage={errors.password?.message}
            >
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="password"
                            autoComplete="off"
                            placeholder="Password"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Confirm Password"
                invalid={Boolean(errors.confirmPassword)}
                errorMessage={errors.confirmPassword?.message}
            >
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="password"
                            autoComplete="off"
                            placeholder="Confirm Password"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem>
                <div className="flex gap-2">
                    <Button type="reset" onClick={() => reset()}>
                        Reset
                    </Button>
                    <Button variant="solid" type="submit" loading={submitting}>
                        Submit
                    </Button>
                </div>
            </FormItem>
        </Form>
    )
}

export default DependentValidation
