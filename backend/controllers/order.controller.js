import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe";


// Global variables

const currency = "inr"
const deliveryCharge = 50

// gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)




// Placing order using Cash on delivery

const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)

        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order placed successfully" })



    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });
    }

}


// Placing order using Stripe

const placeOrderStripe = async (req, res) => {


    try {

        const { userId, items, amount, address } = req.body
        const { origin } = req.headers
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)

        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
}

// Verify Stripe

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {

        if (success) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: "Order placed successfully" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Order cancelled" })
        }

    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });

    }
}


// Placing order using Razorpay

const placeOrderRazorpay = async (req, res) => {

    try {

    } catch (error) {

    }

}


// all orders data for admin panel

const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({})

        res.json({ success: true, orders })

    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });

    }

}

//  user orderData for frontend

const userOrders = async (req, res) => {


    try {

        const { userId } = req.body

        const userOrders = await orderModel.find({ userId })
        res.json({ success: true, userOrders })

    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });

    }



}

// Update order status from admin panel

const updateStatus = async (req, res) => {

    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({ success: true, message: "Order status updated successfully" })


    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });

    }

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe }