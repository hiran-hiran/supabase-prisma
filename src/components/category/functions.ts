export const createDefaultValues = (data, query) => {
  const itemData = data.contents.find((item) => item.id === Number(query.id));

  return itemData;
};
