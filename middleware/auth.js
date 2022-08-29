const jwt = require("jsonwebtoken");
const auth_jwt = (req, res, next) => {
  const token = req.cookies['JWT']
  try {
    jwt.verify(token, process.env.JWT_KEY,(err, decoded)=>{
      if(err){
        res.status(401).render("cartpage")
      }
      
      req.user = decoded
    });
    
    next();
  } catch (e) {
    res.status(401).send({msg: "Invalid Token"});
  }
};
// const auth_admin = (req, res, next) => {
//   const token = req.cookies['JWT']
//   try {
//     jwt.verify(token, process.env.JWT_KEY,(err, decoded)=>{
//       console.log(decoded)
//       if(err){
//         res.status(401).send({redirect:"/homepage"})
//       }
      
//       req.user = decoded
//     });
    
//     next();
//   } catch (e) {
//     res.status(401).send({msg: "Invalid Token"});
//   }
// };

module.exports = {auth_jwt};