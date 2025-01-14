import { Title } from "@solidjs/meta";
import { createEffect, Show, type Component } from "solid-js";
import { FolderViewer } from "~/components/FolderViewer";
import { ImageViewer } from "~/components/ImageViewer";
import { NoteEdit } from "~/components/NoteEdit";
import { LoginSignUp } from "~/components/Session/LoginSignUp";
import { StatusBar } from "~/components/StatusBar";
import { authClient } from "~/lib/auth-client";

const App: Component = () => {
  const session = authClient.useSession();

  createEffect(() => {
    console.log(session());
  });

  return (
    <main class="font-mono w-screen h-screen text-sm">
      <Title>notes</Title>
      <Show
        fallback={
          <div class="w-full h-full flex flex-col justify-center items-center">
            <LoginSignUp classList={{ "w-42 h-30": true }} />
          </div>
        }
        when={session()?.data}
        keyed
      >
        <div class="flex flex-col w-full h-full">
          <div class="grid grid-cols-[30ch_1fr_50ch] grid-rows-[1fr_min-content_min-content] w-full h-full">
            <FolderViewer />
            <NoteEdit noteId={"asdf"} />
            <ImageViewer />
            <div class="col-span-full">
              <StatusBar />
            </div>
          </div>
        </div>
      </Show>
    </main>
  );
};

export default App;
