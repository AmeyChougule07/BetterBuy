const {
  rankProducts
} = require("../services/rankingEngine");

const getRecommendations = (req, res) => {
  const { productData, competitorProducts } = req.body;

  const recommendations = rankProducts(
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