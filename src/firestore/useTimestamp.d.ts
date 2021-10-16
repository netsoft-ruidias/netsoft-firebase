export function useTimestamp(): {
    Timestamp: typeof Timestamp;
    serverTimestamp: typeof serverTimestamp;
};
import { Timestamp } from "@firebase/firestore";
import { serverTimestamp } from "@firebase/firestore";
