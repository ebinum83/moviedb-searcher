const getCollection = (collection) => {
  const parseCollection = JSON.parse(localStorage.getItem(collection)) || [];
  return parseCollection;
};

const getItem = (collection, id) => getCollection(collection).find((o) => o.id === id);

const setItem = (collection, id, props, replaceProp = false) => {
  const parseCollection = getCollection(collection);
  const findIndexItem = parseCollection.findIndex((o) => o.id === id);

  if (findIndexItem === -1) {
    parseCollection.push({ id, ...props });
  } else {
    parseCollection[findIndexItem] = replaceProp ? { id, ...props } : { ...parseCollection[findIndexItem], ...props };
  }

  localStorage.setItem(collection, JSON.stringify(parseCollection));
};

export { getCollection, getItem, setItem };
