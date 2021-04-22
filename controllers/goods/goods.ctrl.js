const { User, Goods, Category, Comment, Order } = require("../../models");
const fetch = require("node-fetch");
const redis = require("redis");

const client = redis.createClient();

// redis 연습
client.on("error", (err) => {
  console.log(`Error : ${err}`);
});

client.on("connect", (err, res) => {
  console.log(`접속 성공`);
});

// 메인 페이지
exports.get_main_page = async (req, res) => {
  try {
    const redisKey = "main";
    client.get(redisKey, async (err, re) => {
      if (re) {
        res.status(200).send({ result: JSON.parse(re) });
      } else {
        re = await Goods.find({}).exec();
        client.setex(redisKey, 60 * 60, JSON.stringify(re));
        res.status(200).send({ result: re });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
};

// 카테고리 페이지
exports.get_category_page = async (req, res) => {
  try {
    category_name = req.query.name;
    category = await Category.findOne({
      name: category_name,
    });
    const redisKey = "category";
    client.del(redisKey);
    client.get(redisKey, async (err, re) => {
      if (re) {
        res.status(200).send({ result: JSON.parse(re) });
      } else {
        re = await Goods.find({ category: category._id });
        client.setex(redisKey, 60 * 60, JSON.stringify(re));
        res.status(200).send({ result: re });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
};

// 상세 페이지
exports.get_detail_page = async (req, res) => {
  try {
    goodsId = req.params.goodsId;
    const redisKey = "detail";
    client.del(redisKey);
    client.get(redisKey, async (err, re) => {
      if (re) {
        res.status(200).send({ result: JSON.parse(re) });
      } else {
        re = await Goods.find({ _id: goodsId }).exec();
        client.setex(redisKey, 60 * 60, JSON.stringify(re));
        res.status(200).send({ result: re });
      }
    });
  } catch (err) {
    console.log(err);
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
exports.createComment = async (req, res) => {
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
    return res.status(400).send({ err: err.message });
  }
};

//코멘트(상품후기) 가져오기
exports.getComment = async (req, res) => {
  const { goodsId } = req.params;
  try {
    const comments = await Comment.find({ goods: goodsId })
      .populate("user", "id name")
      .select("user title content star_rating createdAt")
      .sort("-createdAt");
    return res.send({ result: comments });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
};

//코멘트(상품후기) 삭제하기
exports.deleteComment = async (req, res) => {
  //코멘트 id
  const { id } = req.body;
  //상품 id
  const { goodsId } = req.params;
  try {
    //댓글 삭제 및 댓글 갯수 수정
    await Promise.all([
      Comment.findByIdAndDelete(id),
      Goods.findByIdAndUpdate(goodsId, { $inc: { comment_count: -1 } }),
    ]);
    return res.send({ result: "success" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
};
