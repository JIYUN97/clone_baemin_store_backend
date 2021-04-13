const { Router } = require("express");
const router = Router();
const ctrl = require("./goods.ctrl");

// redis 연습
router.get("/search", ctrl.get_page);

//메인 페이지
router.get("/", ctrl.get_main_page);

// 카테고리 페이지
router.get("/category/:cateogoryId", ctrl.get_category_page);

// 검색 기능
router.get("/goods_search", ctrl.search);

// 상세페이지
router.get("/:goodsId", ctrl.get_detail_page);


module.exports = router;
