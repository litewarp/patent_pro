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
      brand: "#c01722",
      focus: "#FFF8F0",
      selected: "#C01722",
      "accent-1": "#033F63",
      "accent-2": "#476A6F",
      "accent-3": "#b6c197",
      "accent-4": "#eae2b7",
      "dark-1": "#080708",
      "dark-2": "#353535",
      "dark-3": "#555555",
      "dark-4": "#666370",
      "dark-5": "#777777",
      "neutral-1": "#9B7874",
      "neutral-2": "#69130E",
      "neutral-3": "#1c1f33",
      "neutral-4": "#c8963E",
      "status-critical": "#ff3f3f",
      "status-error": "#DD4B1A",
      "status-warning": "#FDCA40",
      "status-ok": "#8A9B6A",
      "status-unknown": "#BDBBB0",
    },
  },
})
export default theme
