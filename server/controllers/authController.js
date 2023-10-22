const User = require("./../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd)
    return res
      .status(400) // 400 Bad Request
      .json({ message: "Username and password are required" })

  const foundUser = await User.findOne({ username: user }).exec()
  if (!foundUser) return res.sendStatus(401) // 401 Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password)
  if (match) {
    const roles = Object.values(foundUser.roles)
    // create JWTs: access & refresh tokens
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10min" } // prod: 10min
    )

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" } // 1 day
    )

    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)

    res.cookie("jwt", refreshToken, {
      httpOnly: true, // httpOnly = not available to JavaScript
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    res.json({ accessToken }) // not secure to store it in local storage. to be stored in app state memory
  } else {
    res.sendStatus(401) // 401 Unauthorized
  }
}

module.exports = { handleLogin }
