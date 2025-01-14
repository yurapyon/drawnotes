import { Component } from "solid-js";

interface NoteEditProps {
  noteId: string;
}

export const NoteEdit: Component<NoteEditProps> = (props) => {
  return (
    <div class="flex flex-col">
      <div class="flex flew-row gap-[1ch]">
        <div>{props.noteId}</div>
        <div class="grow min-w-0" />
        <div class="bg-green-300">tag 1</div>
        <div class="bg-blue-300">tag 2</div>
        <div class="bg-yellow-300">tag 3</div>
      </div>
      <textarea class="grow min-h-0 resize-none bg-gray-200" />
    </div>
  );
};
