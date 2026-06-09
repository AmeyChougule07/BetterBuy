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

function getGpuScore(gpu) {

  if (!gpu) return 0;

  gpu = gpu.toLowerCase();

  // RTX
  if (gpu.includes("rtx 5090")) return 150;
  if (gpu.includes("rtx 5080")) return 140;
  if (gpu.includes("rtx 5070")) return 130;
  if (gpu.includes("rtx 5060")) return 120;
  if (gpu.includes("rtx 5050")) return 110;
  if (gpu.includes("rtx 4050")) return 100;
  if (gpu.includes("rtx 3050")) return 90;

  // Arc
  if (gpu.includes("arc")) return 70;

  // Radeon
  if (gpu.includes("radeon")) return 60;

  // Iris Xe
  if (gpu.includes("iris xe")) return 45;

  // Intel UHD
  if (gpu.includes("uhd")) return 35;

  // Generic integrated graphics
  if (
    gpu.includes("intel graphics") ||
    gpu.includes("amd graphics")
  ) {
    return 30;
  }

  return 25;
}

function generateReasons(
  currentProduct,
  product
) {

  const reasons = [];

  // CPU

  if (
    getCpuScore(product.cpu) >
    getCpuScore(currentProduct.cpu)
  ) {

    reasons.push(
      `Better CPU (${product.cpu})`
    );

  }

  // GPU

  if (
    getGpuScore(product.gpu) >
    getGpuScore(currentProduct.gpu)
  ) {

    reasons.push(
      `Better GPU (${product.gpu})`
    );

  }

  // RAM

  if (
    getRamScore(product.ram) >
    getRamScore(currentProduct.ram)
  ) {

    reasons.push(
      `${product.ram} RAM`
    );

  }

  // Storage

  if (
    getStorageScore(product.storage) >
    getStorageScore(currentProduct.storage)
  ) {

    reasons.push(
      `${product.storage} Storage`
    );

  }

  // Price

  const currentPrice =
    Number(
      currentProduct.price
        ?.replace(/[₹,]/g, "")
    ) || 0;

  const competitorPrice =
    Number(
      product.price
        ?.replace(/[₹,]/g, "")
    ) || 0;

  if (
    competitorPrice > 0 &&
    competitorPrice < currentPrice
  ) {

    const savings =
      currentPrice -
      competitorPrice;

    reasons.push(
      `₹${savings.toLocaleString()} cheaper`
    );

  }

  // Rating

  const currentRating =
    parseFloat(
      currentProduct.rating
    ) || 0;

  const competitorRating =
    parseFloat(
      product.rating
    ) || 0;

  if (
    competitorRating >
    currentRating
  ) {

    reasons.push(
      `Higher Rating (${competitorRating}★)`
    );

  }

  if (
    reasons.length === 0
  ) {

    reasons.push(
      "Similar Specifications"
    );

  }

  return reasons;

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

  //Temporary
  console.log(
    "RANKING ENGINE INPUT:"
  );

  console.log(
    JSON.stringify(
      productData,
      null,
      2
    )
  );

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

  const currentGpuScore =
    getGpuScore(
      productData.gpu
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

  console.table(
    filteredProducts.map(p => ({
      brand: p.brand,
      cpu: p.cpu,
      price: p.price
    }))
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

          score += 30;

        }
        else if (
          cpuDifference <= 10
        ) {

          score += 20;

        }
        else if (
          cpuDifference <= 20
        ) {

          score += 10;

        }else if (
          cpuDifference <= 30
        ) {

          score -= 10;

        }
        else {

          score -= 25;

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
          score += 30;
        }
        else if (ramDifference <= 20) {
          score += 15;
        }
        else {
          score -= 15;
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
          score += 25;
        }
        else if (storageDifference <= 20) {
          score -= 10;
        }
        else {
          score -= 10;
        }


        // ===================
        // GPU
        // ===================

        const competitorGpuScore =
          getGpuScore(
            product.gpu
          );

        const gpuDifference =
          Math.abs(
            competitorGpuScore -
            currentGpuScore
          );

        if (gpuDifference === 0) {
          score += 10;
        }
        else if (gpuDifference <= 20) {
          score += 5;
        }
        else if (gpuDifference <= 50) {
          score += 0;
        }
        else {
          score -= 10;
        }

        if (
          currentProduct.category === "gaming"
        ) {
          score += competitorGpuScore / 2;
        }
        
        // ===================
        // UPGRADE BONUS
        // ===================

        if (
          competitorCpuScore >
          currentCpuScore
        ) {
          score += 10;
        }

        if (
          competitorRamScore >
          currentRamScore
        ) {
          score += 15;
        }

        if (
          competitorStorageScore >
          currentStorageScore
        ) {
          score += 15;
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
          product.brand &&
          currentBrand &&
          product.brand.toLowerCase() ===
            currentBrand.toLowerCase()
        ) {
          score -= 40;
        }
        else {
          score += 30;
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
        else if (priceDifference <= 20000) {
          score -= 20;
        }
        else {
          score -= 100;
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

          storageDifference,

          gpuDifference,

          reasons:
            generateReasons(
              productData,
              product
            )

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