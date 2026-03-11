const { execSync } = require('child_process');
const path = require('path');

const cwd = process.env.INIT_CWD;
const projectRoot = path.join(__dirname, '..');

// Verify the script is run from watchfaces/*
const relativePath = path.relative(projectRoot, cwd).replace(/\\/g, '/');
if (!relativePath.startsWith('watchfaces/')) {
  console.error('❌ Run this script from a watchfaces/<project-name> folder');
  console.error(`   Current directory: ${relativePath}`);
  process.exit(1);
}

const distPath = path.join(cwd, 'dist').replace(/\\/g, '/');
const cwdUnix = cwd.replace(/\\/g, '/');

// Clean env for zeus: strip npm variables so module-alias resolves correctly
const zeusEnv = Object.fromEntries(
  Object.entries(process.env).filter(
    ([key]) => !key.startsWith('npm_') && key !== 'NODE_PATH' && key !== 'NODE_OPTIONS'
  )
);

const rootBin = path.join(projectRoot, 'node_modules', '.bin').replace(/\\/g, '/');
if (zeusEnv.PATH) {
  zeusEnv.PATH = zeusEnv.PATH
    .split(path.delimiter)
    .filter(p => !p.replace(/\\/g, '/').startsWith(rootBin))
    .join(path.delimiter);
}

try {
  // Step 1: cd into the watchface directory and run zeus build
  console.log(`📦 Building in ${relativePath}...`);
  execSync(`cd "${cwdUnix}" && zeus build`, {
    stdio: 'inherit',
    shell: true,
    env: zeusEnv,
  });

  // Step 2: Run prepare_release_files.sh with the dist path
  const scriptPath = path.join(projectRoot, 'scripts', 'prepare_release_files.sh').replace(/\\/g, '/');
  console.log(`🚀 Preparing release files from ${distPath}...`);
  execSync(`bash "${scriptPath}" "${distPath}"`, {
    stdio: 'inherit',
    shell: true,
    cwd: projectRoot,
  });

  console.log('✅ Done!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
