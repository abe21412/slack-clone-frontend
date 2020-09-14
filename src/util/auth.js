import { Auth } from "aws-amplify";

export const signInWithGoogle = () => {
  try {
    Auth.federatedSignIn({ provider: "Google" });
  } catch (err) {
    console.log(err);
  }
};

export const signIn = () => {
  try {
    Auth.federatedSignIn();
  } catch (err) {
    console.log(err);
  }
};

export const signOut = () => {
  Auth.signOut();
};

export const getCurrentAuthenticatedUser = async () => {
  try {
    const currentSession = await Auth.currentSession();
    const payload = currentSession.getIdToken().payload
    const {
      email,
      name: displayName,
      family_name: lastName,
      given_name: firstName,
    } = payload;
    console.log(currentSession.getIdToken().payload);
    const user = { id: payload["cognito:username"], email, displayName, lastName, firstName };
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};
