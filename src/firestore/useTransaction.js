import { useMemo } from "react";
import { collection, doc, writeBatch } from "firebase/firestore";
import { useFirebase } from "../context/context";

const useTransaction = () => {
    const { firestore } = useFirebase();

    const batch = useMemo(() => {
        return writeBatch(firestore);
    }, [firestore]);

    const add = (path, data, id = null) => {
        if (id) {
            const ref = doc(firestore, path, id);
            batch.set(ref, data);
        } else {
            const ref = collection(firestore, path);
            batch.add(ref, data);
        }
    };

    const update = (path, data, id) => {
        const ref = doc(firestore, path, id);
        batch.update(ref, data);
    };

    const remove = (path, id) => {
        const ref = doc(firestore, path, id);
        batch.delete(ref);
    };

    const run = async () => {
        try {
            await batch.commit();
            return { success: true };
        } catch (err) {
            return err;
        }
    };

    return { add, update, remove, run };
};

export { useTransaction };
