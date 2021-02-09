const onSearchAPI = (key) => {
  let url = `http://192.168.0.104/app/search.php?key=${key}`;
  return fetch(url).then((res) => res.json());
};

export {onSearchAPI};
