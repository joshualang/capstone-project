export function getData() {
  return fetch('http://localhost:3334/api/LA').then(res => res.json())
  //.catch(err => console.log("--->", err))
}

export function patchData(vaccination) {
  return fetch('http://localhost:3334/api/LA', {
    method: 'PATCH',
    body: JSON.stringify(vaccination),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => console.log(res))
}
