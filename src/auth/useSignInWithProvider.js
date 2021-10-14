import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useFirebase } from "../context/useFirebase";
import { providers } from "./providers";

const useSignInWithProvider = (erroHandler) => {
    const { auth } = useFirebase();

    const signIn = (providerName, customParameters, scopes, popup = false) => {
        const provider = providers[providerName];

        scopes?.forEach((scope) => provider.addScope(scope));

        if (customParameters) {
            provider.setCustomParameters(customParameters);
        }

        if (popup) {
            signInWithPopup(auth, provider).catch((error) =>
                erroHandler(error)
            );
        } else {
            signInWithRedirect(auth, provider).catch((error) =>
                erroHandler(error)
            );
        }
    };

    return [signIn];
};

export { useSignInWithProvider };
