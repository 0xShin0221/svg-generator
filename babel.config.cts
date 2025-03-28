const esbuild = require("esbuild");

const result = esbuild.buildSync({
  entryPoints: ["./i18n/routing.ts"],
  write: false,
  bundle: true,
  format: "cjs",
  target: "node14",
});

// biome-ignore lint/security/noGlobalEval: <explanation>
const { LANGUAGES } = eval(result.outputFiles[0].text);

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
  plugins: [
    "@babel/plugin-syntax-jsx",
    [
      "i18next-extract",
      {
        locales: LANGUAGES.map((l: string) => l),
        keyAsDefaultValue: LANGUAGES[0],
        outputPath: "./messages/{{locale}}/{{ns}}.json",
        defaultNS: "home",
      },
    ],
  ],
};
