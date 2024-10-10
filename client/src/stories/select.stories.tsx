import type { Meta, StoryObj } from "@storybook/react";

import Select from "../components/select";

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;
export const Primary: Story = {
  args: {
    name: "project",
    data: [
      { id: "123", name: "asd", userid: "", statuses: [] },
      { id: "12", name: "abc", userid: "", statuses: [] },
    ],
  },
};
