interface RgbColor {
  r: number;
  g: number;
  b: number;
}

/**
 * 将十六进制颜色转换为 RGB 对象
 * @param {string} hex - 十六进制颜色字符串
 * @returns {object} RGB 对象
 */
function hexToRgb(hex: string): RgbColor {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

/**
 * 将 RGB 对象转换为十六进制颜色字符串
 * @param {object} rgb - RGB 对象
 * @returns {string} 十六进制颜色字符串
 */
function rgbToHex(rgb: RgbColor) {
  return (
    "#" +
    ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b)
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
}

/**
 * 调整颜色亮度
 * @param {object} rgb - RGB 对象
 * @param {number} percent - 调整百分比，正数为变亮，负数为变暗
 * @returns {object} 调整后的 RGB 对象
 */
function adjustBrightness(rgb: RgbColor, percent: number) {
  const newRgb = {
    r: Math.min(Math.max(0, rgb.r + (rgb.r * percent) / 100), 255),
    g: Math.min(Math.max(0, rgb.g + (rgb.g * percent) / 100), 255),
    b: Math.min(Math.max(0, rgb.b + (rgb.b * percent) / 100), 255),
  };
  return newRgb;
}

const primaryColor = "#3498db"; // 假设这是你拿到的 primaryColor

// 将十六进制颜色转换为 RGB
const rgb = hexToRgb(primaryColor);

// 调整颜色亮度（这里设定为变亮 10%）
const adjustedRgb = adjustBrightness(rgb, 10);

// 将调整后的 RGB 转换回十六进制颜色
const activePrimaryColor = rgbToHex(adjustedRgb);

console.log(activePrimaryColor); // 输出类似颜色
