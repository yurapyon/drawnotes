import { Component } from "solid-js";
import { ClassProps } from "../_misc/ClassProps";

export interface ImageViewerProps extends ClassProps {}

export const ImageViewer: Component<ImageViewerProps> = (props) => {
  return <div classList={props.classList}>images</div>;
};
