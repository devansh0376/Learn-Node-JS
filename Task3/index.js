const express=require('express')
const path=require('path')
const mongoose= require('mongoose')
const userRoute=require('./routes/user')
const staticRouter=require('./routes/staticRouter')
const cookieParser=require('cookie-parser')
const { checkForAuthenticationCookie } = require('./middlewares/authentication')
const app=express()
const PORT=8000

mongoose.connect('mongodb://localhost:27017/blogify')

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended : false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'))

app.get("/", async (req, res) => {
    res.render("home", {
      user: req.user,
    });
  });
  

app.use('/user',userRoute)
app.use('/',staticRouter)

app.listen(PORT, ()=> console.log('surver is running on PORT 8000') )