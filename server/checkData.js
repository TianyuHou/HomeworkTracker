const user = ["email", "password"];
const info = [
  "identity",
  "email",
  "firstName",
  "lastName",
  "birth",
  "gender",
  "phone",
  "address",
  "state",
  "zip",
  "organization",
  "imgName"
];
const note = ["title", "des", "time"];
const lecture = ["uid", "title", "des", "src", "time"];
const updatelecture = ["title", "des", "src", "time"];
const transaction = [
  "requestTime",
  "requestUser",
  "requestUid",
  "requestAvatar",
  "requestAmount",
  "des",
  "payAmount",
  "payUser",
  "payUid",
  "payTime",
  "payAvatar",
  "complete"
];
const addTransaction = [
  "requestTime",
  "requestUser",
  "requestUid",
  "requestAvatar",
  "requestAmount",
  "des",
  "complete"
];
const updateTransaction = [
  "payAmount",
  "payUser",
  "payUid",
  "payTime",
  "payAvatar",
  "complete"
];

const checkObject = obj => {
  return typeof obj !== "object";
};

const checkKeys = (obj, len) => {
  return Object.keys(obj).length !== len;
};

const checkKeyName = (obj, arr) => {
  if (checkKeys(obj, arr.length)) {
    return true;
  } else {
    const keyArr = Object.keys(obj);
    for (let i of keyArr) {
      if (arr.indexOf(i) === -1) {
        return true;
      }
    }
    return false;
  }
};

const checkEmpty = obj => {
  const keyArr = Object.keys(obj);
  for (let i of keyArr) {
    if (checkObject(obj[i]) && obj[i].length === 0) {
      return true;
    } else if (!checkObject(obj[i])) {
      return checkEmpty(obj[i]);
    }
  }
  return false;
};

const checkPwd = pwd => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (pattern.exec(pwd)) return false;
  return true;
};

const checkEmail = email => {
  const pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  if (pattern.exec(email)) return false;
  return true;
};

const checkUser = obj => {
  if (checkObject(obj)) return "auth/not-object";
  else if (checkKeyName(obj, user)) return "auth/invalid-keypair";
  else if (checkEmpty(obj)) return "auth/empty-field";
  else if (checkPwd(obj.password)) return "auth/weak-password";
  else if (checkEmail(obj.email)) return "auth/invalid-email";
  else return "";
};

const checkInfo = obj => {
  if (checkObject(obj)) return "auth/not-object";
  else if (checkKeyName(obj, info)) return "auth/invalid-keypair";
  else if (checkEmpty(obj)) return "auth/empty-field";
  else return "";
};

const checkNote = obj => {
  if (checkObject(obj)) return "auth/not-object";
  else if (checkKeyName(obj, note)) return "auth/invalid-keypair";
  else if (checkEmpty(obj)) return "auth/empty-field";
  else return "";
};

const checkLecture = obj => {
  if (checkObject(obj)) return "auth/not-object";
  else if (checkKeyName(obj, lecture)) return "auth/invalid-keypair";
  else if (checkEmpty(obj)) return "auth/empty-field";
  else if (obj.src.indexOf("https://www.youtube.com/") === -1)
    return "auth/invalid-youtube";
  else return "";
};

const checkUpdateLecture = obj => {
  if (checkObject(obj)) return "auth/not-object";
  else if (checkKeyName(obj, updatelecture)) return "auth/invalid-keypair";
  else if (checkEmpty(obj)) return "auth/empty-field";
  else if (obj.src.indexOf("https://www.youtube.com/") === -1)
    return "auth/invalid-youtube";
  else return "";
};

const checkAddTransactionEmpty = obj => {
  for (let i of addTransaction) {
    if (String(obj[i]).length === 0) return true;
  }
  return false;
};

const checkTransaction = obj => {
  if (checkObject(obj)) return "auth/not-object";
  else if (checkKeyName(obj, transaction)) return "auth/invalid-keypair";
  else if (checkAddTransactionEmpty(obj)) return "auth/empty-field";
  else if (Number(obj.requestAmount) <= 0) return "auth/invalid-money";
  else return "";
};

const checkUpdateTransaction = obj => {
  if (checkObject(obj)) return "auth/not-object";
  else if (checkKeyName(obj, updateTransaction)) return "auth/invalid-keypair";
  else if (checkEmpty(obj)) return "auth/empty-field";
  else if (Number(obj.requestAmount) <= 0) return "auth/invalid-money";
  else return "";
};

module.exports = {
  checkUser,
  checkInfo,
  checkNote,
  checkLecture,
  checkUpdateLecture,
  checkTransaction,
  checkUpdateTransaction
};
