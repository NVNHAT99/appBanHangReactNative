import {getToken} from './getToken';
import {saveToken} from './saveToken';

const getNewToken = (token) =>
  fetch('http://192.168.0.104/app/refresh_token.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token}),
  }).then((response) => response.text());

const refeshToken = async () => {
  try {
    const token = await getToken();
    if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
    }
    const newToken = await getNewToken(token);
    await saveToken(newToken);
  } catch (error) {}
};

export {refeshToken};
