const {
  rankProducts
} = require("../services/rankingEngine");

const getRecommendations = (req, res) => {

  const {
    productData,
    competitorProducts
  } = req.body;

  if (
    !productData ||
    !productData.title ||
    !productData.cpu
  ) {

    return res.json({
      success: false,
      error: "Invalid product data"
    });

  }

  console.log(
    "CONTROLLER RECEIVED PRODUCT:"
  );

  console.log(
    JSON.stringify(
      productData,
      null,
      2
    )
  );

  const recommendations =
    rankProducts(
      productData,
      competitorProducts
    );

  res.json({
    success: true,
    recommendations
  });

};

module.exports = {
  getRecommendations
};