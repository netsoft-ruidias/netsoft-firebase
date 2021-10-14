interface ICollectionOptions {
    snapshot: boolean,
    filter: Array<string>|Array<Array<string>>
}

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
export function useCollection(path: string, options?: ICollectionOptions): [Array<object>, object, boolean];
