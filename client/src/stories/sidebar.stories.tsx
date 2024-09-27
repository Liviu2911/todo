import type { Meta, StoryObj } from "@storybook/react";
import "../index.css";
import Sidebar from "../components/sidebar/index";
const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const FirstStory: Story = {
  args: {},
};
