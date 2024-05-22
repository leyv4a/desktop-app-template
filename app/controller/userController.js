const UserModel = require('../model/user');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createUser(req, res) {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const id = await UserModel.create(name, email);
    if (!id) {
      return res.status(500).json({ error: 'Something went wrong'});
    }
    return res.status(201).json({ message: `User created sucessfully`});
  }
}

module.exports = UserController;
