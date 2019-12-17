export function getData(uid, idToken) {
  return fetch(`https://localhost:3338/api/${uid}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  }).then(res => res.json())
}

export function patchData(uid, idToken, vaccination) {
  console.log('PATCH')
  return fetch(`https://localhost:3338/api/${uid}`, {
    method: 'PATCH',
    body: JSON.stringify(vaccination),
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  }).then(res => res.json())
}

export function updateSettings(uid, idToken, settings) {
  console.log('PATCH')
  return fetch(`https://localhost:3338/api/settings/${uid}`, {
    method: 'PATCH',
    body: JSON.stringify(settings),
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  }).then(res => res.json())
}
