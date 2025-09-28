import Collection from "./models/collection.model.js";
import User from "./models/user.model.js";

const defaultCollections = [
  { titulo: "Favoritos" },
  { titulo: "Por leer" },
  { titulo: "Leídos" },
];

const seedCollectionsForUsers = async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const count = await Collection.countDocuments({ userId: user._id });
      if (count === 0) {
        for (const col of defaultCollections) {
          await Collection.create({ ...col, userId: user._id });
        }
        console.log(`Colecciones creadas para usuario ${user._id}`);
      } else {
        console.log(`El usuario ${user._id} ya tiene colecciones`);
      }
    }
  } catch (error) {
    console.error("Error al inicializar colecciones:", error);
  }
};

export default seedCollectionsForUsers;
