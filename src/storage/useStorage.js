import { useMemo, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useFirebase } from "../context/useFirebase";

const useStorage = (path) => {
    const { storage } = useFirebase();
    const [progress, setProgress] = useState({});
    const [isBusy, setBusy] = useState(false);
    const [error, setError] = useState({});

    const storageRef = useMemo(() => ref(storage, path), [storage, path]);

    const errorHandle = (error) => {
        setError(error);
        setProgress({});
        setBusy(false);

        if (error.customData?.serverResponse) {
            error.customData = JSON.parse(error.customData?.serverResponse);
        }
    };

    const upload = (filename, buffer, metadata = null) => {
        setBusy(true);
        setError({});

        const fileRef = ref(storageRef, filename);
        const uploadTask = uploadBytesResumable(fileRef, buffer, metadata);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress({
                    bytesTransferred: snapshot.bytesTransferred,
                    totalBytes: snapshot.totalBytes,
                    progress: progress,
                    state: snapshot.state,
                    file: {},
                    url: "",
                });
            },
            errorHandle,
            () => {
                setError({});
                setBusy(false);

                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setProgress((result) => ({
                        ...result,
                        progress: 100,
                        state: uploadTask.snapshot.state,
                        file: uploadTask.snapshot.metadata,
                        url,
                    }));
                });
            }
        );
    };

    const folder = {
        fullPath: storageRef.fullPath,
        name: storageRef.name,
        bucket: storageRef.bucket,
    };

    const actions = {
        uploadFile: (filename, buffer, metadata = null) =>
            upload(filename, buffer, metadata),
        uploadByteArrray: (filename, buffer = [], metadata = null) =>
            upload(filename, new Uint8Array(buffer), metadata),
    };

    return { folder, progress, isBusy, error, actions };
};

export { useStorage };
