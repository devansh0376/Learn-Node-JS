const { getUser } = require("../service/auth");


function checkForAuthentication(req,res,next)
{
  const tokenCookie = req.cookies?.token
  req.user=null
  if(!tokenCookie)
  return next()

  const token=tokenCookie
  req.user = getUser(token) // ✅ Ensures req.user is either a user object or null
  return next();
}

function restrictTo(roles)
{
  return function(req,res,next)
  {
    if(!req.user)
      return res.redirect('/login')

    if( !roles.includes(req.user.role))
     return res.end("UnAuthorized")

    return next()
  }
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//   //const userUid = req.cookies?.uid;
//  // const token = req.cookies?.token; 
//  const userUid = req.headers["authorization"];
//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split("Bearer ")[1];// token : bearer 1546546464 we spit in to array [bearer ][1546546464 ]
//   const user = getUser(token);

//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   //const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1];
//   console.log(token)
//   req.user = getUser(token) // ✅ Ensures req.user is either a user object or null
//    next();
// }

module.exports = {
  // restrictToLoggedinUserOnly,
  // checkAuth,
  checkForAuthentication,
  restrictTo
};
