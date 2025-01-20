import { Component, Show } from "solid-js";

interface YoutubeLineProps {
  height: number;
  id: string | null;
}

export const YoutubeLineComponent: Component<YoutubeLineProps> = (props) => {
  return (
    <Show when={props.id && props.id.length === 11} fallback={"invalid url"}>
      <div
        style={{
          height: `${props.height}lh`,
          // width: `${line().height}lh`,
        }}
      >
        <iframe
          class="h-full aspect-video"
          src={`https://www.youtube.com/embed/${props.id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>
    </Show>
  );
};
