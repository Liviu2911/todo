import type { Meta, StoryObj } from "@storybook/react";

import Todo from "../components/status/todo";
import "../index.css";

const meta: Meta<typeof Todo> = {
  component: Todo,
};

export default meta;

type Story = StoryObj<typeof Todo>;
export const Primary: Story = {
  args: {
    todo: {
      name: "todo",
      expires: "2024-12-43T12:00",
      body: "Body of the todo",
      id: "asd",
      userid: "asd",
      statusid: "asdsad",
    },
  },
};
