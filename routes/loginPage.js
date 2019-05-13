const fs = require('fs');
let referer = '/';
const loginPageHandler = (req, res) => {
    referer = req.headers.referer;
    if (referer == null || undefined) {     
        referer = '/';
    }
    res.render('userAccounts/loginPage');
}

const authUser = (req, res) => {

    var email = req.body.email;
    var pass = req.body.pass;
    const path = "./db/users.json";
    var count = 0;

    fs.readFile(path, (err, users) => {

        users = JSON.parse(users);
        if (err) {

            console.log("Database error!");
        } else {

            for (var i = 0; i < users.length; i++) {
                ++count;
                if (email === users[i].email) {
                    if (pass === users[i].pass) {
                        res.setHeader('Set-Cookie', ["loggedIn=true;", "user=" + users[i].email, "cart=0"]);
                        return res.redirect(referer);
                    } else {
                        return res.send("Wrong password!");
                    }
                }
            }
            if (count === users.length); {
                return res.send("Account with this user id does not exist!");
            }
        }
    });
}

module.exports = {
    loginPageHandler,
    authUser
}