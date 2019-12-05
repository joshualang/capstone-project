export function getData() {
  return fetch("http://localhost:3334/api/LA").then(res => res.json())
  //.catch(err => console.log("--->", err))
}

export function patchData(vaccination) {
  return fetch("http://localhost:3334/api/LA", {
    method: "PATCH",
    body: JSON.stringify(vaccination),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => console.log(res))
}

//date not in future || in form
//x update vaccinationsOpen || need to test
//x remove all undefined
//vaccinationType || made entries in json, now:
//get disease name and check to which date in vaccination recommendations its equal -> vaccinationtype

//update database then get

//date patched to server incorrect for vaccinationsMade
