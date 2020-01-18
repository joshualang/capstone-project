export function getData(uid, idToken) {
  return fetch(`https://localhost:3338/api/${uid}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function patchData(uid, idToken, vaccination) {
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
  return fetch(`https://localhost:3338/api/settings/${uid}`, {
    method: 'PATCH',
    body: JSON.stringify(settings),
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  }).then(res => res.json())
}

export function createNewUser(uid, idToken, name, age) {
  console.log('Posting Data')
  return fetch(`https://localhost:3338/api/newuser/${uid}`, {
    method: 'POST',
    body: JSON.stringify({ name: name, age: age }),
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  }).then(res => res.json())
}
