import Activity from "../models/activity.modle.js";

const activityController = {};

activityController.create = async (req, res) => {
  const {
    id,
    name,
    description,
    type,
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
        res.status(500).send({ message: error.message || "Something error" });
      });
  });
};

export default activityController;
