const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// pnpm 워크스페이스에서 apps/web과 apps/app이 서로 다른 react 버전을 요구하면
// react-native 등 루트에만 호이스팅된 패키지가 apps/app이 아닌 루트의 react를
// 집어 React 인스턴스가 두 개로 갈라질 수 있다. 항상 apps/app의 react/react-dom을
// 쓰도록 고정해 하나의 인스턴스만 번들되게 한다.
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  react: path.resolve(projectRoot, "node_modules/react"),
  "react-dom": path.resolve(projectRoot, "node_modules/react-dom"),
};

module.exports = config;
