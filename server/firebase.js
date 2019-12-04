const admin = require("firebase-admin")
let serviceAccount = require("./medical-assistant-19fc3-cee7dfd4e3aa.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

exports.db = admin.firestore()
// const admin = require("firebase-admin")

// let serviceAccount = require("./medical-assistant-19fc3-cee7dfd4e3aa.json")

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// })

// let db = admin.firestore()

// let singleUser = db
//   .collection("user")
//   .doc("ZA1U8UchFPV5nk7ZuICs")
//   //.collection("vaccinationsMade")
//   //.doc("Y6ce69fWzgi8rQkVKEQ1")
//   .get()
//   .then(doc => {
//     if (!doc.exists) {
//       return "No such document!"
//     } else {
//       return "Document data:" + doc.data()
//     }
//   })
//   .catch(err => {
//     return "Error getting document" + err
//   })

// console.log(singleUser)

// const sectionTitles = {
//   due: "Anstehende Impfungen",
//   done: "Erledigte Impfungen"
// }
// const diseaseNames = {
//   rotaviren: "Rotaviren",
//   tetanus: "Tetanus",
//   diphterie: "Diphterie",
//   pertussis: "Pertussis",
//   hib: "Humane Papillomviren",
//   poliomyeitis: "Poliomyeitis",
//   hepatitisB: "Hepatitis B",
//   pneumokokken: "Pneumokokken",
//   meningokokkenC: "Meningokokken C",
//   masern: "Masern",
//   mumps: "mumps",
//   varizellen: "Varizellen",
//   hpv: "HPV",
//   herpesZoster: "Herpes zoster",
//   influenza: "Influenza"
// }
