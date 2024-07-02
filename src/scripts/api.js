const cfg = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
    headers: {
      authorization: '39372700-6f6a-42da-8d54-aca056f2fb48',
      'Content-Type': 'application/json'
    }
};

// Функция для получения информации о пользователе
function getUserInfo() {
  return fetch(`${cfg.baseUrl}/users/me`, {
    headers: cfg.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}