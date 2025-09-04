import Activity from "../models/activity.modle.js";

const activityController = {};

activityController.create = async (req, res) => {
  const {
    id,
    name,
    description,
    type,
    level,
    team_size,
    date,
    location,
    reg_open,
    reg_close,
    contact_name,
    contact_phone,
    contact_email,
    status,
  } = req.body;
  //validate data
  if (
    !name ||
    !description ||
    !type ||
    !level ||
    !team_size ||
    !date ||
    !location ||
    !reg_open ||
    !reg_close ||
    !contact_name ||
    !contact_phone ||
    !contact_email ||
    !status
  ) {
    res.status(400).send({ message: "Plase fill all box!" });
    return;
  }
  await Activity.findOne({ where: { name } }).then((activity) => {
    if (activity) {
      res.status(400).send({ message: "Activity already exists" });
      return;
    }
    const newActivity = {
      id,
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    };
    Activity.create(newActivity)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message || "Something error while crating activity",
        });
      });
  });
};

activityController.getAll = async (req, res) => {
  await Activity.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Something error while get all activity",
      });
    });
};

activityController.getById = async (req, res) => {
  const id = req.params.id;
  await Activity.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404)({ message: "Not Found actitivity with id" + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message || "Something error" });
    });
};

activityController.update = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    type,
    level,
    team_size,
    date,
    location,
    reg_open,
    reg_close,
    contact_name,
    contact_phone,
    contact_email,
    status,
  } = req.body;

  // Validate (อย่างง่าย – ตรวจว่ามีข้อมูลส่งมาบ้าง)
  if (
    !name &&
    !description &&
    !type &&
    !level &&
    !team_size &&
    !date &&
    !location &&
    !reg_open &&
    !reg_close &&
    !contact_name &&
    !contact_phone &&
    !contact_email &&
    !status
  ) {
    return res
      .status(400)
      .send({ message: "At least one field is required for update." });
  }

  try {
    const [updatedRows] = await Activity.update(
      {
        name,
        description,
        type,
        level,
        team_size,
        date,
        location,
        reg_open,
        reg_close,
        contact_name,
        contact_phone,
        contact_email,
        status,
      },
      {
        where: { id: id },
      }
    );

    if (updatedRows === 1) {
      res.send({ message: "Activity updated successfully!" });
    } else {
      res.status(404).send({
        message: `Cannot update activity with id ${id}. Maybe activity was not found.`,
      });
    }
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};

activityController.deleteById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: "ID is missing" });
  }

  try {
    const num = await Activity.destroy({ where: { id } });

    if (num === 1) {
      res.send({ message: "Activity was DELETE successfully" });
    } else {
      res.status(404).send({
        message:
          "Cannot delete activity with id = " +
          id +
          ". Maybe activity was not found.",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};

activityController.searchActivity = async (res, req) => {
  try {
    const { name, type, level, status } = req.query;
    const whereClause = {};
    if (name) {
      whereClause = { [Option.iLike]: `%${name}%` };
    }
    if (type) {
      whereClause.type = type;
    }
    if (level) {
      whereClause.level = level;
    }
    if (status) {
      whereClause.status = status;
    }
    const actitivities = await Activity.findAll({ where: whereClause });
    res.status(200).json(actitivities);
  } catch (error) {
    console.error("Error searching activites:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while searching activites" });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  }
};

export default activityController;
