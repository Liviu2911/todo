import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

const avatar = (name: string) =>
  createAvatar(lorelei, {
    seed: name,
    backgroundColor: ["ff4040"],
    hairColor: ["000"],
    eyesColor: ["233D4D"],
    skinColor: ["ffe19f"],
    mouthColor: ["000"],
    glasses: [],
    eyebrows: ["variant10"],
    hair: ["variant04"],
  }).toDataUri();

function Navbar() {
  console.log(avatar);
  return <nav></nav>;
}

export default Navbar;
