import { Component } from "solid-js";
import { Button } from "../_UI/Button";
import { signOut } from "~/lib/auth-client";

export const StatusBar: Component = () => {
  return (
    <div class="flex flex-row">
      <div class="grow min-w-0" />
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    </div>
  );
};
