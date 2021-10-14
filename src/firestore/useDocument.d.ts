interface IDocumentOptions {
    snapshot: boolean,
    filter: Array<string>|Array<Array<string>>
}

interface IDocumentResult {
    data: object,
    err: object,
    isBusy: boolean
}

export function useDocument(path: string, docId: string, snapshot?: boolean): [object, object, boolean];
