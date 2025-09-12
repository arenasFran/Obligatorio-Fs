import Plan from "./ModelsDB/plan.model.js";

const seedPlans = async () => {
  try {
    const count = await Plan.countDocuments();
    if (count === 0) {
      await Plan.create({ name: "plus", price: 9.99, maxReviews: 10 });
      await Plan.create({ name: "premium", price: 19.99, maxReviews: -1 });
      console.log("Planes creados!");
    } else {
      console.log("Los planes ya existen");
    }
  } catch (error) {
    console.error("Error al inicializar planes:", error);
  }
};

export default seedPlans;
