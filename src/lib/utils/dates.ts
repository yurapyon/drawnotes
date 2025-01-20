export const formatDate = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year} ${month} ${day}`;
};

export const sortByCreatedAt = (objects: { createdAt: Date }[]) => {
  objects.sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};
