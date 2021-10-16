import { Timestamp, serverTimestamp } from "firebase/firestore";

const useTimestamp = () => {
    return {
        Timestamp,
        serverTimestamp,
    };
};

export { useTimestamp };
