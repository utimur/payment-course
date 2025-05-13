import express, { Request, Response } from 'express';
import cors from 'cors';
import {ICreatePayment, YooCheckout} from '@a2seven/yoo-checkout';

const database: any = {

}

const app = express();
const PORT = Number(process.env.PORT) || 4001;

app.use(cors({
    credentials: true,
    origin: 'http://5.35.28.88:5173'
}));
app.use(express.json());

// ---------------------------------

const YouKassa = new YooCheckout({
    shopId: '1082575',
    secretKey: 'test_eoCC7M0gupEbxLPkH2JEr6FyhccP_T_LatFk-0hxvgc'
});

app.post('/api/payment', async (req: Request, res: Response) => {
    const createPayload: ICreatePayment = {
        amount: {
            value: req.body.value,
            currency: 'RUB'
        },
        payment_method_data: {
            type: 'bank_card'
        },
        capture: true,
        confirmation: {
            type: 'redirect',
            return_url: 'https://secondly-worthy-shrimp.cloudpub.ru'
        },
        metadata: {
            orderId: req.body.orderId,
            userId: req.body.userId,
        }
    };

    try {
        const payment = await YouKassa.createPayment(
            createPayload,
            // Не делать так в проде
            Date.now().toString()
        );

        database[payment.id] = payment;
        res.json({payment})
    } catch (error) {
        console.error(error);
        res.status(400).json({error: 'error'});
    }
});

app.post('/api/payment/notifications', async (req: Request, res: Response) => {
    console.log(req.body)
    database[req.body.id] = req.body;
    res.json({status: "OK"})
})

app.listen(PORT, '0.0.0.0' ,() => {
    console.log(`Server running at http://localhost:${PORT}`);
});