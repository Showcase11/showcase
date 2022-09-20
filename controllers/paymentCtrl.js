const Razorpay = require('razorpay');
const crypto = require('crypto');

const mongoose = require('mongoose');
const express = require('express');
const paymentModel = require('../models/paymentModel')
const Payment = new mongoose.model('payment', paymentModel)

const instance = new Razorpay({
    key_id: process.env.Razorpay_Key_Id,
    key_secret: process.env.Razorpay_Key_Secret,
});

const paymentCtrl = {
    // create order 
    order: async (req, res, next) => {
        try {
            const options = {
                amount: Number(req.body.pay * 100),
                currency: "INR"
            };

            const order = await instance.orders.create(options);
            res.send({
                status: 200,
                message: 'Success',
                data: order
            })
            console.log(order)
        } catch (error) {
            next(error)
        }
    },
    // send key to the fronend 
    getApiKey: async (req, res) => {
        try {
            res.status(200).json({
                message: 'Success',
                key: process.env.Razorpay_Key_Id
            })
        } catch (error) {
            res.status(400).json({
                message: 'Failed',
                status: 400
            })
            next(error)

        }
    },

    // verify payment 
    verifyPayment: async (req, res) => {
        console.log('from body', req.body)
        try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body.response || {}
            const { email, userId, plan } = req.body || {}
            let body = razorpay_order_id + "|" + razorpay_payment_id;

            const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(body.toString())
                .digest('hex');


            if (expectedSignature === razorpay_signature) {

                const order = new Payment({
                    plan,
                    orderId: razorpay_order_id,
                    orderEmail: email,
                    paymentId: razorpay_payment_id,
                    user: userId,
                })
                const result = await order.save()
                console.log('save', result)
                if (result) {
                    res.status(200).send({
                        success: true,
                        razorpay_order_id,
                        razorpay_payment_id,
                        result
                    })
                } else {
                    res.status(400).json({
                        message: 'something went wrong'
                    })
                }
            } else {
                res.send({
                    success: false
                })
            }

        } catch (error) {
            console.log(error.message)
        }
    },
    getPaymentDetails: async (req, res) => {
        try {
            const { id } = req.params
            console.log(req.params)
            const result = await Payment.findOne({ user: id })
            console.log('result', result)
            res.status(200).send({
                message: 'Success',
                data: result,
                status: 200
            })
        } catch (error) {
            console.log(error.message)
            res.status(400).send({
                error: error?.message,
                message: 'Failed to load'
            })
        }
    }
}

module.exports = paymentCtrl