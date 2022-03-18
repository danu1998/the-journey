const { journey, user } = require("../../models");
const { Operator } = require("sequelize");

exports.getJourneys = async (req, res) => {
  try {
    let journeys = await journey.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "email", "image"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "idUser"],
      },
    });

    journeys = JSON.parse(JSON.stringify(journeys));
    journeys = journeys.map((item) => {
      return { ...item, image: process.env.FILE_PATH + item.image };
    });

    res.send({
      status: "Success !!!",
      message: "Get All Data Journey Success !",
      data: {
        journeys,
      },
    });
  } catch (err) {
    res.send({
      status: "Failed !!!",
      message: "Get All Data Journey Failed !",
    });
  }
};
exports.getJourney = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await journey.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: ["createdAt", "updatedAt", "fullName"],
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));

    res.send({
      status: "Success !!!",
      message: "Get All Data By Id Success",
      data: {
        ...data,
        image: process.env.FILE_PATH + data.image,
      },
    });
  } catch (err) {
    res.send({
      status: "Failed",
      message: "Get Data By Id Failed",
    });
  }
};
// exports.addJourney = async (req, res) => {
//   try {
//     const data = {
//       title: req.body.title,
//       description: req.body.description,
//       image: req.file.filename,
//       idUser: req.user.id,
//     };

//     let newJourney = await journey.create(data);

//     let journeyData = await journey.findOne({
//       where: {
//         id: newJourney.id,
//       },
//       include: [
//         {
//           model: user,
//           as: "user",
//           attributes: {
//             exclude: ["createdAt", "updatedAt", "password"],
//           },
//         },
//       ],
//       attributes: {
//         exclude: ["createdAt", "updatedAt", "idUser"],
//       },
//     });
//     journeyData = JSON.parse(JSON.stringify(journeyData));

//     res.send({
//       status: "success...",
//       data: {
//         ...journeyData,
//         image: process.env.FILE_PATH + journeyData.image,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       status: "failed",
//       message: "Server Error",
//     });
//   }
// };
exports.addJourney = async (req, res) => {
  const path = process.env.FILE_PATH;
  try {
    // const { body, user } = req;
    // const userId = user.id;

    // let journeys = await journey.create({
    //   ...body,
    //   title: req.body.title,
    //   description: req.body.description,
    //   image: req.file.filename,
    //   idUser: userId,
    // });
    const data = {
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
      idUser: req.user.id,
    };

    let newJourney = await journey.create(data);
    let journeyData = await journey.findOne({
      where: {
        id: newJourney.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
      attributes: {
        exclude: ["idUser"],
      },
    });

    journeyData = JSON.parse(JSON.stringify(journeyData));

    res.status(201).send({
      status: "Success",
      data: {
        ...journeyData,
        image: process.env.FILE_PATH + journeyData.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
    });
  }
};
exports.deleteJourney = async (req, res) => {
  try {
    const { id } = req.params;
    await journey.destroy({
      where: {
        id: id,
      },
    });
    res.send({
      status: "Success !!!",
      message: "Delete Success",
    });
  } catch (error) {
    res.send({
      status: "Failed !!!",
      message: "Delete Failed",
    });
  }
};
exports.updateJourney = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      title: req?.body?.title,
      description: req?.body?.description,
      image: req?.file?.filename,
      idUser: req?.user?.id,
    };

    // ============== || ==============

    await journey.update(data, {
      where: {
        id,
      },
    });

    res.send({
      status: "Success !!!",
      message: "Update Data Success !",
      data: {
        id,
        data,
        image: req?.file?.filename,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "Failed",
      message: "Update Data Failed",
    });
  }
};

exports.getUserJourney = async (req, res) => {
  try {
    const { id } = req.user;
    let journeys = await journey.findAll({
      where: {
        idUser: id,
      },
      attributes: {
        exclude: ["idUser", "idJourney", "updatedAt"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["id", "idUser", "password", "updatedAt"],
          },
        },
      ],
    });
    journeys = JSON.parse(JSON.stringify(journeys));
    journeys = journeys.map((item) => {
      return { ...item, image: process.env.FILE_PATH + item.image };
    });
    res.send({
      status: "success",
      data: {
        journeys,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.searchJourney = async (req, res) => {
  const path = process.env.FILE_PATH;
  try {
    let findJourney = await journey.findAll({
      where: {
        title: {
          [Operator.like]: "%" + req.query.title + "%",
        },
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["idUser", "idjourney", "updatedAt"],
      },
    });

    findJourney = JSON.parse(JSON.stringify(findJourney));
    findJourney = todayJourney.map((journey) => {
      // console.log(journey.createdAt)
      return {
        ...journey,
        image: journey.image ? path + journey.image : null,
      };
    });

    res.send({
      status: "success...",
      data: findJourney,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
