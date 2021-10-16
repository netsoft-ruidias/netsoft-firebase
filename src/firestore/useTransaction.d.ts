export function useTransaction(): {
    add: (path: string, data: any, id?: any) => void;
    update: (path: string, data: any, id: any) => void;
    remove: (path: string, id: any) => void;
    run: () => Promise<object>;
};
