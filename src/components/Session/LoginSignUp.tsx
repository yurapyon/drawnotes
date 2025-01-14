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
    <div
      class="flex flex-col gap-[1.5em] px-[1ch] py-[1.5em] bg-gray-100"
      classList={{ ...props.classList }}
    >
      <div>drawnotes</div>
      <TextInput
        type="email"
        placeholder="email"
        value={email()}
        onInput={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextInput
        type="password"
        placeholder="password"
        value={password()}
        onInput={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div class="flex flex-row justify-between">
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
