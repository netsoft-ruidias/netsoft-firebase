export namespace providers {
    const google: GoogleAuthProvider;
    const facebook: FacebookAuthProvider;
    const twitter: TwitterAuthProvider;
    const github: GithubAuthProvider;
    const microsoft: OAuthProvider;
    const apple: OAuthProvider;
    const yahoo: OAuthProvider;
}
import { GoogleAuthProvider } from "@firebase/auth";
import { FacebookAuthProvider } from "@firebase/auth";
import { TwitterAuthProvider } from "@firebase/auth";
import { GithubAuthProvider } from "@firebase/auth";
import { OAuthProvider } from "@firebase/auth";
