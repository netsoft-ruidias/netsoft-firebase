import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../context/useFirebase";

/**
 * Fetch a single document from firestore
 * @param {string} path the document path
 * @param {string} docId the document unique Id
 * @param {IDocumentOptions} options [OPTIONAL]
 * @returns {data} the data fetched
 * @returns {err} the err object, if any
 * @returns {isBusy} the state
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

    return [data, isBusy, err];
};

export { useDocument };
