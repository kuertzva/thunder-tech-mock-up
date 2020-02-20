# Scripts

Scripts are unique because they are not handled by `./gulpfile.js`. Instead, the scripts are processed with [Webpack](https://webpack.js.org/). The Webpack Babel loader converts ES6 into ES5. Code standards are enforced with [ESLint](https://eslint.org/) and a [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## Files and folders for this medium

### Configuration files

- `./webpack.config` - handles the build instructions for all scripts. [Documentation](https://webpack.js.org/configuration/)
- `./eslintrc.js` - handles the ESLint configuration. [Documentation](https://eslint.org/docs/user-guide/configuring)

### `./scripts/modules` - Dependencies that can be imported into other scripts

These files should export one or more values using the syntax:

    export const name = expression

### `./scripts/main` - Scripts imported directly into `main.js`

All of these should start by importing any dependencies needed:

```js
import { run, selectAll } from '../modules/helpers'
```

This is followed by a call to `run`. We use a convention of `[data-hook="name"]` for top-level `run` elements.

```js
run('[data-hook="module"]', (element) => {
```

We use a convention of `[data-hook="name.subName]` for selecting sub-elements.

```js
const quantityFields = selectAll(element, '[data-hook="module.quantityField"]')
```

Use `~=` (`[data-hook~="name"`) instead of `=` if you need multiple names on a single element.

## Installing and using third-party scripts and tools

Additional Webpack loaders and configuration can be used to add functionality such as Vue. Third-party scripts in the Node.js ecosystem can be added to the project's package.json file and imported directly using `import` statements.

```bash
yarn add vue
```

Webpack uses `./node_modules` by default, but it might be helpful in some cases to add a `resolve.alias` in the `webpack.config.js`. See the [Webpack Alias Configuration Documentation](https://webpack.js.org/configuration/resolve/#resolvealias) for more on this.

```js
  resolve: {
    alias: {
      swiper$: 'path/to/file.js',
    },
  },
```

```js
import Swiper from 'swiper'
const carousel = new Swiper(parent, {
  // ...
}
```

### Reactivity Tools

Choice of a reactivity tool can be made on a per-case basis. In general, we prefer [Vue.js](https://vuejs.org/) to React. If IE11 support isn't required, [Svelte](https://github.com/sveltejs/svelte) is clearer and more performant.

To install a reactivity tool:

- Include the tempalte extension in the `.postcssrc` file's `purge.content` for selector whitelisting. For more information on purging, see `./styles/instructions.md`.
- Add any loaders you're using to the `webpack.config` file:
  - Add the loader extension to `resolve.extensions`
  - Add any aliases to `resolve.alias`
  - Add the loader's rule above Babel's
  - Add the loader plugin to `plugins`

```bash
yarn add vue
yarn add vue-loader
yarn add vue-template-compiler
```

Selectors in reactive template files should be considered whitelisted for purging purposes. To ensure this, edit `./.postcssrc` to include them:

```js
const purge = {
  content: ['**/*.html', '**/*.njk', '**/*.vue'],
  // ...
}
```

To instruct Webpack to compile the reactive templates, edit `./webpack.config`:

```js
{
  // ...
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
          {
            loader: 'vue-svg-inline-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
}
```

## Outputting multiple scripts

To output multiple scripts, create a new folder in `./scripts` and another entry point to the `./webpack.config.js` file. For clarity, the key name in the `entry` object, the folder name and the output filename should all be identical.

```js
{
  entry: {
    main: glob.sync('./scripts/main/*.js'),
    additional: glob.sync('./additional/main/*.js'),
  },
  // ...
}
```
