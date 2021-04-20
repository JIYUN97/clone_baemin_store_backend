const { User, Goods, Order } = require("../../models");

// 주문
exports.order_post = async(req, res)=>{
    try {
        const { goods, quantity, address_one, address_two,zipcode,delivery_comment,payment_method} = req.body;
        let { phone_number } = req.body
 
        if(phone_number.includes("-")) {
            phone_number = phone_number.split('-')
            phone_number = phone_number.join('')
        }
        
        await Order.create({
            user             : res.locals.user,
            goods            : goodsId,
            quantity         : quantity,
            address_one      : address_one,
            address_two      : address_two,
            zipcode          : zipcode, 
            delivery_comment : delivery_comment,
            phone_number     : phone_number,
            payment_method   : payment_method
        })
        res.status(200).send({ result : "success" })
    }catch (err) {
        console.log(err)
        res.status(400).send({ result : "fail"})
    }
}

exports.order_get = async(req, res) => {
    try{
        const { user }  = res.locals.user
        orders = await Order.find({ user })
        res.status(200).send({
            result : orders
        })
    }catch(err) {
        console.log(err)
        res.status(400).send({
            result : "fail"
        })
    }
}

