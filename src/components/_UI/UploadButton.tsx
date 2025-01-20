import type { Image } from "@prisma/client";
import { Component, Show } from "solid-js";
import { uploadthingClient } from "~/lib/uploadthing-client";
import { openFileDialog } from "~/lib/utils/file-uploading";
import { Button } from "./Button";

interface UploadButtonProps {
  // TODO route
  onFileUpload: (image: Image) => void;
}

export const UploadButton: Component<UploadButtonProps> = (props) => {
  const ut = uploadthingClient.createUploadThing("imageUploader", {
    onClientUploadComplete: (val) => {
      const createdAt = new Date();
      const image = {
        ...val[0].serverData.image,
        createdAt,
      };
      props.onFileUpload(image);
    },
  });

  return (
    <Show when={!ut.isUploading()}>
      <Button
        onClick={() =>
          openFileDialog(
            "image/png;image/jpg",
            (fl) => fl && ut.startUpload([...fl])
          )
        }
      >
        upload
      </Button>
    </Show>
  );
};
