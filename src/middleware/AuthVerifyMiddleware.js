var jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    let Token = req.headers['token-key']
    jwt.verify(Token, 'joss2359', function(err, decoded){
        if(err){
            res.status(401).join({status:'unauthorized'})
        }
        else{
            let username = decoded['data']['UserName']
            req.headers.username = username
            next();
        }
    })
}