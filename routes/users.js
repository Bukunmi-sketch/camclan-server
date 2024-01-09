module.exports = function ({ app, dbConn }) {
  app.post("/users/create", (req, res, next) => {
    const {  email,  fullname ,password } = req.body;
    if (email && fullname &&  password) {
      const findAccountByEmail = "SELECT * FROM user_account WHERE user_email = ?";
      dbConn.query(findAccountByEmail, [email], function (error, account) {
        if (account && account.length !== 0) {
          res.status(200).json({ message: 'The email existed in the system' });
        } else {
          const users = [[ email, password, fullname]];
          const registerUserSql = "INSERT INTO user_account ( user_email, user_password, user_full_name) VALUES ?";
          dbConn.query(registerUserSql, [users], function (error, insertedUser) {
            if (insertedUser) {
              res.status(200).json({ email, fullname });
            } else {
              res.status(200).json({ message: 'Cannot create your account, please try again' });
            }
          });
        }
      });
    } else {
      return res.status(200).json({ message: "Please input required fields" });
    }
  });
}