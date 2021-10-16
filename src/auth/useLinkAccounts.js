import { useState } from "react";
import {
    linkWithPopup,
    linkWithRedirect,
    linkWithCredential,
    EmailAuthProvider,
    unlink,
} from "firebase/auth";
import { useFirebase } from "../context/useFirebase";
import { providers } from "./providers";

const useLinkAccounts = () => {
    const { auth } = useFirebase();

    const [isBusy, setBusy] = useState(false);
    const [error, setError] = useState({});

    const linkWithProvider = (provider, popup) => {
        setBusy(true);
        setError({});
        if (popup) {
            linkWithPopup(auth.currentUser, provider)
                .then(() => setBusy(false))
                .catch((error) => {
                    setBusy(false);
                    setError(error);
                });
        } else {
            linkWithRedirect(auth.currentUser, provider)
                .then(() => setBusy(false))
                .catch((error) => {
                    setBusy(false);
                    setError(error);
                });
        }
    };

    return {
        isBusy,
        error,

        linkWithCredential: (email, password) => {
            setBusy(true);
            setError({});
            const credential = EmailAuthProvider.credential(email, password);
            linkWithCredential(auth.currentUser, credential)
                .then(() => setBusy(false))
                .catch((error) => {
                    setBusy(false);
                    setError(error);
                });
        },

        linkWithGoogle: (options = { popup: false }) => {
            const provider = providers["google"];
            linkWithProvider(provider, options?.popup ?? false);
        },
        linkWithFacebook: (options = { popup: false }) => {
            const provider = providers["facebook"];
            linkWithProvider(provider, options?.popup ?? false);
        },
        linkWithTwitter: (options = { popup: false }) => {
            const provider = providers["twitter"];
            linkWithProvider(provider, options?.popup ?? false);
        },
        linkWithGitHub: (options = { popup: false }) => {
            const provider = providers["github"];
            linkWithProvider(provider, options?.popup ?? false);
        },

        unlink: (providerId) => {
            setBusy(true);
            setError({});
            unlink(auth.currentUser, providerId)
                .then(() => setBusy(false))
                .catch((error) => {
                    setBusy(false);
                    setError(error);
                });
        },
    };
};

export { useLinkAccounts };
