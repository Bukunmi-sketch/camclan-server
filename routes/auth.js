// module.exports = function ({ app, dbConn }) {
//   app.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     if (email && password) {
//       const sql = "SELECT * FROM user_account WHERE user_email = ? AND user_password = ?";
//       dbConn.query(sql, [email, password], function (error, response) {
//         if (response && response.length !== 0) {
//           res.status(200).jsonp({ ...response[0] });
//         } else {
//           res.status(200).jsonp({ message: "Your username or password is not correct" });
//         }
//       });
//     } else {
//       res.status(200).jsonp({ message: "Your username or password is not correct" });
//     }
//   });
// };

module.exports = function ({ app, dbConn }) {
  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const sql = "SELECT * FROM user_account WHERE user_email = ? AND user_password = ?";
      dbConn.query(sql, [email, password], function (error, response) {
        if (error) {
          console.error("Error in login query:", error); // Log any errors
          res.status(500).jsonp({ message: "Internal server error" });
        } else if (response && response.length !== 0) {
          res.status(200).jsonp({ success: true, data: response[0] }); // Set success to true
        } else {
          res.status(401).jsonp({ success: false, message: "Your username or password is not correct" }); // 401 for unauthorized
        }
      });
    } else {
      res.status(400).jsonp({ success: false, message: "Please provide both email and password" }); // 400 for bad request
    }
  });
};
