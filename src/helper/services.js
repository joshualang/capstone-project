export function getUser(uid, idToken) {
  return fetch(`http://localhost:3338/api/user/${uid}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function createUser(uid, idToken, name, birth) {
  return fetch(`http://localhost:3338/api/user/create/${uid}`, {
    method: 'POST',
    body: JSON.stringify({ name: name, birth: birth }),
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function deleteUser(uid, idToken) {
  return fetch(`http://localhost:3338/api/delete/${uid}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function getProfile(profileid, idToken) {
  return fetch(`http://localhost:3338/api/profile/${profileid}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function createProfile(uid, idToken, name, birth) {
  return fetch(`http://localhost:3338/api/profile/create/${uid}`, {
    method: 'POST',
    body: JSON.stringify({ name: name, birth: birth }),
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function deleteProfile(profileid, idToken) {
  return fetch(`http://localhost:3338/api/profile/delete/${profileid}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function updateSettingsProfile(
  profileid,
  idToken,
  name,
  birth,
  settings
) {
  return fetch(`http://localhost:3338/api/profile/settings/${profileid}`, {
    method: 'PATCH',
    body: JSON.stringify({ name: name, birth: birth, settings: settings }),
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function addVaccinationProfile(
  profileid,
  idToken,
  date,
  vaccine,
  doctor
) {
  return fetch(`http://localhost:3338/api/profile/vaccinations/${profileid}`, {
    method: 'POST',
    body: JSON.stringify({ date: date, vaccine: vaccine, doctor: doctor }),
    headers: {
      'content-type': 'application/json',
      authorization: idToken,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

// ///-------old--------

// export function patchData(uid, idToken, vaccination) {
//   return fetch(`http://localhost:3338/api/${uid}`, {
//     method: 'PATCH',
//     body: JSON.stringify(vaccination),
//     headers: {
//       'content-type': 'application/json',
//       authorization: idToken,
//     },
//   })
//     .then(res => res.json())
//     .catch(err => console.log(err))
// }

// export function updateSettings(uid, idToken, settings) {
//   console.log('update settings', settings)
//   return fetch(`http://localhost:3338/api/settings/${uid}`, {
//     method: 'PATCH',
//     body: JSON.stringify(settings),
//     headers: {
//       'content-type': 'application/json',
//       authorization: idToken,
//     },
//   })
//     .then(res => res.json())
//     .catch(err => console.log(err))
// }

// export function createNewUser(uid, idToken, name, age) {
//   return fetch(`http://localhost:3338/api/newuser/${uid}`, {
//     method: 'POST',
//     body: JSON.stringify({ name: name, age: age }),
//     headers: {
//       'content-type': 'application/json',
//       authorization: idToken,
//     },
//   })
//     .then(res => res.json())
//     .catch(err => console.log(err))
// }
