const { bookmark, journey, user } = require("../../models");

exports.addUserBookmark = async (req, res) => {
  const path = process.env.FILE_PATH;

  try {
    const { ...data } = req.body;
    const { id } = req.params;

    const idUser = req.user.id;
    console.log(id);
    console.log("data", data);
    console.log("idUser", idUser);

    const isExist = await bookmark.findOne({
      where: {
        idUser: idUser,
        idJourney: id,
      },
    });
    if (isExist) {
      return res.send({
        status: "failed",
        message: "user Already have bookmark this journey",
      });
    }

    let newBookmark = await bookmark.create({
      idUser: idUser,
      idJourney: id,
    });

    newBookmark = await bookmark.findOne({
      where: {
        id: newBookmark.id,
        // id: id
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
        {
          model: journey,
          as: "journey",
          attributes: {
            exclude: ["id", "idUser", "createdAt", "updatedAt"],
          },
        },
      ],

      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    newBookmark = JSON.parse(JSON.stringify(newBookmark));
    newBookmark = {
      ...newBookmark,
      journey: {
        ...newBookmark.journey,
        image: newBookmark.journey.image
          ? path + newBookmark.journey.image
          : null,
      },
    };
    res.send({
      status: "success...",
      data: newBookmark,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};
exports.getUserBookmark = async (req, res) => {
  const path = process.env.FILE_PATH;
  try {
    const idUser = req.user.id;
    let bookmarks = await bookmark.findAll({
      where: {
        idUser: idUser,
      },
      attributes: {
        exclude: ["idUser", "updatedAt"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: [
              "idUser",
              "idJourney",
              "password",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: journey,
          as: "journey",
          attributes: {
            exclude: ["idUser", "updatedAt"],
          },
        },
      ],
    });

    bookmarks = JSON.parse(JSON.stringify(bookmarks));
    bookmarks = bookmarks.map((bookmark) => {
      // console.log(bookmark.journey.image)

      return {
        ...bookmark,
        journey: {
          ...bookmark.journey,
          image: bookmark.journey.image ? path + bookmark.journey.image : null,
        },
      };
    });

    res.send({
      status: "success",
      data: {
        bookmarks,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};
exports.getAllUserBookmark = async (req, res) => {
  const path = process.env.PATH_FILE;

  try {
    let bookmarks = await bookmark.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "password"],
          },
        },
        {
          model: journey,
          as: "journey",
          attributes: {
            exclude: ["idUser", "updatedAt"],
          },
        },
      ],

      attributes: {
        exclude: ["idProduct", "idUser", "createdAt", "updatedAt"],
      },
    });

    bookmarks = JSON.parse(JSON.stringify(bookmarks));
    bookmarks = bookmarks.map((bookmark) => {
      return {
        ...bookmark,
        journey: {
          ...bookmark.journey,
          image: bookmark.journey.image ? path + bookmark.journey.image : null,
        },
      };
    });

    res.send({
      status: "success...",
      // data: newBookmark
      data: {
        bookmarks,
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
exports.deleteUserBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user.id;

    await bookmark.destroy({
      where: {
        idUser: idUser,
        idJourney: id,
      },
    });
    let bookmarks = await bookmark.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `Delete bookmark id: ${id} dan idUser ${idUser} success`,
      // data:productDelete
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
