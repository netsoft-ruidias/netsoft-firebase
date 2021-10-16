export interface ICollectionOptions {
    snapshot?: boolean,
    filter?: Array<string>|Array<Array<string>>
}

/**
 * Fetch a collection of documents from firestore
 * @param {string} path the collection path
 * @param {ICollectionOptions} options [OPTIONAL]
 * @returns {data} the data fetched
 * @returns {err} the err object, if any
 * @returns {isBusy} the state
 * @returns {actions} the 'add()' and 'remove()' actions
 * @example
 *  const [data, err, isBusy] = useCollection("/users");
 *  const [data, err, isBusy] = useCollection("/users", {snapshot: true});
 *  const [data, err, isBusy] = useCollection("/users", {snapshot: true, filter: ["Num", ">=", 2]});
 */
export function useCollection(path: string, options?: ICollectionOptions): [Array<object>, object, boolean, object];
