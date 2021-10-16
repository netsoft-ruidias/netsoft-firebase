import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../context/useFirebase";

/**
 * Fetch a single document from firestore
 * @param {string} path the document path
 * @param {string} docId the document unique Id
 * @param {IDocumentOptions} options [OPTIONAL]
 * @returns {data} the data fetched
 * @returns {err} the err object, if any
 * @returns {isBusy} the state
 * @returns {actions} the 'update()' action
 * @example
 *  const [data, err, isBusy] = useDocument("/users", "Xyz");
 *  const [data, err, isBusy] = useDocument("/users", "Xyz", {snapshot: true});
 */
const useDocument = (path, docId, { snapshot } = {}) => {
    const { firestore } = useFirebase();

    const [data, setData] = useState({});
    const [err, setErr] = useState(undefined);
    const [isBusy, setBusy] = useState(false);

    const fetchSnapshot = useCallback(
        (signal) => {
            console.log("useDocument", "useCallback", "fetchSnapshot");
            return onSnapshot(
                doc(firestore, path, docId),
                (res) => {
                    if (!signal.aborted) {
                        setData({ ...res.data(), id: res.id });
                        setErr(undefined);
                        setBusy(false);
                    }
                },
                (err) => {
                    if (!signal.aborted) {
                        setData(undefined);
                        setErr(err);
                    }
                }
            );
        },
        [path, docId, firestore]
    );

    const fetchDoc = useCallback(
        async (signal) => {
            console.log("useDocument", "useCallback", "fetchDoc");
            try {
                const res = await getDoc(doc(firestore, path, docId));

                if (!signal.aborted) {
                    setData({ ...res.data(), id: res.id });
                    setErr(null);
                }
            } catch (err) {
                if (!signal.aborted) {
                    setData(undefined);
                    setErr(err);
                }
            } finally {
                if (!signal.aborted) {
                    setBusy(false);
                }
            }
        },
        [path, docId, firestore]
    );

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let unsubscribe = undefined;

        const fetchData = async () => {
            setBusy(true);

            if (snapshot || false) {
                unsubscribe = fetchSnapshot(signal);
            } else {
                await fetchDoc(signal);
            }
        };
        fetchData();

        return () => {
            abortController.abort();
            if (unsubscribe !== undefined) {
                unsubscribe();
            }
        };
    }, [snapshot, fetchSnapshot, fetchDoc]);

    const update = async (data) => {
        console.log("useDocument", "update", data);
        const ref = doc(firestore, path, docId);
        await updateDoc(ref, data);
    };

    return [data, isBusy, err, { update }];
};

export { useDocument };
