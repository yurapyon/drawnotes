export const destructureNoteText = (text: string) => {
  const trimmed = text.trim();
  const lines = trimmed.split("\n");
  const title = lines[0] || "untitled";
  const tags = lines[1]?.trim().split(" ") || [];
  return { title, tags };
};
