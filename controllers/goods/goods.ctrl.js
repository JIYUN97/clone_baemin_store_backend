const { Goods, Category, Comment, Order } = require("../../models");

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

//코멘트(상품 후기) 생성
exports.postComment = async (req, res) => {
  const { goodsId } = req.params;
  const userId = res.locals.user;
  const { title, content, star_rating } = req.body;
  try {
    const [commentCheck, buyCheck] = await Promise.all([
      Comment.findOne().and([{ user: userId }, { goods: goodsId }]),
      Order.findOne().and([{ user: userId }, { goods: goodsId }]),
    ]);
    //후기 작성 여부
    if (commentCheck)
      return res
        .status(401)
        .send({ err: "이미 해당 상품의 후기를 작성하셨습니다." });
    //해당 상품 구매여부
    if (!buyCheck)
      return res
        .status(401)
        .send({ err: "구매한 상품에 대해서만 후기 작성 가능합니다." });

    const newComment = new Comment({
      user: userId,
      goods: goodsId,
      title,
      content,
      star_rating,
    });
    //상품후기 저장 및 상품 후기 수 업데이트
    await Promise.all([
      newComment.save(),
      Goods.updateOne({ _id: goodsId }, { $inc: { comment_count: 1 } }),
    ]);
    return res.send({ result: "success" });
  } catch (err) {
    console.log(err);
    return res.status(400);
  }
};
