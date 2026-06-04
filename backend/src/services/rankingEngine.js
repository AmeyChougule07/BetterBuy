const rankProducts = (
  productData,
  competitorProducts
) => {

  const currentTitle =
    productData.title.toLowerCase();

  const currentBrand =
    productData.brand.toLowerCase();

  const scoredProducts =
    competitorProducts
      .map(product => {

        let score = 0;

        const name =
          product.name.toLowerCase();

        // Remove near-duplicate products

        const currentWords =
          currentTitle
            .split(" ")
            .slice(0, 5);

        const matches =
          currentWords.filter(word =>
            name.includes(word)
          ).length;

        if (matches >= 4) {
          score -= 1000;
        }

        // Different Brand Bonus

        const sameBrand =
          name.includes(currentBrand);

        if (!sameBrand) {
          score += 20;
        }

        // Gaming Keywords

        if (
          name.includes("rtx") ||
          name.includes("gaming")
        ) {
          score += 10;
        }

        // Better Tier Keywords

        if (
          name.includes("rog") ||
          name.includes("omen") ||
          name.includes("legion")
        ) {
          score += 15;
        }

        return {
          ...product,
          score
        };

      })
      .filter(product =>
        product.score > -1000
      );

  scoredProducts.sort(
    (a, b) => b.score - a.score
  );

  return scoredProducts.slice(0, 5);

};

module.exports = {
  rankProducts
};