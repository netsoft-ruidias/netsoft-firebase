import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider,
    OAuthProvider,
} from "firebase/auth";

export const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
    twitter: new TwitterAuthProvider(),
    github: new GithubAuthProvider(),
    microsoft: new OAuthProvider("microsoft.com"),
    apple: new OAuthProvider("apple.com"),
    yahoo: new OAuthProvider("yahoo.com"),
};
