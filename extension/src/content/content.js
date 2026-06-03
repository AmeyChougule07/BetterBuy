console.log("VERSION 2");
console.log("BetterBuy Content Script Loaded");

// Product Title
const title = document.querySelector("#productTitle")?.innerText.trim();

// Price
const price =
  document.querySelector(".a-price .a-offscreen")?.innerText;

// Rating
const rating =
  document.querySelector("#acrPopover")?.getAttribute("title");

// Review Count
const reviewCount = document
  .querySelector("#acrCustomerReviewText")
  ?.getAttribute("aria-label");

// Brand 
const brand = document
  .querySelector("#bylineInfo")
  ?.textContent
  .replace("Visit the ", "")
  .replace(" Store", "")
  .trim();

console.log("Product Title:", title);
console.log("Price:", price);
console.log("Rating:", rating);
console.log("Review Count:", reviewCount);
console.log("Brand:", brand);