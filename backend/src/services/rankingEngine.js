function getCpuScore(cpu) {

  if (!cpu) return 0;

  cpu = cpu.toLowerCase();

  // Intel Core Ultra
  if (cpu.includes("ultra 9")) return 115;
  if (cpu.includes("ultra 7")) return 105;
  if (cpu.includes("ultra 5")) return 95;

  // Apple
  if (cpu.includes("m4")) return 110;
  if (cpu.includes("m3")) return 100;

  // Newer Intel generations
  if (
    cpu.includes("i7-14") ||
    cpu.includes("i7-13") ||
    cpu.includes("i7-12")
  ) return 90;

  if (
    cpu.includes("i5-14") ||
    cpu.includes("i5-13") ||
    cpu.includes("i5-12")
  ) return 70;

  // Ryzen
  if (cpu.includes("ryzen 7")) return 85;
  if (cpu.includes("ryzen 5")) return 65;
  if (cpu.includes("ryzen 3")) return 40;

  // Older Intel
  if (cpu.includes("i7")) return 80;
  if (cpu.includes("i5")) return 60;
  if (cpu.includes("i3")) return 35;

  // Budget
  if (cpu.includes("athlon")) return 20;
  if (cpu.includes("celeron")) return 10;

  // Snapdragon
  if (cpu.includes("snapdragon")) return 95;

  return 30;
}

function getRamScore(ram) {

  if (!ram) return 0;

  const value =
    parseInt(ram);

  if (value >= 32) return 100;

  if (value >= 16) return 80;

  if (value >= 8) return 50;

  return 20;
}

function getStorageScore(storage) {

  if (!storage) return 0;

  const text =
    storage.toLowerCase();

  if (text.includes("2tb"))
    return 100;

  if (text.includes("1tb"))
    return 80;

  if (text.includes("512"))
    return 60;

  if (text.includes("256"))
    return 40;

  return 20;
}

function detectCategory(product) {

  const text =
    product.name.toLowerCase();

  const gamingKeywords = [
    "rtx",
    "gtx",
    "gaming",
    "victus",
    "tuf",
    "rog",
    "legion",
    "nitro",
    "predator",
    "loq"
  ];

  const premiumKeywords = [
    "macbook",
    "xps",
    "spectre",
    "zenbook",
    "thinkpad x1"
  ];

  if (
    gamingKeywords.some(
      keyword =>
        text.includes(keyword)
    )
  ) {
    return "gaming";
  }

  if (
    premiumKeywords.some(
      keyword =>
        text.includes(keyword)
    )
  ) {
    return "premium";
  }

  return "productivity";
}

const rankProducts = (
  productData,
  competitorProducts
) => {

  const currentTitle =
    productData.title
      ?.toLowerCase() || "";

  const currentBrand =
    productData.brand
      ?.toLowerCase() || "";

  const currentPrice =
    Number(
      productData.price
        ?.replace(/[₹,]/g, "")
    ) || 0;

  const currentProduct = {
    ...productData,

    category:
      detectCategory({
        name:
          productData.title || ""
      })
  };

  const currentCpuScore =
    getCpuScore(
      productData.cpu
    );

  const currentRamScore =
    getRamScore(
      productData.ram
    );

  const currentStorageScore =
    getStorageScore(
      productData.storage
    );

  console.log(
    "Current Category:",
    currentProduct.category
  );

  console.log(
    "Current Specs:",
    {
      cpu:
        productData.cpu,
      ram:
        productData.ram,
      storage:
        productData.storage
    }
  );

  const filteredProducts =
    competitorProducts
      .map(product => ({
        ...product,

        category:
          detectCategory(
            product
          )
      }))
      .filter(product =>
        product.category ===
        currentProduct.category
      );

  console.log(
    "After Category Filter:",
    filteredProducts.length
  );

  const scoredProducts =
    filteredProducts
      .map(product => {

        let score = 0;

        const name =
          product.name
            .toLowerCase();

        // ===================
        // CPU
        // ===================

        const competitorCpuScore =
          getCpuScore(
            product.cpu
          );

        if (
          product.cpu &&
          productData.cpu
        ) {

          const currentCpu =
            productData.cpu.toLowerCase();

          const competitorCpu =
            product.cpu.toLowerCase();
          
          if (
            currentCpu.includes("ryzen 5") &&
            competitorCpu.includes("ryzen 5")
          ) {

            score += 40;

          }
          else if (
            currentCpu.includes("ryzen 7") &&
            competitorCpu.includes("ryzen 7")
          ) {

            score += 40;

          }
          else if (
            currentCpu.includes("i5") &&
            competitorCpu.includes("i5")
          ) {

            score += 40;

          }
          else if (
            currentCpu.includes("i7") &&
            competitorCpu.includes("i7")
          ) {

            score += 40;

          }
          else if (
            currentCpu.includes("ultra 5") &&
            competitorCpu.includes("ultra 5")
          ) {

            score += 40;

          }
          else if (
            currentCpu.includes("ultra 7") &&
            competitorCpu.includes("ultra 7")
          ) {

            score += 40;

          }
          
        }  

        const cpuDifference =
          Math.abs(
            competitorCpuScore -
            currentCpuScore
          );

        if (
          cpuDifference <= 5
        ) {

          score += 50;

        }
        else if (
          cpuDifference <= 10
        ) {

          score += 35;

        }
        else if (
          cpuDifference <= 20
        ) {

          score += 15;

        }
        else if (
          cpuDifference <= 35
        ) {

          score -= 10;

        }
        else {

          score -= 30;

        }
        // ===================
        // RAM
        // ===================

        const competitorRamScore =
          getRamScore(
            product.ram
          );

        const ramDifference =
          Math.abs(
            competitorRamScore -
            currentRamScore
          );

        if (ramDifference === 0) {
          score += 20;
        }
        else if (ramDifference <= 20) {
          score += 10;
        }
        else {
          score -= 10;
        }

        // ===================
        // STORAGE
        // ===================

        const competitorStorageScore =
          getStorageScore(
            product.storage
          );

        const storageDifference =
          Math.abs(
            competitorStorageScore -
            currentStorageScore
          );

        if (storageDifference === 0) {
          score += 20;
        }
        else if (storageDifference <= 20) {
          score += 10;
        }
        else {
          score -= 10;
        }

        // ===================
        // DUPLICATE FILTER
        // ===================

        const currentWords =
          currentTitle
            .split(" ")
            .slice(0, 5);

        const matches =
          currentWords.filter(
            word =>
              name.includes(
                word
              )
          ).length;

        if (
          matches >= 4
        ) {

          score -= 1000;

        }

        // ===================
        // SAME BRAND PENALTY
        // ===================

        if (
          name.includes(
            currentBrand
          )
        ) {

          score -= 10;

        }
        else {

          score += 10;

        }

        // ===================
        // PRICE SCORING
        // ===================

        const competitorPrice =
          Number(
            product.price
              ?.replace(
                /[₹,]/g,
                ""
              )
          ) || 0;

        const priceDifference =
          Math.abs(
            competitorPrice -
            currentPrice
          );

        if (
          priceDifference <= 3000
        ) {

          score += 50;

        }
        else if (
          priceDifference <= 7000
        ) {

          score += 35;

        }
        else if (
          priceDifference <= 12000
        ) {

          score += 20;

        }
        else if (
          priceDifference <= 20000
        ) {

          score -= 10;

        }
        else {

          score -= 40;

        }

        // ===================
        // RATING BONUS
        // ===================

        if (
          typeof product.rating ===
          "number"
        ) {

          score +=
            product.rating *
            2;

        }
        let missingSpecs = 0;

        if (!product.cpu) {
          missingSpecs++;
        }

        if (!product.ram) {
          missingSpecs++;
        }

        if (!product.storage) {
          missingSpecs++;
        }

        score -= missingSpecs * 20;

        return {

          ...product,

          score,

          priceDifference,

          cpuDifference,

          ramDifference,

          storageDifference

        };

      })

      .filter(
        product =>
          product.score >
          -1000
      );

  scoredProducts.sort(
    (a, b) =>
      b.score -
      a.score
  );

  console.log(
    "Top Recommendations:"
  );

  console.table(
    scoredProducts.slice(
      0,
      10
    )
  );

  return scoredProducts.slice(
    0,
    5
  );

};

module.exports = {
  rankProducts
};