import { useEffect, useMemo, useState } from "react";
import {
    ref,
    getDownloadURL,
    getMetadata,
    deleteObject,
} from "firebase/storage";
import { useFirebase } from "../context/useFirebase";

const useStorageFile = (path, filename) => {
    const { storage } = useFirebase();
    const [fileInfo, setFileInfo] = useState({});
    const [isBusy, setBusy] = useState(false);
    const [error, setError] = useState({});
    const [refresh, setRefresh] = useState(true);

    const storageRef = useMemo(() => ref(storage, path), [storage, path]);
    const fileRef = useMemo(
        () => ref(storageRef, filename),
        [storageRef, filename]
    );

    useEffect(() => {
        getDownloadURL(fileRef)
            .then((url) => {
                setFileInfo((state) => ({
                    ...state,
                    url: url,
                }));
            })
            .catch(errorHandle);
    }, [storage, fileRef, refresh]);

    useEffect(() => {
        getMetadata(fileRef)
            .then((metadata) => {
                setFileInfo((state) => ({
                    ...state,
                    ...metadata,
                }));
            })
            .catch(errorHandle);
    }, [storage, fileRef, refresh]);

    const errorHandle = (error) => {
        setError(error);
        setBusy(false);

        if (error.customData?.serverResponse) {
            error.customData = JSON.parse(error.customData?.serverResponse);
        }

        if (
            ["storage/object-not-found", "storage/unauthorized"].includes(
                error.code
            )
        ) {
            setFileInfo({});
        }
    };

    const file = {
        fullPath: storageRef.fullPath,
        name: storageRef.name,
        bucket: storageRef.bucket,
        ...fileInfo,
    };

    const actions = {
        download: (callback) => {
            setBusy(true);
            try {
                if (fileInfo && fileInfo.url) {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "blob";
                    xhr.onload = () => {
                        callback(xhr.response);
                    };
                    xhr.open("GET", fileInfo.url);
                    xhr.send();
                } else {
                    errorHandle({
                        code: "storage/object-not-found",
                        customData: {
                            url: fileInfo?.url,
                        },
                        name: "@netsoft/firebase",
                    });
                }
            } catch (error) {
                errorHandle(error);
            }
        },

        delete: () => {
            deleteObject(fileRef)
                .then(() => {
                    setError({});
                    setRefresh((state) => !state);
                })
                .catch(errorHandle);
        },

        refresh: () => {
            setError({});
            setRefresh((state) => !state);
        },
    };

    return { file, isBusy, error, actions };
};

export { useStorageFile };
