import { Component, createSignal } from "solid-js";
import { TextInput } from "../_UI/TextInput";
import { Button } from "../_UI/Button";
import { signIn, signUp } from "~/lib/auth-client";

interface LoginSignUpProps {
  classList?: Record<string, boolean | undefined>;
}

export const LoginSignUp: Component<LoginSignUpProps> = (props) => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  return (
    <div class="flex flex-col gap-2" classList={{ ...props.classList }}>
      <TextInput
        placeholder="email"
        value={email()}
        onInput={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextInput
        placeholder="password"
        value={password()}
        onInput={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div class="flex flex-row">
        <Button
          onClick={() => {
            signIn(email(), password());
          }}
        >
          Log in
        </Button>
        <Button
          onClick={() => {
            signUp(email(), password());
          }}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};
