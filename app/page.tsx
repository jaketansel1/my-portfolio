import type { Metadata } from "next";
import HomeStage from "../components/home/HomeStage";

export const metadata: Metadata = {
  title: "Jake Tansel — Product Designer & Builder",
  description:
    "Product designer with 8 years of experience across UX/UI and front-end implementation. Designing, building and shipping digital products.",
};

export default function Home() {
  return <HomeStage />;
}
