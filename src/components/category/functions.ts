export const createDefaultValues = (items, query): any => {
  if (items.state === 'hasError' || items.state === 'loading') {
    return [];
  }

  const itemData = items.contents.find((item) => item.id === Number(query.id));

  return { items: itemData.items };
};
