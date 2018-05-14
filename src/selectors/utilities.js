export const getWarn = res => {
  switch (res) {
    case "auth/email-already-in-use":
      return "There already exists an account with the given email address";
    case "auth/invalid-email":
      return "the email address is not valid";
    case "auth/operation-not-allowed":
      return "email/password accounts are not enabled";
    case "auth/weak-password":
      return "the password is not strong enough";
    case "auth/user-disabled":
      return "the user corresponding to the given email has been disabled!";
    case "auth/user-not-found":
      return "there is no user corresponding to the given email!";
    case "auth/wrong-password":
      return "Wrong Password, Please check your Password!";
    case "auth/no-uid":
      return "there is no user corresponding to this uid!";
    case "auth/no-id":
      return "there is no data corresponding to this id!";
    case "auth/not-object":
      return "Invalid Data Format, Please check your data!";
    case "auth/invalid-keypair":
      return "Invalid Key pairs, Please check your data!";
    case "auth/empty-field":
      return "Please fill all the input!";
    case "auth/invalid-youtube":
      return "Please provide a valid YouTube Link!";
    case "auth/invalid-money":
      return "Please provide a valid money amount!";
    case "auth/database-error":
      return "Oops, Something failed in the server, please tye again!";
    default:
      return "";
  }
};
