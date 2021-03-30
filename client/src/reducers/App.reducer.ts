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
      console.log("reducer initial");
      return initialState;
    case "loading":
      console.log("reducer loading");
      return { ...initialState, loading: true };
    case "error":
      console.log("reducer error");
      return { ...initialState, loading: false, error: true };
    case "success":
      console.log("reducer success");
      console.log("action", action);
      return { ...state, loading: false, gists: action.gists, userName: action.userName };
  }
};
