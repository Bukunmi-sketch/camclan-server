module.exports = function ({ app, dbConn }) {
  app.get("/meetings/:id", (req, res) => {
    const id = req.params.id;
    const findMeetingsSql = "SELECT * FROM meeting WHERE created_by = ?";
    dbConn.query(findMeetingsSql, [id], function (error, meetings) {
      res.status(200).jsonp(meetings);
    });
  });

  app.get("/meetings/:id/get", (req, res) => {
    const id = req.params.id;
    const findMeetingSql = "SELECT * FROM meeting WHERE meeting_uid = ?";
    dbConn.query(findMeetingSql, [id], function (error, meeting) {
      res.status(200).jsonp(meeting);
    });
  });

  app.post("/meetings", (req, res) => {
    const { meeting_name, uid, date, time } = req.body;
    if (!meeting_name || !uid) {
      return res.status(200).json({ message: "Please provide the meeting name and meeting uid" });
    }

    const findAccountByMeetingId = "SELECT * FROM meeting WHERE meeting_uid = ?";
    dbConn.query(findAccountByMeetingId, [uid], function (error, account) {
      if (account && account.length !== 0) {
        res.status(200).json({ message: 'The room id already existed in the system' });
      }else{
        const meetings = [[meeting_name, uid, date, time ]];
        const createMeetingSql = "INSERT INTO meeting (meeting_title, meeting_uid, date, time ) VALUES ?";
        dbConn.query(createMeetingSql, [meetings], function (error, insertedMeeting) {
          if (insertedMeeting) {
            res.status(200).json({ insertId: insertedMeeting.insertId });
          } else {
            console.log(error);
            res.status(200).json({ message: 'Cannot create your meeting, please try again' });
          }
        });
      }
    });

   
  });
  

//   app.post("/meetings", (req, res) => {
//     const { meeting_name, uid,date,time, createdBy } = req.body;
//     if (!meeting_name || !uid) {
//       return res.status(200).jsonp({ message: "Please provide the meeting name and meeting uid" });
//     }
//     const meetings = [[meeting_name, uid,date,time,createdBy]];
//     const createMeetingSql = "INSERT INTO meeting (meeting_title, meeting_uid, date,time,created_by) VALUES ?";
//     dbConn.query(createMeetingSql, [meetings], function (error, insertedMeeting) {
//       if (insertedMeeting) {
//         res.status(200).jsonp({ insertId: insertedMeeting.insertId });
//       } else {
//         console.log(error);
//         res.status(200).jsonp({ message: 'Cannot create your meeting, please try again' });
//       }
//     });
//   });
 }