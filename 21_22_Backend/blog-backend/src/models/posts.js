import mongoose from "mongoose";

const {Schma} = mongoose;

const PostSchema = new Schma({
    title : String,
    body : String,
    tage : [String], //문자열로 이루어진 배ㄹ
    publishedDate : {
        type : Date,
        default : Date.now, //현재 날짜를 기본값으로 지정
    },
})

const Post =mongoose.model('Post',PostSchema)
export default Post;