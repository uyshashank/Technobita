const fs = require('fs');


const signupPageHandler = (req, res) => {
    res.render('userAccounts/signup');
}
const createUser = (req, res) => {
    const path = "./db/users.json";
    var count = 0;
    fs.readFile(path, (err, users) => {
        var newUserEmail = req.body.email;
        var users = JSON.parse(users);
        newUserIndex = users.length;

        for (var i = 0; i < users.length; i++) {
            ++count;
            if (users[i].email === newUserEmail) {
                return res.send("Account with this email id already exist!");
            } else {
                continue;
            }
        }
        if (count === users.length) {
            users.push({
                "fname": req.body.fname,
                "lname": req.body.lname,
                "email": req.body.email,
                "pass": req.body.pass,
                "mob": req.body.mob
            });

            users = JSON.stringify(users);

            fs.writeFile(path, users, (err) => {
                if (err)
                    throw err;
                else {
                    res.setHeader('Set-Cookie', ["loggedIn=true", "user=" + newUserEmail]);
                    res.redirect('/');
                }
            });
        }
    });
}

module.exports = {
    signupPageHandler,
    createUser
}