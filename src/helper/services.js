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
