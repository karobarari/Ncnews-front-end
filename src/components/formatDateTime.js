export const formatDateTime = (createdAt) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Date(createdAt).toLocaleString(undefined, options);
};

