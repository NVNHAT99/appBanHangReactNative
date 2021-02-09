const senOrder = (token, arrayDetail) =>
  fetch('http://192.168.0.104/app/cart.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token, arrayDetail}),
  }).then((response) => response.text());

export {senOrder};
