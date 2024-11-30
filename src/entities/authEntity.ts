export interface IUserData {
    id: string;
    name: string;
    email: string;
}

export interface IAuthState {
  userData: IUserData | null;
  loading: boolean;
  error: string | null;
}