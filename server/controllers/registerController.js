const User = require('./../models/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
  const { user, pwd, firstname, lastname, email } = req.body
  if (!user || !pwd)
    return res
      .status(400) // 400 Bad Request
      .json({ message: "Username and password are required" })
  // check for duplicate unsernames in the db
  const duplicate = await User.findOne({ username: user }).exec()

  if (duplicate) return res.sendStatus(409) // 409 Conflict
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10)

    // create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
      firstname: firstname,
      lastname: lastname,
      email: email,
    })

    console.log(result)

    res.status(201).json({ success: `New user ${user} created!` }) // 201 Created
  } catch (err) {
    res.status(500).json({ message: err.message }) // server error
  }
}

module.exports = { handleNewUser }
