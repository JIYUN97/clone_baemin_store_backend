const { Router } = require("express");
const router = Router();
const ctrl = require("./goods.ctrl");
const validation = require("../../middlewares/validation");

//메인 페이지
router.get("/", ctrl.get_main_page);

// 카테고리 페이지
router.get("/category", ctrl.get_category_page);

// 검색 기능
router.get("/goods_search", ctrl.search);

// 상세페이지
router.get("/:goodsId", ctrl.get_detail_page);

//상품후기, 코멘트 작성
router.post("/:goodsId/comment", validation, ctrl.createComment);

//상품후기, 코멘트 불러오기
router.get("/:goodsId/comment", ctrl.getComment);

//상품 후기, 코멘트 삭제하기
router.delete("/:goodsId/comment", ctrl.deleteComment);

module.exports = router;
