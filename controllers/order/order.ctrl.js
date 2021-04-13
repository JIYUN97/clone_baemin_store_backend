const { Goods, Order} = require("../../models");

// 주문
exports.order = async(req, res)=>{
    const { user, goods, quantity, address_one, address_two,delivery_comment,payment_method} = req.body;
    let { phone_number } = req.body

    order = await Order.findOne({ user : user, goods : goods})
    if (order) {
        await Order.updateOne({user:user, goods, goods}, {$set : {quantity : this.order.quantity + quantity}})
    }

    if(phone_number.includes("-")) {
        phone_number = phone_number.split('-')
        phone_number = phone_number.join('')
    }

    await Order.create({
        user             : user,
        goods            : goods,
        quantity         : quantity,
        address_one      : address_one,
        address_two      : address_two,
        delivery_comment : delivery_comment,
        phone_number     : phone_number,
        payment_method   : payment_method
    })
    res.status(200).send({ result : "success" })
}