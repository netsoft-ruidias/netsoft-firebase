import { useCallback, useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    onSnapshot,
    getDocs,
} from "firebase/firestore";
import { useFirebase } from "../context/useFirebase";

/**
 * Fetch a collection of documents from firestore
 * @param {string} path the collection path
 * @param {boolean} snapshot [OPTIONAL] if true, listen to document changes
 * @param {Filter} filter [OPTIONAL] filter { field, operator, value }
 * @returns {data} the data fetched
 * @returns {err} the err object, if any
 * @returns {isBusy} the state
 * @example
 *  const [data, err, isBusy] = useCollection("/users");
 *  const [data, err, isBusy] = useCollection("/users", {snapshot: true});
 *  const [data, err, isBusy] = useCollection("/users", {snapshot: true, filter: ["Num", ">=", 2]});
 */
const useCollection = (path, { snapshot, filter } = {}) => {
    const { firestore } = useFirebase();

    const [data, setData] = useState(undefined);
    const [err, setErr] = useState(undefined);
    const [isBusy, setBusy] = useState(false);

    const createQuery = () => {
        let queryRef = collection(firestore, path);

        if (filter === undefined) {
            return queryRef;
        }

        if (filter && filter[0] instanceof Array) {
            filter.forEach((x) => {
                queryRef = query(queryRef, where(x[0], x[1], x[2]));
            });
            return queryRef;
        }

        return query(queryRef, where(filter[0], filter[1], filter[2]));
    };

    const fetchSnapshot = useCallback((query, signal) => {
        return onSnapshot(
            query,
            (res) => {
                if (!signal.aborted) {
                    setData(
                        res.docs.map((doc) => {
                            return {
                                ...doc.data(),
                                id: doc.id,
                            };
                        })
                    );

                    setErr(null);
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
    }, []);

    const fetchDocs = useCallback(async (query, signal) => {
        try {
            const snapshot = await getDocs(query);

            if (!signal.aborted) {
                setData(
                    snapshot.docs.map((doc) => {
                        return {
                            ...doc.data(),
                            id: doc.id,
                        };
                    })
                );
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
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let unsubscribe = undefined;

        const fetchData = async () => {
            setBusy(true);

            const queryRef = createQuery();

            if (snapshot || false) {
                unsubscribe = fetchSnapshot(queryRef, signal);
            } else {
                await fetchDocs(queryRef, signal);
            }
        };
        fetchData();

        return () => {
            abortController.abort();
            if (unsubscribe !== undefined) {
                unsubscribe();
            }
        };
    }, []);

    return [data, isBusy, err];
};

export { useCollection };
