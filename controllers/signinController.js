const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Incorrect form submission!')
  }

  db('login')
    .select('email', 'hash')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db('users')
          .select('*')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(() => {
            res.status(400).json('Unable to get user');
          })
      } else {
        res.status(400).json('Wrong credentials');
      }
    })
    .catch(() => {
      res.status(400).json('Wrong credentials');
    })
}

module.exports = {
  handleSignIn
}