/*
유저 인증 관련 Context
 */

import React, {createContext, useContext, useReducer} from "react";
import { User } from "../types/user";

//인증 관련 interface 선언
interface State {
  authenticated: boolean;
  user: User | undefined;
  loading: boolean;
}

//로그인 Action (context dispatch 에 사용)
export enum LOGIN_ACTION {
  "LOGIN",
  "LOGOUT",
  "STOP_LOADING",
}

//context 생성자
const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: true,
});

const DispatchContext = createContext<any>(null);

interface Action {
  type: LOGIN_ACTION;
  payload: any;
}

//실제 동작할 함수(?)
const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case LOGIN_ACTION.LOGIN:
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case LOGIN_ACTION.LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case LOGIN_ACTION.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error("Unknown Action Type");
  }
};

//_app.tsx 에서 context화(?) 하여 사용 가능 하도록 할 provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });
  console.log('state',state);
  const dispatch = (type: LOGIN_ACTION, payload?: any) => {
    defaultDispatch({ type, payload });
  };
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};


//실질적으로 component, page 에서 사용 할
export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
