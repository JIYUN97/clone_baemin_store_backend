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
exports.get_category_page = async(req, res) => {
    console.log(req.params.cateogoryId)
    category_goods = await Goods.find({
        category
    })
}

// 상세 페이지
exports.get_detail_page = async(req, res) => {
    res.send("상세페이지 연결 성공")
}

// 검색 
// exports.get_search = (req, res) => {
//     res.send("검색완료")
//     console.log(req.query)
// }


