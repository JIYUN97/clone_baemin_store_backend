const express = require('express');
const logger  = require('morgan');

class App {

    constructor () {
        this.app = express();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        this.setStatic();

        // 로컬 변수
        this.setLocals();

        // 라우팅
        this.getRouting();

        // 404 ㅔ=페이지를 찾을수가 없음
        this.status404();

        // 에러처리 
        this.errorHandler();

    }

    setMiddleWare () {
        // 미들웨어 셋팅
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    setStatic() {
        this.app.use('/uploads', express.static('uploads'))
    }

    setLocals() {
    }

    getRouting() {
        this.app.use(require('./routers'))
    }

    status404() {
        this.app.use((req, res, _) =>  {
            res.status(404).send("해당페이지를 찾을 수 없습니다.")
        })
    }

    errorHandler() {
        this.app.use((err, req, res, _ ) =>  {
            res.status(500).render("서버에서 오류가 났으니 확인부탁드립니다.")
        })
    }
}
