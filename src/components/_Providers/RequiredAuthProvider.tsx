import { Session, User } from "better-auth";
import {
  createContext,
  Match,
  ParentComponent,
  Switch,
  useContext,
} from "solid-js";
import { authClient } from "~/lib/auth-client";
import { LoginSignUp } from "../Session/LoginSignUp";

type SessionData = { user: User; session: Session };

const RequiredAuthContext = createContext<SessionData>();

export const RequiredAuthProvider: ParentComponent = (props) => {
  const session = authClient.useSession();

  return (
    <Switch>
      <Match when={session().isPending}>Loading...</Match>
      <Match when={!session().data}>
        <div class="w-screen h-screen flex flex-col justify-center items-center">
          <LoginSignUp classList={{ "w-42 h-30": true }} />
        </div>
      </Match>
      <Match when={session().data}>
        {(data) => (
          <RequiredAuthContext.Provider value={data()}>
            <div>{props.children}</div>
          </RequiredAuthContext.Provider>
        )}
      </Match>
    </Switch>
  );
};

export const useRequiredAuth = () => {
  const context = useContext(RequiredAuthContext);
  if (!context) {
    throw new Error(
      "useRequiredAuth must be a child of a RequiredAuthProvider"
    );
  }
  return context;
};
