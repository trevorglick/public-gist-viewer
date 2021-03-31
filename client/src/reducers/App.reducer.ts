interface IAppState {
  gists: any[];
  error: boolean;
  loading: boolean;
  userName: string;
}

export type TAppReducerAction =
  | { type: "initial" }
  | { type: "loading" }
  | { type: "error" }
  | { type: "success"; gists: any[]; userName: string };

export const initialState: IAppState = {
  gists: [],
  error: false,
  loading: false,
  userName: ""
};

export const reducer = (state: IAppState, action: TAppReducerAction) => {
  switch (action.type) {
    case "initial":
      return initialState;
    case "loading":
      return { ...initialState, loading: true };
    case "error":
      return { ...initialState, loading: false, error: true };
    case "success":
      return { ...state, loading: false, gists: action.gists, userName: action.userName };
  }
};
