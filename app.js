import express from 'express';
import path from 'path';
import userLogin from './routes/auth.routrs.js';
import createPost from './routes/post.routers.js';
import cookieParser from 'cookie-parser';
import { verifyAuth } from './middlewares/verify-auth.js';
import session from 'express-session';
import methodOverride from 'method-override';
import requestIp from 'request-ip';


const app=express();
const PORT=process.env.PORT ||8000;

app.use(express.json());

app.use(express.static(path.join(import.meta.dirname,'public')));
app.use(express.static(path.join(import.meta.dirname,"/public/js")));
app.use('/uploads', express.static(path.join(import.meta.dirname,"uploads")));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views","./views");
app.use(methodOverride("_method"));



app.use(cookieParser());

app.use(session({
    secret:"my-secret",
    resave:true,
    saveUninitialized:false
}));


app.use(requestIp.mw());
app.use(verifyAuth)

//! roters
app.use(userLogin);
app.use(createPost);



app.listen(PORT,()=>{
    console.log(`app is listen on ${PORT}`);
    
})