import Restaurant from "../models/restaurants.modle.js";
const restaurantController = {};
//Create and save a new restuarants
restaurantController.create = async (req, res) => {
  const { title, type, imageUrl } = req.body;
  //validate data
  if (!title || !type || !imageUrl) {
    res.status(400).send({ message: "title , Type or imagUrl Can't be empty" });
    return;
  }
  await Restaurant.findOne({ where: { title } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({ message: "Restaurant already exists" });
      return;
    }
    const newRestaurant = {
      title,
      type,
      imageUrl,
    };
    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message || "Something error" });
      });
  });
};

restaurantController.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message || "Something error" });
    });
};

restaurantController.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404)({ message: "Not Found restaurant with id" + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message || "Something error" });
    });
};

restaurantController.update = async (req, res) => {
  const id = req.params.id;
  const { title, type, imageUrl } = req.body;
  //validate data
  if (!title && !type && !imageUrl) {
    res
      .status(400)
      .send({ message: "title , Type and imgUrl Can't be empty!" });
    return;
  }
  await Restaurant.update(
    { title: title, type: type, imageUrl: imageUrl },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num[0] == 1) {
        res.send({ message: "Restaurant update succesfully!" });
      } else {
        res.status(400).send({
          message:
            "Connot update restaurant with id" +
            id +
            "Maybe restaurant not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message || "Something error" });
    });
};

restaurantController.deleteById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send({ message: "ID is missing" });
  }
  await Restaurant.destroy({ where: { id } })
    .then((num) => {
      if (num[0] === 1) {
        res.send({ message: "Restaurant was DELETE succesfully" });
      } else {
        res.status(400).send({
          message:
            "Connot update restaurant with id" +
            id +
            "Maybe restaurant not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message || "Something error" });
    });
};

export default restaurantController;
