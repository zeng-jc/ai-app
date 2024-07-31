"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
  SearchOutlined,
  OpenAIOutlined,
  DeleteOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  theme,
  Card,
  Space,
  Input,
  Tooltip,
  Empty,
  ConfigProvider,
  Switch,
  ColorPicker,
} from "antd";
const { Header, Sider, Content } = Layout;
const siderWidth = 240;
import styles from "./styles.module.css";

const Chat: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [themeMode, setThemeMode] = useState("light");
  const [primaryColor, setPrimaryColor] = React.useState("#1677ff");
  const chatList = new Array(20).fill(1).map((_, index) => ({
    title: `New Chat ${index}`,
  }));
  const searchChangeHandle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchVal(event.target.value);
  };
  const chatClickHandle = (index: number) => {
    setCurIndex(index);
  };
  //新建聊天
  const createNewChat = () => {};
  const themeSwitch = () => {
    document.documentElement.className =
      themeMode === "light" ? "dark" : "light";
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };
  console.log("collapsed", collapsed);
  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeMode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      <Layout hasSider>
        {!collapsed && <div className={styles["mobile-sidebar-mask"]}></div>}
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          onBreakpoint={(broken) => setCollapsed(broken)}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          width={siderWidth}
          className="h-[100vh] relative z-10"
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
        >
          <div className="text-center leading-[3rem] h-12 text-lg text-nowrap text-black dark:text-white">
            <OpenAIOutlined className="mr-1" />
            AIGC
          </div>
          <div
            className="p-2 flex flex-col"
            style={{ maxHeight: "calc(100% - 3rem)" }}
          >
            <div className="my-1 flex">
              <Input
                value={searchVal}
                onChange={searchChangeHandle}
                placeholder="聊天搜索"
                className="mr-1"
                prefix={<OpenAIOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
              />
              <Tooltip title="新建聊天">
                <Button>+</Button>
              </Tooltip>
            </div>
            <div className="overflow-scroll flex-1">
              <Space
                direction="vertical"
                size={4}
                style={{
                  width: "100%",
                }}
              >
                {chatList
                  .filter(
                    (item) => !searchVal || item.title.includes(searchVal)
                  )
                  .map(({ title }, index) => (
                    <Card
                      size="small"
                      key={index}
                      style={
                        curIndex === index
                          ? {
                              color: primaryColor,
                              borderColor: primaryColor,
                            }
                          : {}
                      }
                      onClick={() => chatClickHandle(index)}
                    >
                      <p className="text-nowrap flex justify-between ">
                        <Tooltip title={title}>
                          <span className="ml-2 overflow-hidden text-ellipsis">
                            {title}
                          </span>
                        </Tooltip>
                        <span className="mr-1">
                          <FormOutlined className="mr-1 hover:text-[#4096ff]" />
                          <DeleteOutlined className="hover:text-[#ff7875]" />
                        </span>
                      </p>
                    </Card>
                  ))}
              </Space>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header className="p-0 h-12 bg-white dark:bg-black flex items-center pr-7">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="relative z-10 w-16"
            />
            <Switch
              className="mr-2"
              checkedChildren={<SunOutlined />}
              unCheckedChildren={<MoonOutlined />}
              defaultChecked
              onClick={themeSwitch}
            />
            <ColorPicker
              value={primaryColor}
              onChangeComplete={(color) => setPrimaryColor(color.toHexString())}
            />
          </Header>
          <Content className="my-6 mx-6 p-6 rounded-md bg-white dark:bg-zinc-900 flex items-center justify-center">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ margin: "0 auto", width: "fit-content" }}
              description={<span></span>}
            >
              <Button type="primary" onClick={createNewChat}>
                新建聊天
              </Button>
            </Empty>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Chat;
