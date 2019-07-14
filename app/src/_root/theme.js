/** @format */
import { deepFreeze } from "grommet/utils"

const theme = deepFreeze({
  global: {
    font: {
      family: "proxima-nova",
      size: "14px",
      height: "20px",
      weight: "500",
    },
    colors: {
      brand: "#C01722",
      focus: "#FFF8F0",
      selected: "#c01722",
      "accent-1": "#c0b517",
      "accent-2": "#D05159",
      "accent-3": "#17A1C0",
      "accent-4": "#17C0B5",
      "dark-1": "#080708",
      "dark-2": "#1c1f33",
      "dark-3": "#353535",
      "dark-4": "#555555",
      "dark-5": "#777777",
      "light-1": "#F2f2f2",
      "light-2": "#e6e6e6",
      "light-3": "#D9d9d9",
      "light-4": "#CCCCCC",
      "light-5": "#BFBFBF",
      "neutral-1": "#A1C017",
      "neutral-2": "#C03617",
      "neutral-3": "#C06017",
      "neutral-4": "#C08B17",
      "status-critical": "#69130E",
      "status-error": "#b8242E",
      "status-warning": "#D9CC11",
      "status-ok": "#22C017",
    },
  },
})

export default theme
