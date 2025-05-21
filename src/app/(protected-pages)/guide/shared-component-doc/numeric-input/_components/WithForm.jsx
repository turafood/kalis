import Button from '@/components/ui/Button'
import { Form, FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import { useForm, Controller } from 'react-hook-form'

const WithForm = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm()

    const onSubmit = (value) => {
        console.log(value)
    }

    return (
        <Form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <FormItem
                label="Amount"
                invalid={Boolean(errors.amount)}
                errorMessage={errors.amount?.message}
            >
                <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                        <NumericInput
                            thousandSeparator
                            placeholder="Amount"
                            value={field.value}
                            onValueChange={(e) => {
                                field.onChange(e.floatValue)
                            }}
                        />
                    )}
                />
            </FormItem>
            <Button block variant="solid" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default WithForm
