const cookie = require('../cookie/cookieFunction');
const logout = (req,res) => {
    cookie.logoutUser(req,res);    
    res.redirect('/');
}
module.exports = {
    logout
}
