/**
 * @type {import('@babel/core').TransformOptions}
 */
export default {
  presets: [
    ["next/babel"],
    [
      "@wyw-in-js/babel-preset",
      {
        babelOptions: {
          configFile: __filename,
        },
      },
    ],
  ],

  plugins: [
    "@babel/plugin-transform-numeric-separator",
    "@babel/plugin-transform-private-methods",
  ],
};
