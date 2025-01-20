// https://stackoverflow.com/a/43174934
export const openFileDialog = (
  accept: string,
  callback: (files: FileList | null) => void
) => {
  function cb(this: HTMLInputElement) {
    callback(this.files);
  }

  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.accept = accept;
  inputElement.addEventListener("change", cb);
  inputElement.dispatchEvent(new MouseEvent("click"));
};

// https://stackoverflow.com/a/57272491
export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};
