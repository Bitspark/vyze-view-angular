import concat from 'concat';

async function build() {
  const files = [
    './dist/my-view/runtime.js',
    './dist/my-view/polyfills.js',
    './dist/my-view/main.js'
  ];
  await concat(files, './dist/my-view/index.mjs');
}

await build();
