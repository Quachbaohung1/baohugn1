const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')("sk_test_51K3IZIIdPT03RMX6NlJGStkK7978CzQgsMGZBdpL5fxnwZ1Gsdkg7irk4kClKeLJPZDGUu0iB0DIQzxrYaDEatmh00y2oBTYVQ");

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    console.log("I am calling youuu, please confirm");
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
    console.log("I am calling youuu");
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})