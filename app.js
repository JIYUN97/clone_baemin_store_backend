const express  = require('express');
const mongoose = require('mongoose'); 
const logger   = require('morgan');
const cors     = require('cors')

class App {

    constructor () {
        this.app = express();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // db 연결성공
        this.setDB();

        // 정적 디렉토리 추가
        this.setStatic();

        // 로컬 변수
        this.setLocals();

        // 라우팅
        this.setRouter();

        // 404 ㅔ=페이지를 찾을수가 없음
        this.status404();

        // 에러처리 
        this.errorHandler();

    }

    setDB() {
        mongoose.connect('mongodb://15.164.211.216/admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
            ignoreUndefined: true,
            user: "test",
            pass: "test"
        })
        .then(() => console.log("db connected"))
        .catch(err => console.log(err));        
    }

    setMiddleWare () {
        // 미들웨어 셋팅
        this.app.use(cors())
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    setStatic() {
        this.app.use('/uploads', express.static('uploads'))
    }

    setLocals() {
    }

    setRouter() {
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

module.exports = new App().app
