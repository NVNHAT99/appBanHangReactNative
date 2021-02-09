const ChangeInfoUser = (token, name, phone, address) =>
  fetch('http://192.168.0.104/app/change_info.php', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token, name, phone, address}),
  }).then((response) => response.json());

export {ChangeInfoUser};
