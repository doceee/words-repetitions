export interface ILoggedUser {
    id: string;
    email: string;
    consecutiveActivity: number;
    reviewedWords: number;
    reviewsDone: number;
    createdAt: string;
    updatedAt: string;
}

export type ILoginData = {
    email: string;
    password: string;
};

export type IRegisterData = ILoginData & { passwordRepeat: string };

export interface IAuthState {
    loggedUser: ILoggedUser | null;
}

export interface ServerError {
    param: string;
    msg: string;
}
