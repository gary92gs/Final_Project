const express = require('express');
const router = express.Router();

let db = [
  {
    id: 1,
    username: "test",
    email: "@email.com",
    password: "test",
}, {
  id: 2,
  username: "test1",
  email: "1@email.com",
  password: "test1",
}
]

router.get('/', (req, res) => {
  res.json(db);
});

router.get('/:id', (req, res) => {
  const userObject = db.filter(element => element.id === Number(req.params.id));
  res.json(userObject);
})

router.post('/:id', (req, res) => {
  // grab newUser information from registration form (rec.body)

  // check rec.body to have form filled out

  // check if the email and username is unique

  // if not unique, display alert

  // if unique, add to the db

  // render dashboard
})

module.exports = router;