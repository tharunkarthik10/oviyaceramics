/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
              "on-tertiary-fixed": "#1C1917",
              "primary-container": "#991B1B",
              "secondary-fixed": "#E7E5E4",
              "secondary-container": "#F5F5F4",
              "on-background": "#1C1917",
              "surface-tint": "#B91C1C",
              "surface-dim": "#F5F5F4",
              "tertiary-fixed": "#E7E5E4",
              "on-secondary-fixed": "#1C1917",
              "surface-container": "#FAFAF9",
              "surface-container-lowest": "#FFFFFF",
              "on-primary": "#FFFFFF",
              "on-error": "#FFFFFF",
              "industrial-gray": "#57534E",
              "secondary-fixed-dim": "#D6D3D1",
              "on-tertiary": "#FFFFFF",
              "on-tertiary-fixed-variant": "#44403C",
              "on-secondary-container": "#292524",
              "tertiary-fixed-dim": "#D6D3D1",
              "secondary": "#57534E",
              "on-primary-container": "#FEF2F2",
              "on-surface": "#1C1917",
              "surface-variant": "#F5F5F4",
              "surface-container-low": "#FAFAF9",
              "primary-fixed-dim": "#FCA5A5",
              "on-tertiary-container": "#1C1917",
              "outline-variant": "#E7E5E4",
              "tertiary": "#78716C",
              "porcelain-white": "#FFFFFF",
              "on-surface-variant": "#57534E",
              "on-error-container": "#991B1B",
              "surface-bright": "#FFFFFF",
              "inverse-primary": "#FCA5A5",
              "background": "#FFFFFF",
              "primary": "#B91C1C",
              "tertiary-container": "#F5F5F4",
              "on-primary-fixed-variant": "#7F1D1D",
              "on-secondary": "#FFFFFF",
              "error-container": "#FEE2E2",
              "outline": "#D6D3D1",
              "error": "#DC2626",
              "surface": "#FFFFFF",
              "jali-stroke": "#E7E5E4",
              "on-primary-fixed": "#450A0A",
              "on-secondary-fixed-variant": "#44403C",
              "surface-container-high": "#F5F5F4",
              "indian-red": "#B91C1C",
              "surface-container-highest": "#E7E5E4",
              "inverse-surface": "#1C1917",
              "inverse-on-surface": "#F5F5F4",
              "primary-fixed": "#FEE2E2"
      },
      "borderRadius": {
              "DEFAULT": "0px",
              "lg": "2px",
              "xl": "4px",
              "full": "9999px"
      },
      "spacing": {
              "container-max": "100%",
              "margin-desktop": "80px",
              "section-gap": "144px",
              "unit": "8px",
              "gutter": "24px",
              "margin-mobile": "20px"
      },
      "fontFamily": {
              "label-md": [
                      "ui-sans-serif", "system-ui", "sans-serif"
              ],
              "headline-xl": [
                      "ui-sans-serif", "system-ui", "sans-serif"
              ],
              "body-md": [
                      "ui-sans-serif", "system-ui", "sans-serif"
              ],
              "body-lg": [
                      "ui-sans-serif", "system-ui", "sans-serif"
              ],
              "headline-md": [
                      "ui-sans-serif", "system-ui", "sans-serif"
              ],
              "headline-lg-mobile": [
                      "ui-sans-serif", "system-ui", "sans-serif"
              ],
              "caption": [
                      "ui-sans-serif", "system-ui", "sans-serif"
              ],
              "headline-lg": [
                      "ui-sans-serif", "system-ui", "sans-serif"
              ]
      },
      "fontSize": {
              "label-md": [
                      "14px",
                      {
                              "lineHeight": "20px",
                              "letterSpacing": "0.08em",
                              "fontWeight": "600"
                      }
              ],
              "headline-xl": [
                      "48px",
                      {
                              "lineHeight": "60px",
                              "letterSpacing": "0.02em",
                              "fontWeight": "700"
                      }
              ],
              "body-md": [
                      "16px",
                      {
                              "lineHeight": "26px",
                              "letterSpacing": "0.01em",
                              "fontWeight": "400"
                      }
              ],
              "body-lg": [
                      "18px",
                      {
                              "lineHeight": "30px",
                              "letterSpacing": "0.01em",
                              "fontWeight": "400"
                      }
              ],
              "headline-md": [
                      "24px",
                      {
                              "lineHeight": "32px",
                              "letterSpacing": "0.01em",
                              "fontWeight": "600"
                      }
              ],
              "headline-lg-mobile": [
                      "28px",
                      {
                              "lineHeight": "36px",
                              "letterSpacing": "0.01em",
                              "fontWeight": "600"
                      }
              ],
              "caption": [
                      "12px",
                      {
                              "lineHeight": "18px",
                              "letterSpacing": "0.03em",
                              "fontWeight": "500"
                      }
              ],
              "headline-lg": [
                      "32px",
                      {
                              "lineHeight": "40px",
                              "letterSpacing": "0.01em",
                              "fontWeight": "600"
                      }
              ]
      }
    },
  },
  plugins: [],
}
