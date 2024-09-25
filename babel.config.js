import recommended from "@tooling/babel-config/recommended";

export default (api) => {
  api.cache(true);

  return recommended;
};
