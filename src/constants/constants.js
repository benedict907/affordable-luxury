export const EMPTY_BULLETS = "<ul><li><br></li></ul>";

// Override locally via .env.development.local (REACT_APP_API_BASE_URL=http://localhost:3000)
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://api.travelbugvoucher.com";

export const IMAGE_PATH = `${API_BASE_URL}/uploads`;

export const CONTACT_EMAIL = "info@travelbugvoucher.com";
// Fill in the real number to make it appear on the Contact Us page.
export const CONTACT_PHONE = "";
