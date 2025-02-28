require('dotenv').config();
const express=require('express')
const path=require('path')
const mongoose= require('mongoose')
const cookieParser=require('cookie-parser')

const userRoute=require('./routes/user')
const blogRoute=require('./routes/blog')
const staticRouter=require('./routes/staticRouter')

const { checkForAuthenticationCookie } = require('./middlewares/authentication')

const app=express()
const PORT=process.env.PORT || 8000

//mongoose.connect('mongodb://localhost:27017/blogify')
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));



app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended : false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))

app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.use('/',staticRouter)

app.listen(PORT, ()=> console.log(`surver is running on PORT ${PORT}`) )