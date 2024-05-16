import React from "react";
import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider } from "antd";

const colors = ["#6253E1", "#04BEFE"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const AIButton: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: `linear-gradient(135deg, ${colors.join(", ")})`,
          colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
            colors
          ).join(", ")})`,
          colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
            colors
          ).join(", ")})`,
          lineWidth: 0,
        },
      },
    }}
  >
    <Button type="primary" className="w-[100%]">
      新建聊天
    </Button>
  </ConfigProvider>
);

export default AIButton;
