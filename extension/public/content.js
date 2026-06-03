console.log("VERSION 4");
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

// Competitor Products
const competitorProducts = [
  ...document.querySelectorAll("li.a-carousel-card")
]
  .map(card => card.innerText.trim())
  .filter(text =>
    text.length > 50 &&
    (
      text.includes("HP") ||
      text.includes("ASUS") ||
      text.includes("Lenovo") ||
      text.includes("Dell") ||
      text.includes("Acer")
    )
  );

// Final Output
console.log({
  productData,
  competitorProducts
});