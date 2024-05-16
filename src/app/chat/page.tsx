"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
  SearchOutlined,
  OpenAIOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme, Card, Space, Input, Tooltip } from "antd";
const { Header, Sider, Content } = Layout;
const siderWidth = 240;

const Chat: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const chatClickHandle = (index) => {
    setCurIndex(index);
  };
  return (
    <Layout hasSider>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => setCollapsed(broken)}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={siderWidth}
        className="h-[100vh]"
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
      >
        <div className="text-center leading-[3rem] h-12 text-lg text-nowrap">
          <OpenAIOutlined />
          AIGC
        </div>
        <div
          className="p-2 flex flex-col"
          style={{ maxHeight: "calc(100% - 3rem)" }}
        >
          <div className="my-1 flex">
            <Input
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
              {new Array(20).fill(1).map((_, index) => (
                <Card
                  size="small"
                  key={index}
                  className={`cursor-pointer ${
                    curIndex === index && "active-chat"
                  }`}
                  onClick={() => chatClickHandle(index)}
                >
                  <p className="text-nowrap flex justify-between ">
                    <Tooltip title={"New chat"}>
                      <span className="ml-2 overflow-hidden text-ellipsis">
                        New chat
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
        <Header
          style={{
            padding: 0,
            height: "48px",
            lineHeight: "48px",
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            overflow: "initial",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Chat;
