const { user } = require("../../models");

// Get All User Data
exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
// Get User Data By Id
exports.getUser = async (req, res) => {
  try {
    const idUser = req.user.id;
    const { id } = req.params;
    console.log(id);
    let users = await user.findOne({
      where: {
        id: idUser,
      },
      attributes: {
        exclude: ["password", "idUser", "createdAt", "updatedAt"],
      },
    });

    users = JSON.parse(JSON.stringify(users));

    res.send({
      status: "success...",
      data: {
        ...users,
        image: process.env.FILE_PATH + users.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
// Add User Data
exports.addUser = async (req, res) => {
  try {
    await user.create(req.body);
    res.send({
      status: "Success !!!",
      message: "Add Data Users Success !",
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "Error !!!",
      message: "Add Data Users Error !",
    });
  }
};
// Delete User Data By Id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await user.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "Success !!!",
      message: "Delete Data User Success !",
    });
  } catch (err) {
    res.send({
      status: "Error !!!",
      message: "Delete Data Users Error !",
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    let data = req.body;
    const { id } = req.params;
    const idUser = req.user.id;
    const image = req.file.filename;
    console.log(data);
    console.log(idUser);
    // console.log("image",image)
    data = {
      ...data,
      image,
    };
    console.log(data);

    await user.update(data, {
      where: {
        id: idUser,
      },
    });
    let users = await user.findOne({
      where: {
        id: idUser,
      },
      attributes: {
        exclude: ["password", "idUser", "createdAt", "updatedAt"],
      },
    });
    users = JSON.parse(JSON.stringify(users));

    res.send({
      status: "success...",
      data: {
        ...users,
        image: process.env.FILE_PATH + users.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};
