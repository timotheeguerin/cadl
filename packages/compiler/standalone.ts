import { mutateModulesInSingleProject } from "@pnpm/core";
import { createOrConnectStoreController } from "@pnpm/store-connection-manager";
import { mkdir } from "node:fs/promises";
import { homedir } from "node:os";

const tspDir = homedir() + "/.tsp";

async function main() {
  await install({
    npxCache: tspDir + "/installs",
  });
}

main()
  .then(() => {
    console.log("Done here");
  })
  .catch(console.error);

interface InstallOptions {
  npxCache: string;
}
async function install(options: InstallOptions) {
  const installDir = options.npxCache;
  console.log("Downloading compiler into", installDir);
  await mkdir(installDir, { recursive: true });

  const storeController = await createOrConnectStoreController({
    dir: installDir,
    pnpmHomeDir: tspDir,
    workspaceDir: installDir,
    cacheDir: installDir,
    rawConfig: {},
    virtualStoreDirMaxLength: Infinity,
    fetchRetries: 3,
  });

  await mutateModulesInSingleProject(
    {
      mutation: "installSome",
      dependencySelectors: ["@typespec/compiler"],
      rootDir: options.npxCache as any,
      allowNew: true,
      targetDependenciesField: "dependencies",
      pruneDirectDependencies: true,
      manifest: {},
    },
    {
      storeDir: storeController.dir,
      storeController: storeController.ctrl,
      useLockfile: false,
      saveLockfile: false,
      fixLockfile: false,
      lockfileDir: options.npxCache,
      autoInstallPeers: true,
    },
  );

  console.log("Done");
}
