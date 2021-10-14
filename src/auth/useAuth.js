import { useEffect, useState } from "react";
import {
    signInAnonymously,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    getRedirectResult,
} from "firebase/auth";
import { useFirebase } from "../context/useFirebase";
import { useSignInWithProvider } from "./useSignInWithProvider";

const useAuth = (options) => {
    const { auth } = useFirebase();
    const [isBusy, setBusy] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState({});

    const [signIn] = useSignInWithProvider(() => {
        setError(error);
        setUser(auth.currentUser ?? {});
        setBusy(false);
    });

    const errorHandle = (error) => {
        setError(error);
        setUser(auth.currentUser ?? {});
        setBusy(false);
    };

    useEffect(() => {
        if (options?.locale) {
            auth.languageCode = options.locale;
        } else {
            auth.useDeviceLanguage();
        }
    }, [auth, options]);

    useEffect(() => {
        getRedirectResult(auth).catch((error) => setError(error));
    }, [auth]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setError({});
            setUser(user ?? {});
            setBusy(false);
        });

        return () => {
            unsubscribe();
        };
    }, [auth]);

    return {
        user,
        error,
        isBusy,
        locale: auth.languageCode,
        signInAnonymously: () => {
            setBusy(true);
            signInAnonymously(auth).catch((error) => errorHandle(error));
        },
        signInWithEmailAndPassword: (email, password) => {
            setBusy(true);
            signInWithEmailAndPassword(auth, email, password).catch((error) =>
                errorHandle(error)
            );
        },

        signInWithGoogle: (scopes, options) => {
            setBusy(true);
            const customParameters = {
                login_hint: options?.login_hint,
            };
            signIn("google", customParameters, scopes, options?.popup);
        },
        signInWithFacebook: (scopes, options) => {
            setBusy(true);
            const customParameters = {
                display: options?.popup ? "popup" : null,
            };
            signIn("facebook", customParameters, scopes, options?.popup);
        },
        signInWithTwitter: (scopes, options) => {
            setBusy(true);
            const customParameters = {
                lang: auth.languageCode,
            };
            signIn("twitter", customParameters, scopes, options?.popup);
        },
        signInWithGithub: (scopes, options) => {
            setBusy(true);
            const customParameters = {
                allow_signup: options?.allow_signup ? "true" : "false",
            };
            signIn("github", customParameters, scopes, options?.popup);
        },
        signInWithMicrosoft: (scopes, options) => {
            setBusy(true);
            const customParameters = {
                login_hint: options?.login_hint,
                tenant: options?.tenantId,
            };
            signIn("microsoft", customParameters, scopes, options?.popup);
        },
        signInWithApple: (scopes, options) => {
            setBusy(true);
            const customParameters = {
                locale: auth.languageCode,
            };
            signIn("apple", customParameters, scopes, options?.popup);
        },
        signInWithYahoo: (scopes, options) => {
            setBusy(true);
            const customParameters = {
                language: auth.languageCode,
            };
            signIn("yahoo", customParameters, scopes, options?.popup);
        },

        signOut: () => {
            setBusy(true);
            signOut(auth)
                .then(() => setBusy(false))
                .catch((error) => {
                    errorHandle(error);
                });
        },
    };
};
export { useAuth };
