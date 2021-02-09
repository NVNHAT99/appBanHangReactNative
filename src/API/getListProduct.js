const getListProduct = (idType, page) => {
  let url;
  if (idType !== 'COLLECTION') {
    url = `http://192.168.0.104/app/product_by_type.php?id_type=${idType}&page=${page}`;
  } else {
    url = `http://192.168.0.104/app/get_collection.php?page=${page}`;
  }
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

export {getListProduct};
