import getConfig from "next/config";
import { Content } from "./content";

const Page = () => {
  const { publicRuntimeConfig } = getConfig();

  return <Content version={publicRuntimeConfig.version} />;
};
export default Page;
