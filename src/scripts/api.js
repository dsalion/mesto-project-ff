export const cfg = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-17",
  headers: {
    authorization: "39372700-6f6a-42da-8d54-aca056f2fb48",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Функция для получения информации о пользователе
export function getUserData() {
  return fetch(`${cfg.baseUrl}/users/me`, {
    headers: cfg.headers,
  }).then(getResponseData);
}

export function getInitialCards() {
  return fetch(`${cfg.baseUrl}/cards`, {
    headers: cfg.headers,
  }).then(getResponseData);
}

export function loadNewAvatar(data) {
  return fetch(`${cfg.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    cache: "no-cache",
    headers: cfg.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    }),
  }).then(getResponseData);
}

export function loadNewDataProfile(data) {
  return fetch(`${cfg.baseUrl}/users/me`, {
    method: "PATCH",
    headers: cfg.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    }),
  }).then(getResponseData);
}

export function loadNewCard(data) {
  return fetch(`${cfg.baseUrl}/cards`, {
    method: "POST",
    headers: cfg.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(getResponseData);
}

export function deleteCard(cardId) {
  return fetch(`${cfg.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: cfg.headers,
  }).then(getResponseData);
}

export function likeCardSend(cardId) {
  return fetch(`${cfg.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: cfg.headers,
  }).then(getResponseData);
}

export function likeCardDel(cardId) {
  return fetch(`${cfg.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: cfg.headers,
  }).then(getResponseData);
}
