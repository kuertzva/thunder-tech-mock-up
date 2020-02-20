# Styling

Most styles should be configured through Tailwind, with other styles being written into files in `./styles/modules`. Builds for styles are invoked by `./gulpfile.js`.

## Files and folders for this medium

### Configuration files

- `./styles/tailwind.js` - the source information for most of the style classes in a project. [Documentation](https://tailwindcss.com/docs/configuration/)
- `./postcssrc.js` - handles the build instructions for all styles, such as including Tailwind and the other plugins, determining their build order and specifying the differences between development and production builds.

### `./styles/extensions` - Tailwind functions and plugins

- [Writing Tailwind plugins](https://tailwindcss.com/docs/plugins/)
- [Tailwind config specification](https://tailwindcss.com/docs/configuration/)

### `./styles/modules` - Custom CSS selectors

If you need custom selectors, you can write them in as CSS files in `./styles/modules`, which are automatically imported into `./build/main.css`. There is no functional difference between CSS files in this folder, but add them as necessary to keep the project organized.

We're using these plugins that will transform your CSS:

- [tailwindcss](https://tailwindcss.com/docs/functions-and-directives/) - tailwind functions and directives, e.g. `@apply pt-16`
- [postcss-hexrgba](https://www.npmjs.com/package/postcss-hexrgba) - adds shorthand hex methods to rbga() values, e.g. `color: rgba(#0fab53, 0.8)`
- [postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env) - converts modern CSS so that most browsers can understand it, e.g. `@media (480px <= width < 768px)`
- [postcss-nested](https://www.npmjs.com/package/postcss-nested) - unwrap nested rules in the style of Sass, e.g. `.container > &`
- [autoprefixer](https://www.npmjs.com/package/autoprefixer) - parse CSS and add vendor prefixes so you don't have to write `-ms-` or `-webkit-`

### Custom CSS Use Cases

- Styling third-party markup structures such as server-rendered forms, embedded experiences or plugins
- When a commonly-used element has many utility classes (7-10 depending on length)
- When you need to write a class that Tailwind isn't capable of. If this class makes sense to write as a utility, put it in `./styles/modules/global.css`.

### Custom CSS Code Standards

- Avoid nested selectors when possible. If class names are unique enough that they don't cause conflicts, use simple class selectors.
- Write nested selectors outside-in for third-party markup that are clearly grouped.
- Write nested selectors inside-out for states and variations of elements.
- Use preset-env style media queries.
- Use the `@apply` directive when applicable.

If you have two elements with third-party markup,

```html
  <div class="third-party-form-container">
    <div>
      <input type="text">
    </div>
  </div>
  <div class="third-party-quiz">
    <div class="answered-correctly">
      <span class="third-party-quiz-text">Lorem ipsum dolor sit amet?</span>
    </div>
    <div class="answered-incorrectly">
      <span class="third-party-quiz-text">Lorem ipsum dolor sit amet?</span>
    </div>
    <div class="current-question">
      <span class="third-party-quiz-text">Lorem ipsum dolor sit amet?</span>
    </div>
  </div>
```

The styles might be,

```css
.third-party-form-container {
  & > div > input[type="text"] {
    @apply border border-black;
    background-image: linear-gradient(to bottom, theme(backgroundColor.lightgray), theme(backgroundColor.darkgray))
    @media (480px <= width < 768px) {
      @apply text-14;
    }
  }
}

.third-party-quiz-text {
  @apply text-black px-12 py-8 block;
  .answered-correctly > & {
    @apply text-white bg-green;
  }
  .answered-incorrectly > & {
    @apply text-white bg-red;
  }
  .current-question > & {
    @apply text-white bg-black;
  }
}
```

## Purging

Selectors which aren't used in markup will be purged from production builds. In order to prevent selectors which don't need to be in templates or pages from being purged, you can write matching markup in `{% block body %}` of the relevant markup component. For example:

```css
.scripted-classname {
  @apply pt-16 px-8 bg-red text-white;
}
```

```js
element.classList.add('scripted-classname')
```

```njk
{% block body %}
  <!-- This is the CSS purging whitelist for this module: -->
  <div class="scrtipted-classname"></div>
{% endblock %}
```
