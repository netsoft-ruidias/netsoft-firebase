export interface IDocumentOptions {
    snapshot?: boolean
}

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
export function useDocument(path: string, docId: string, options?: IDocumentOptions): [object, object, boolean, object];
