const User = require("./../models/User")

const handleLogout = async (req, res) => {
  // (!) On client, also delete accessToken

  const cookies = req.cookies
  if (!cookies?.jwt)
    // is there cookies? is there a jwt prop?
    return res.sendStatus(204) // 204 No Content
  const refreshToken = cookies.jwt

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec()

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    return res.sendStatus(204) // 204 No Content
  }

  // Delete refreshToken in db
  foundUser.refreshToken = ""
  const result = await foundUser.save()
  console.log(result)

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  })
  res.sendStatus(204)
}

module.exports = { handleLogout }
