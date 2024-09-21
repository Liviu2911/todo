import type { Meta, StoryObj } from "@storybook/react";

import NewTodo from "../components/newtodostatus/index";

const meta: Meta<typeof NewTodo> = {
  component: NewTodo,
};

export default meta;

type Story = StoryObj<typeof NewTodo>;
export const Primary: Story = {
  args: {},
};
