import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {

        const { token } = req.headers

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "You are not Authorized, please login as admin"
            })
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                success: false,
                message: "You are not Authorized, please login as admin"
            })
        }

        next()


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default adminAuth