import type { Meta, StoryObj } from "@storybook/react";

import Create from "../components/create";

const meta: Meta<typeof Create> = {
  component: Create,
};

export default meta;

type Story = StoryObj<typeof Create>;
export const Primary: Story = {
  args: {},
};
