'use client'
import Segment from '@/components/ui/Segment'
import { usePricingStore } from '../_store/pricingStore'

const PaymentCycleToggle = () => {
    const { paymentCycle, setPaymentCycle } = usePricingStore()

    return (
        <Segment value={paymentCycle} onChange={(val) => setPaymentCycle(val)}>
            <Segment.Item value="monthly">Monthly</Segment.Item>
            <Segment.Item value="annually">Annually</Segment.Item>
        </Segment>
    )
}

export default PaymentCycleToggle
