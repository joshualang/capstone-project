export function getData(uid) {
  return fetch(`http://localhost:3334/api/${uid}`).then(res => res.json())
  //.catch(err => console.log("--->", err))
}

export function patchData(uid, vaccination) {
  return fetch(`http://localhost:3334/api/${uid}`, {
    method: 'PATCH',
    body: JSON.stringify(vaccination),
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}
