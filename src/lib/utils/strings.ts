export namespace Strings {
  export const countLeadingWhitespace = (str: string) => {
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== " ") {
        return i;
      }
    }
  };
}
