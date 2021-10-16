export interface IAuthOptions {
    locale: string,
}

export interface IError {
    code: string,
    customData: object,
    name: string
}

export function useAuth(options: IAuthOptions): {
    user: object;
    error: IError;
    isBusy: boolean;
    locale: string;
    signInAnonymously: () => void;
    signInWithEmailAndPassword: (email: string, password: string) => void;
    signInWithGoogle: (scopes: Array<string>, options: IAuthOptions) => void;
    signInWithFacebook: (scopes: Array<string>, options: IAuthOptions) => void;
    signInWithTwitter: (scopes: Array<string>, options: IAuthOptions) => void;
    signInWithGithub: (scopes: Array<string>, options: IAuthOptions) => void;
    signInWithMicrosoft: (scopes: Array<string>, options: IAuthOptions) => void;
    signInWithApple: (scopes: Array<string>, options: IAuthOptions) => void;
    signInWithYahoo: (scopes: Array<string>, options: IAuthOptions) => void;
    signOut: () => void;
};