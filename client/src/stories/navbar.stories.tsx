import type { Meta, StoryObj } from "@storybook/react";
import "../index.css";
import Navbar from "../components/navbar/index";
const meta: Meta<typeof Navbar> = {
  component: Navbar,
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const FirstStory: Story = {
  args: {},
};
