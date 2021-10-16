import { useFirebase } from "../context/useFirebase";
import { userMapper } from "./userMapper";

const useCurrentUser = () => {
    const { auth } = useFirebase();

    return { ...userMapper.Map(auth.currentUser) };
};

export { useCurrentUser };
