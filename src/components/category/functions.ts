export const createDefaultValues = (data, query) => {
  // console.log({ data });

  const itemData = data.contents.find((item) => item.id === Number(query.id));

  // console.log(itemData.items);

  return itemData;
};
