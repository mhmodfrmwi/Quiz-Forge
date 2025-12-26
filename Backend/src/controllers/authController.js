const { sql } = require("../config/dbConfig");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const request = new sql.Request();
    request.input("email", sql.NVarChar, email);
    request.input("password", sql.NVarChar, password);
    const result = await request.execute("sp_login_universal");

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      if (user.error) {
        return res.status(401).json({ message: user.error });
      }
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { login };
