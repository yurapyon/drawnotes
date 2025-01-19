import { Component, createSignal, Show } from "solid-js";
import { Browser } from "~/components/Browser/Browser";
import { SettingsButton } from "./Settings/SettingsButton";
import { ClassProps } from "./_misc/ClassProps";

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
      <div class="grow min-h-0 pr-[1ch]">
        <Show when={!showSettings()}>
          <Browser classList={{ "h-full": true }} />
        </Show>
        <Show when={showSettings()}>
          <div class="flex flex-col h-full">
            <div>tags</div>
            <div>vim mode</div>
          </div>
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
