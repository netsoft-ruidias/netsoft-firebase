import { useContext } from "react";
import { FirebaseContext } from "./context";

const useFirebase = () => useContext(FirebaseContext);

export { useFirebase };
