const { Goods, Category } = require("../../models");
const fetch   = require('node-fetch')
const redis   = require('redis')

const client  = redis.createClient()

// redis 연습
client.on('error', (err) => {
    console.log(`Error : ${err}`)
    
})

client.on('connect', (err, res) => {
    console.log(`접속 성공`)
})

// 메인 페이지
exports.get_main_page = async(req, res) => {
  try {
    const redisKey = "goods"
    client.get(redisKey, async(err, re) => {
      if (re) {
        res.status(200).send({result : JSON.parse(re)})
      }else{
        re = await Goods.find({}).exec()
        client.setex(redisKey, 60*60, JSON.stringify(re))
        res.status(200).send({result : re})
      }
    })
  } catch (err) {
    console.log(err)
    res.status(400).send({ err: err.message });
  }
};

// 카테고리 페이지
exports.get_category_page = async (req, res) => {
  try {
    categoryId = req.params.categoryId
    category   = await Category.find({
      _id: categoryId,
    }).exec();
    const redisKey = "goods"
    client.get(redisKey, async(err, re) => {
      if (re) {
        res.status(200).send({result : JSON.parse(re)})
      }else{
        re = await Goods.find({ category: category.name }).exec();
        client.setex(redisKey, 60*60, JSON.stringify(re))
        res.status(200).send({result : re})
      }
    })
  } catch (err) {
    console.log(err)
    res.status(400).send({ err: err.message });
  }
};

// 상세 페이지
exports.get_detail_page = async (req, res) => {
  try {
    goodsId = req.params.goodsId;
    const redisKey = "main"
    client.get(redisKey, async(err, re) => {
      if (re) {
        res.status(200).send({result : JSON.parse(re)})
      }else{
        re = await Goods.find({ _id: goodsId }).exec();
        client.setex(redisKey, 60*60, JSON.stringify(re))
        res.status(200).send({result : re})
      }
    })
  } catch (err) {
    console.log(err)
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

exports.get_page = async(req, res) => {
  try {
    const keyword = req.query.keyword;
    console.log(keyword)
    const redisKey = "main"
    client.get(redisKey, async(err, re) => {
      if (re) {
        res.status(200).send({result : JSON.parse(re)})
      }else{
        re = await Goods.find({ title: { $regex: keyword } });
        client.setex(redisKey, 60*60, JSON.stringify(re))
        res.status(200).send({result : re})
      }
    })
  } catch (err) {
    console.log(err)
    res.status(400).send({ err: err.message });
  }
};
