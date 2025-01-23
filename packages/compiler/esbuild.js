import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["standalone.ts"],
  bundle: true,
  outfile: "bundle.cjs",
  platform: "node",
  target: "node20",
  format: "cjs",
  loader: { ".node": "copy" },
  external: [
    "node-gyp",
    "./get-uid-gid.js", // traces back to: https://github.com/npm/uid-number/blob/6e9bdb302ae4799d05abf12e922ccdb4bd9ea023/uid-number.js#L31
  ],
});
