console.log("BetterBuy Content Script Loaded");

// =========================
// HELPERS
// =========================

function detectBrand(name) {
  if (!name) return null;

  const brands = [
    "HP",
    "ASUS",
    "Lenovo",
    "Dell",
    "Acer",
    "Apple",
    "MSI",
    "Samsung",
    "Primebook",
    "Honor",
    "Infinix",
    "Gigabyte"
  ];

  return (
    brands.find(brand =>
      name.toLowerCase().includes(
        brand.toLowerCase()
      )
    ) || null
  );
}

function isLaptopCard(text) {
  if (!text) return false;

  const lower =
    text.toLowerCase();

  const hasBrand =
    [
      "hp",
      "asus",
      "lenovo",
      "dell",
      "acer",
      "apple",
      "msi",
      "samsung",
      "primebook",
      "honor",
      "infinix"
    ].some(brand =>
      lower.includes(brand)
    );

  const hasLaptopSpecs =
    [
      "intel",
      "ryzen",
      "snapdragon",
      "celeron",
      "athlon",
      "ram",
      "ssd",
      "windows",
      "lpddr",
      "ddr4",
      "ddr5",
      "laptop"
    ].some(keyword =>
      lower.includes(keyword)
    );

  return (
    hasBrand &&
    hasLaptopSpecs &&
    text.length > 30
  );
}

// =========================
// CPU REGEX
// =========================

const CPU_REGEX =
  /(Intel\s+Core\s+Ultra\s+\d+\s*(Processor)?\s*[A-Z0-9-]*|Intel\s+Core\s+[3579]\s*[A-Z0-9-]*|Intel\s+Core\s+i[3579][-A-Z0-9]*|Core\s+i[3579][-A-Z0-9]*|Intel\s+Processor\s+[A-Z0-9]+|Ryzen\s+AI\s+[A-Z0-9\s+-]+|Ryzen\s+[3579]\s*[A-Z0-9-]+|Athlon\s+Silver\s+\d+[A-Z]*|Athlon\s+Gold\s+\d+[A-Z]*|Celeron\s+[A-Z0-9]+|Snapdragon\s+X\s*[A-Z0-9-]*|Apple\s+M[1-9])/i;

// =========================
// CURRENT PRODUCT
// =========================

const title =
  document.querySelector(
    "#productTitle"
  )?.innerText?.trim() || "";

const price =
  document.querySelector(
    ".a-price .a-offscreen"
  )?.innerText || null;

const rating =
  document.querySelector(
    "#acrPopover"
  )?.getAttribute("title") || null;

const reviewCount =
  document.querySelector(
    "#acrCustomerReviewText"
  )?.innerText || null;

const brand =
  document.querySelector(
    "#bylineInfo"
  )
    ?.textContent
    ?.replace(
      "Visit the ",
      ""
    )
    ?.replace(
      " Store",
      ""
    )
    ?.trim() || null;

// Feature bullets

const bulletText =
  [
    ...document.querySelectorAll(
      "#feature-bullets li"
    )
  ]
    .map(
      li => li.innerText
    )
    .join(" ");

const currentText =
  `${title} ${bulletText}`;

// Extract Specs

const currentCpu =
  currentText.match(
    CPU_REGEX
  );

const currentRam =
  currentText.match(
    /(\d+)\s*GB\s*(RAM|LPDDR|DDR)/i
  );

const currentStorage =
  currentText.match(
    /(\d+\s*(GB|TB)\s*(SSD|HDD|NVME|PCIE))/i
  );

const currentGpu =
  currentText.match(
    /(RTX\s*\d{3,4}|GTX\s*\d{3,4}|Intel\s+Arc|Arc\s+Graphics|Intel\s+UHD|Iris\s+Xe|AMD\s+Graphics|AMD\s+Radeon|Radeon\s+Graphics|NVIDIA\s+GeForce|GeForce)/i
  );

const productData = {
  title,
  brand,
  price,
  rating,
  reviewCount,

  cpu:
    currentCpu?.[0] ||
    null,

  ram:
    currentRam
      ? `${currentRam[1]}GB`
      : null,

  storage:
    currentStorage?.[0] ||
    null,

  gpu:
    currentGpu?.[0] ||
    null
};

console.log("TITLE:");
console.log(title);

console.log("CPU MATCH:");
console.log(currentCpu);

console.log("RAM MATCH:");
console.log(currentRam);

console.log("STORAGE MATCH:");
console.log(currentStorage);

console.log(
  "Current Product Specs:",
  {
    cpu: productData.cpu,
    ram: productData.ram,
    storage:
      productData.storage,
    gpu: productData.gpu
  }
);

// =========================
// AMAZON CAROUSEL
// =========================

const cards = [
  ...document.querySelectorAll(
    "li.a-carousel-card"
  )
];

console.log(
  "Raw Cards Found:",
  cards.length
);

// =========================
// PRODUCT EXTRACTION
// =========================

const competitorProducts =
  cards
    .map(card => {

      const extraText =
        [
          ...card.querySelectorAll("*")
        ]
          .map(el =>
            [
              el.getAttribute(
                "aria-label"
              ),
              el.getAttribute(
                "title"
              ),
              el.getAttribute(
                "alt"
              )
            ]
              .filter(Boolean)
              .join(" ")
          )
          .join(" ");

      const text =
        `${card.innerText} ${extraText}`;

      const lines =
        text
          .split("\n")
          .map(line =>
            line.trim()
          )
          .filter(Boolean);

      const name =
        lines.find(
          line =>
            line.length > 20
        ) || "";

      return {
        name,

        brand:
          detectBrand(name),

        price:
          text.match(
            /₹[\d,]+/
          )?.[0] || null,

        rating:
          text.match(
            /(\d\.\d)\s*out of 5 stars/i
          )
            ? Number(
                text.match(
                  /(\d\.\d)\s*out of 5 stars/i
                )[1]
              )
            : null,

        reviews: 0,

        ram:
          text.match(
            /(\d+)\s*GB\s*(RAM|LPDDR|DDR)/i
          )
            ? `${text.match(
                /(\d+)\s*GB\s*(RAM|LPDDR|DDR)/i
              )[1]}GB`
            : null,

        storage:
          text.match(
            /(\d+\s*(GB|TB)\s*(SSD|HDD|NVME|PCIE))/i
          )?.[0] || null,

        cpu:
          text.match(
            CPU_REGEX
          )?.[0] || null,

        gpu:
          text.match(
            /(RTX\s*\d{3,4}|GTX\s*\d{3,4}|Intel\s+Arc|Arc\s+Graphics|Intel\s+UHD|Iris\s+Xe|AMD\s+Graphics|AMD\s+Radeon|Radeon\s+Graphics|NVIDIA\s+GeForce|GeForce)/i
          )?.[0] || null
      };

    })

    .filter(product =>
      isLaptopCard(
        product.name
      )
    );

// =========================
// REMOVE DUPLICATES
// =========================

const uniqueCompetitorProducts =
  [
    ...new Map(
      competitorProducts.map(
        product => [
          product.name,
          product
        ]
      )
    ).values()
  ];

console.log(
  "Extracted Products:",
  competitorProducts.length
);

console.log(
  "Unique Products:",
  uniqueCompetitorProducts.length
);

console.log(
  "First Competitor:",
  uniqueCompetitorProducts[0]
);

// =========================
// SEND TO BACKEND
// =========================

chrome.runtime.sendMessage(
  {
    type:
      "GET_RECOMMENDATIONS",

    productData,

    competitorProducts:
      uniqueCompetitorProducts
  },

  response => {
    console.log(
      "Backend Response:",
      response
    );
  }
);