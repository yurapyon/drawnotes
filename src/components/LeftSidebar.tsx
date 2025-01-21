import { Component, createSignal, Show } from "solid-js";
import { Browser } from "~/components/Browser/Browser";
import { ClassProps } from "./_misc/ClassProps";
import { Settings } from "./Settings/Settings";
import { SettingsButton } from "./Settings/SettingsButton";

export interface LeftSidebarProps extends ClassProps {}

export const LeftSidebar: Component<LeftSidebarProps> = (props) => {
  const [showSettings, setShowSettings] = createSignal(false);

  return (
    <div
      class="flex flex-col pr-[1ch]"
      classList={{
        "bg-dn-gray-dark": !showSettings(),
        "bg-dn-gray-darker": showSettings(),
        ...props.classList,
      }}
    >
      <div class="w-full grow min-h-0">
        <Show when={!showSettings()}>
          <Browser classList={{ "w-full h-full": true }} />
        </Show>
        <Show when={showSettings()}>
          <Settings />
        </Show>
      </div>
      <SettingsButton
        classList={{ "shrink-0 w-full text-center bg-dn-gray": true }}
        onClick={() => {
          setShowSettings((previousShowSettings) => !previousShowSettings);
        }}
      />
    </div>
  );
};
