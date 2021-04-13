const Goods = require('../../models/goods')

// 메인 페이지
exports.get_main_page = async(req, res) => {
    goods = await Goods.find({})
    res.status(200).send({
        "result" : "success",
        "goods"  : goods
    })
}

// 카테고리 페이지
// exports.get_category_page = async(req, res) => {
//     categoryId = req.params.cateogoryId

    

//     category_goods = await Goods.find({
//         categoryId : categoryId
//     })
// }

// 상세 페이지
exports.get_detail_page = async(req, res) => {
    goodsId = req.params.goodsId
    goods   = await Goods.find({ "_id" : goodsId})
    res.status(200).send({
        "result" : "success",
        "goods"  : goods
    })
}

// 검색 
// exports.get_search = (req, res) => {
//     res.send("검색완료")
//     console.log(req.query)
// }


