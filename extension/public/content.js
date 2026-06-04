console.log("BetterBuy Content Script Loaded");

// Product Title
const title =
  document.querySelector("#productTitle")?.innerText.trim();

// Price
const price =
  document.querySelector(".a-price .a-offscreen")?.innerText;

// Rating
const rating =
  document.querySelector("#acrPopover")?.getAttribute("title");

// Review Count
const reviewCount =
  document.querySelector("#acrCustomerReviewText")
    ?.getAttribute("aria-label");

// Brand
const brand =
  document.querySelector("#bylineInfo")
    ?.textContent
    .replace("Visit the ", "")
    .replace(" Store", "")
    .trim();

// Current Product Data
const productData = {
  title,
  brand,
  price,
  rating,
  reviewCount
};

// Universal Product Extraction

const cards = [
  ...document.querySelectorAll("li.a-carousel-card")
];

console.log(
  "Raw Cards Found:",
  cards.length
);

// DEBUG
cards.slice(0, 3).forEach((card, index) => {
  console.log("CARD", index);
  console.log(card.innerText);
});

const competitorProducts = cards
  .map(card => {

    const lines = card.innerText
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    return {
      name: lines[0] || ""
    };

  })
  .filter(product => {

    const name =
      product.name.toLowerCase();

    const brands = [
      "hp",
      "asus",
      "lenovo",
      "dell",
      "acer",
      "apple",
      "msi",
      "samsung"
    ];

    return brands.some(
      brand => name.includes(brand)
    );

  });

// Remove Duplicates

const uniqueCompetitorProducts =
  [...new Map(
    competitorProducts.map(product => [
      product.name,
      product
    ])
  ).values()];

console.log(
  "Extracted Products:",
  competitorProducts.length
);

console.log(
  "Unique Products:",
  uniqueCompetitorProducts.length
);

console.log({
  productData,
  competitorProducts:
    uniqueCompetitorProducts
});


// Send data to backend
chrome.runtime.sendMessage(
  {
    type: "GET_RECOMMENDATIONS",
    productData,
    competitorProducts:
      uniqueCompetitorProducts
  },
  (response) => {
    console.log(
      "Backend Response:",
      response
    );
  }
);