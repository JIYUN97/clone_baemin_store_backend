const { Goods, Category } = require("../../models");

// 메인 페이지
exports.get_main_page = async (req, res) => {
  try {
    goods = await Goods.find({});
    res.status(200).send({ result: { goods } });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

// 카테고리 페이지
exports.get_category_page = async (req, res) => {
  try {
    categoryId = req.params.cateogoryId;
    category = await Category.find({
      _id: categoryId,
    });

    category_goods = await Goods.find({ category: category.name });

    res.status(200).send({ result: { category_goods } });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

// 상세 페이지
exports.get_detail_page = async (req, res) => {
  try {
    goodsId = req.params.goodsId;
    goods = await Goods.find({ _id: goodsId });
    res.status(200).send({ result: { goods } });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

// 검색
exports.search = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const goods = await Goods.find({ title: { $regex: keyword } });

    res.status(200).send({ result: { goods } });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
};
