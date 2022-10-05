require('dotenv').config();
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'

import api from './api'
//비구조화 할당을 통해 process.env 내부 값에 대한 래퍼런스 만들기
// eslint-disable-next-line no-undef
const { PORT,MONGO_URI } = process.env; 

mongoose
.connect(MONGO_URI)
 .then(()=>{ 
    console.log('Connected to MongoDB');
 })
.catch(e => {
    console.log(e);
});
const api = require('./api');

const app = new Koa();
const router = new Router();    

//라우터 설정
router.use('/api', api.routes());

//라우터 적용 전에 bodyParser적용
app.use(bodyParser());

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

//PORT가 지정되지 있지 않다면 4000을 사용
const port = PORT || 4000;
app.listen(port, ()=>{
    console.log('Listening to port %d',port);
});

// app.listen(4000, () => { 
//     console.log('Listening to port 4000');
// }) //서버 포트는 4000번 포트
