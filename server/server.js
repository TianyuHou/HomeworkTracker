const { checkUser } = require("./checkData");
const { checkInfo } = require("./checkData");
const { checkNote } = require("./checkData");
const { checkLecture } = require("./checkData");
const { checkUpdateLecture } = require("./checkData");
const { checkTransaction } = require("./checkData");
const { checkUpdateTransaction } = require("./checkData");

const firebase = require("../src/firebase/firebase").firebase;
const database = require("../src/firebase/firebase").database;

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;
const upload = multer();

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

/***************************User Identity Router*************************/

app.get("/:uid/getProfile", (req, res) => {
  const uid = req.params.uid;
  if (uid) {
    database
      .ref(`users/${uid}`)
      .once("value")
      .then(info => {
        res.json(info.val());
      })
      .catch(err => {
        res.json("auth/database-error");
      });
  } else {
    res.json("auth/no-uid");
  }
});

app.put("/:uid/updateProfile", (req, res) => {
  const uid = req.params.uid;
  const info = req.body.info;
  const msg = checkInfo(info);
  if (uid) {
    if (!msg) {
      database
        .ref(`users/${uid}`)
        .set({
          info
        })
        .then(() => res.json(""))
        .catch(err => {
          res.json("auth/database-error");
        });
    } else {
      res.json(msg);
    }
  } else {
    res.json("auth/no-uid");
  }
});

app.post("/startregister", (req, res) => {
  const user = req.body.user;
  const info = req.body.info;
  const usermsg = checkUser(user);
  const infomsg = checkInfo(info);
  if (usermsg) {
    res.json(usermsg);
  } else if (infomsg) {
    res.json(infomsg);
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        database.ref(`users/${data.uid}`).set({
          info
        });
        res.json(data.uid);
      })
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        res.json(errorCode);
      });
  }
});

/***************************User Note Router*************************/
app.get("/:uid/getNote", (req, res) => {
  const uid = req.params.uid;
  if (uid) {
    database
      .ref(`users/${uid}/note`)
      .once("value")
      .then(snapshot => {
        const notes = [];

        snapshot.forEach(childSnapshot => {
          notes.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        res.send(notes);
      })
      .catch(err => {
        res.json("auth/database-error");
      });
  } else {
    res.json("auth/no-uid");
  }
});

app.post("/:uid/addNote", (req, res) => {
  const uid = req.params.uid;
  const note = req.body.note;
  const msg = checkNote(note);
  if (uid) {
    if (!msg) {
      database
        .ref(`users/${uid}/note`)
        .push({
          note
        })
        .then(ref => {
          res.json(ref.key);
        })
        .catch(err => {
          res.json("auth/database-error");
        });
    } else {
      res.json(msg);
    }
  } else {
    res.json("auth/no-uid");
  }
});

app.put("/:uid/:noteId/EditNote", (req, res) => {
  const uid = req.params.uid;
  const id = req.params.noteId;
  const note = req.body.note;
  const msg = checkNote(note);
  if (uid) {
    if (id) {
      if (!msg) {
        database
          .ref(`users/${uid}/note/${id}`)
          .update({ note })
          .then(() => res.json(""))
          .catch(err => {
            res.json("auth/database-error");
          });
      } else {
        res.json(msg);
      }
    } else {
      res.json("auth/no-id");
    }
  } else {
    res.json("auth/no-uid");
  }
});

app.delete("/:uid/:noteId/deleteNote", (req, res) => {
  const uid = req.params.uid;
  const id = req.params.noteId;
  if (uid) {
    if (id) {
      database
        .ref(`users/${uid}/note/${id}`)
        .remove()
        .then(() => res.json(""))
        .catch(err => {
          res.json("auth/database-error");
        });
    } else {
      res.json("auth/no-id");
    }
  } else {
    res.json("auth/no-uid");
  }
});

/***************************Lecture Router*************************/
app.get("/getAllLecture", (req, res) => {
  database
    .ref(`lectures/`)
    .once("value")
    .then(snapshot => {
      const lectures = [];
      snapshot.forEach(childSnapshot => {
        childSnapshot.forEach(lecture => {
          lectures.push({
            id: lecture.key,
            ...lecture.val()
          });
        });
      });

      res.send(lectures);
    })
    .catch(err => {
      res.json("auth/database-error");
    });
});

app.post("/:uid/addLecture", (req, res) => {
  const uid = req.params.uid;
  const lecture = req.body.lecture;
  const msg = checkLecture(lecture);
  if (uid) {
    if (!msg) {
      database
        .ref(`lectures/${uid}`)
        .push({
          lecture
        })
        .then(ref => {
          res.json(ref.key);
        })
        .catch(err => {
          res.json("auth/database-error");
        });
    } else {
      res.json(msg);
    }
  } else {
    res.json("auth/no-uid");
  }
});

app.put("/:uid/:lectureId/editLecture", (req, res) => {
  const uid = req.params.uid;
  const id = req.params.lectureId;
  const lecture = req.body.lecture;
  const msg = checkUpdateLecture(lecture);
  if (uid) {
    if (id) {
      if (!msg) {
        database
          .ref(`lectures/${uid}/${id}/lecture`)
          .update({ ...lecture })
          .then(() => res.json(""))
          .catch(err => {
            res.json("auth/database-error");
          });
        res.status(200);
      } else {
        res.json(msg);
      }
    } else {
      res.json("auth/no-id");
    }
  } else {
    res.json("auth/no-uid");
  }
});

app.delete("/:uid/:lectureId/deleteLecture", (req, res) => {
  const uid = req.params.uid;
  const id = req.params.lectureId;
  if (uid) {
    if (id) {
      database
        .ref(`lectures/${uid}/${id}`)
        .remove()
        .then(() => res.json(""))
        .catch(err => {
          res.json("auth/database-error");
        });
      res.status(200);
    } else {
      res.json("auth/no-id");
    }
  } else {
    res.json("auth/no-uid");
  }
});

/***************************Comment Router*************************/
app.get("/:uid/:lectureId/getAllComment", (req, res) => {
  const uid = req.params.uid;
  const lectureId = req.params.lectureId;
  if (uid) {
    if (lectureId) {
      database
        .ref(`lectures/${uid}/${lectureId}/comment`)
        .once("value")
        .then(snapshot => {
          const comments = [];

          snapshot.forEach(childSnapshot => {
            comments.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });

          res.send(comments);
        })
        .catch(err => {
          res.json("auth/database-error");
        });
    } else {
      res.json("auth/no-id");
    }
  } else {
    res.json("auth/no-uid");
  }
});

app.post("/:uid/:lectureId/addComment", (req, res) => {
  const uid = req.params.uid;
  const lectureId = req.params.lectureId;
  const comment = req.body.comment;
  if (uid) {
    if (lectureId) {
      database
        .ref(`lectures/${uid}/${lectureId}/comment`)
        .push({
          comment
        })
        .then(ref => {
          res.json(ref.key);
        })
        .catch(err => {
          res.json("auth/database-error");
        });
    } else {
      res.json("auth/no-id");
    }
  } else {
    res.json("auth/no-uid");
  }
});

app.delete("/:uid/:lectureId/:commentId/deleteComment", (req, res) => {
  const uid = req.params.uid;
  const lectureId = req.params.lectureId;
  const id = req.params.commentId;
  if (uid) {
    if (lectureId && id) {
      database
        .ref(`lectures/${uid}/${lectureId}/comment/${id}`)
        .remove()
        .then(() => {
          res.json("");
        })
        .catch(err => {
          res.json("auth/database-error");
        });
    } else {
      res.json("auth/no-id");
    }
  } else {
    res.json("auth/no-uid");
  }
});

/***************************Finance Router*************************/
app.get("/getAllTransactions", (req, res) => {
  database
    .ref(`transactions/`)
    .once("value")
    .then(snapshot => {
      const transactions = [];
      snapshot.forEach(childSnapshot => {
        childSnapshot.forEach(transaction => {
          transactions.push({
            id: transaction.key,
            ...transaction.val()
          });
        });
      });
      res.send(transactions);
    })
    .then(() => res.json(""))
    .catch(err => {
      res.json("auth/database-error");
    });
});

app.get("/:uid/getMyTransaction", (req, res) => {
  const uid = req.params.uid;
  if (uid) {
    database
      .ref(`transactions/${uid}`)
      .once("value")
      .then(snapshot => {
        const transactions = [];

        snapshot.forEach(childSnapshot => {
          transactions.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        res.send(transactions);
      })
      .catch(err => {
        res.json("auth/database-error");
      });
  } else {
    res.json("auth/no-uid");
  }
});

app.post("/:uid/addTransaction", (req, res) => {
  const uid = req.params.uid;
  const transaction = req.body.transaction;
  const msg = checkTransaction(transaction);
  if (uid) {
    if (!msg) {
      database
        .ref(`transactions/${uid}`)
        .push({
          transaction
        })
        .then(ref => {
          res.json(ref.key);
        })
        .catch(err => {
          res.json("auth/database-error");
        });
    } else {
      res.json(msg);
    }
  } else {
    res.json("auth/no-uid");
  }
});

app.put("/:uid/:transactionId/editTransaction", (req, res) => {
  const uid = req.params.uid;
  const transactionId = req.params.transactionId;
  const transaction = req.body.transaction;
  const msg = checkUpdateTransaction(transaction);
  if (uid) {
    if (transactionId) {
      if (!msg) {
        database
          .ref(`transactions/${uid}/${transactionId}/transaction`)
          .update({ ...transaction })
          .then(() => res.json(""))
          .catch(err => {
            res.json("auth/database-error");
          });
      } else {
        res.json(msg);
      }
    } else {
      res.json("auth/no-id");
    }
  } else {
    res.json("auth/no-uid");
  }
});

app.delete("/:uid/:transactionId/deleteTransaction", (req, res) => {
  const uid = req.params.uid;
  const transactionId = req.params.transactionId;
  if (uid) {
    if (transactionId) {
      database
        .ref(`transactions/${uid}/${transactionId}`)
        .remove()
        .then(() => res.json(""))
        .catch(err => {
          res.json("auth/database-error");
        });
      res.status(200);
    } else {
      res.json("auth/no-id");
    }
  } else {
    res.json("auth/no-uid");
  }
});

/***************************Main Router*************************/
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up!");
});
