import { useState } from "react";
import type { CSSProperties } from "react";

const BG_IMAGE_URL =
  "https://i.pinimg.com/originals/92/33/80/92338017c079bea4f1250ed4a3056117.gif";

// Font Family Constant
const PIXEL_FONT = "'Press Start 2P', monospace";

const styles: Record<string, CSSProperties> = {
  screen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url("${BG_IMAGE_URL}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: PIXEL_FONT,
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "rgba(186, 181, 181, 0.4)",
    borderRadius: "20px",
    border: "3px solid #000000",
    padding: "40px 44px",
    boxSizing: "border-box",
  },
  heading: {
    color: "#f9bce1",
    fontFamily: PIXEL_FONT,
    fontSize: "28px", 
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
    marginBottom: "40px",
    lineHeight: "1.5",
    textShadow: "3px 3px 0px #000000", 
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "28px",
  },
  label: {
    color: "#ffffff", 
    fontFamily: PIXEL_FONT,
    fontSize: "16px", 
    fontWeight: 500,
    paddingRight: "10px",
    flex: "1",
    lineHeight: "1.4",
    textShadow: "2px 2px 0px #000000",
  },
  input: {
    width: "180px", 
    height: "50px",  
    padding: "0 14px",
    fontFamily: PIXEL_FONT,
    fontSize: "18px", 
    color: "#000000",
    backgroundColor: "rgba(223, 223, 229, 0.9)",
    border: "3px solid #000000",
    borderRadius: "12px",
    outline: "none",
    boxSizing: "border-box",
    textAlign: "left",
  },
  readOnlyInput: {
    width: "180px",
    height: "50px",
    padding: "0 14px",
    fontFamily: PIXEL_FONT,
    fontSize: "18px", 
    fontWeight: "bold",
    color: "#000000",
    backgroundColor: "rgba(223, 223, 229, 0.9)",
    border: "3px solid #000000",
    borderRadius: "12px",
    outline: "none",
    boxSizing: "border-box",
    cursor: "default",
  },
};

const toNumber = (value: string): number => {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
};

const formatMoney = (value: number): string =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export function App() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const price = toNumber(originalPrice);
  const percent = Math.min(Math.max(toNumber(discount), 0), 100);
  const finalPrice = price - price * (percent / 100);

  return (
    <div style={styles.screen}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Store Discount Calculator</h1>

        {/* Original Price */}
        <div style={styles.row}>
          <label style={styles.label} htmlFor="original-price">
            Original Price :
          </label>
          <input
            id="original-price"
            style={styles.input}
            type="number"
            min="0"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>

        {/* Discount (%) */}
        <div style={styles.row}>
          <label style={styles.label} htmlFor="discount">
            Discount (%) :
          </label>
          <input
            id="discount"
            style={styles.input}
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        {/* Final Price */}
        <div style={styles.row}>
          <label style={styles.label} htmlFor="final-price">
            Final Price :
          </label>
          <input
            id="final-price"
            style={styles.readOnlyInput}
            type="text"
            readOnly
            value={price > 0 ? `$${formatMoney(finalPrice)}` : ""}
          />
        </div>
      </div>
    </div>
  );
}