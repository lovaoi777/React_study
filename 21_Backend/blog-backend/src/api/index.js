const Router = require('koa-router');
const posts = require('./posts')

const api = new Router;

api.use('/posts', posts.routes());

//라우터로 보냅니다.
module.exports = api;