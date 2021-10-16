import React, { useMemo } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
    initializeAuth,
    browserLocalPersistence,
    browserPopupRedirectResolver,
    browserSessionPersistence,
    indexedDBLocalPersistence,
} from "firebase/auth";
import { FirebaseContext } from "./context";

const FirebaseProvider = ({ config, children }) => {
    const firebaseApp = useMemo(() => {
        console.log("FirebaseProvider", "useMemo()", "firebaseApp");
        return initializeApp(config);
    }, [config]);

    const firestore = useMemo(() => {
        console.log("FirebaseProvider", "useMemo()", "firestore");
        return getFirestore(firebaseApp);
    }, [firebaseApp]);

    const storage = useMemo(() => {
        console.log("FirebaseProvider", "useMemo()", "storage");
        return getStorage(firebaseApp);
    }, [firebaseApp]);

    const auth = useMemo(() => {
        console.log("FirebaseProvider", "useMemo()", "auth");
        return initializeAuth(firebaseApp, {
            persistence: [
                indexedDBLocalPersistence,
                browserLocalPersistence,
                browserSessionPersistence,
            ],
            popupRedirectResolver: browserPopupRedirectResolver,
        });
    }, [firebaseApp]);

    return (
        <FirebaseContext.Provider value={{ firestore, storage, auth }}>
            {children}
        </FirebaseContext.Provider>
    );
};

FirebaseProvider.context = FirebaseContext;

export { FirebaseProvider };
