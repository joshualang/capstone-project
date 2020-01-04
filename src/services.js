export function getData(uid, idToken) {
  return fetch(`https://localhost:3338/api/${uid}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  }).then(res => res.json())
}

export function patchData(uid, vaccination) {
  return fetch(`https://localhost:3338/api/${uid}`, {
    method: 'PATCH',
    body: JSON.stringify(vaccination),
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}
