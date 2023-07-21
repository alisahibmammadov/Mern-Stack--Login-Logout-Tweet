const jwt = require("jsonwebtoken");
const Kullanici = require("../models/kullaniciModel");


const authKontrol = async (req,res,next)=>{

    const {authorization} = req.headers
    // console.log(req.headers);
    if(!authorization){
        return res.status(401).json({msg:"Yetkilendirme token\'i gerekli"})
    }

    // Bearer znskfnaksf
    const token = authorization.split(' ')[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET_KEY)
        req.kullanici = await Kullanici.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({msg:"Istek yetkili deyil"})
    }




}
module.exports = authKontrol