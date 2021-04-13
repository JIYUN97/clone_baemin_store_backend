const { Goods, Order} = require("../../models");

exports.order = async(req, res)=>{
    const { user, goods, address_one, address_two,delivery_comment,payment_method} = req.body;
    let { phone_number } = req.body
    if(phone_number.includes("-")) {
        console.log(phone_number.split('-'))
        phone_number = )
    }

    


    // await Order.create({
    //     user             : user,
    //     goods            : goods,
    //     address_one      : address_one,
    //     address_two      : address_two,
    //     delivery_comment : delivery_comment,
    //     phone_number     : phone_number,
    //     payment_method   : payment_method
    // })
    res.status(200).send("성공")
}