import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

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

    } catch (error) {

    }

}


// Placing order using Razorpay

const placeOrderRazorpay = async (req, res) => {

}


// all orders data for admin panel

const allOrders = async (req, res) => {

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

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }