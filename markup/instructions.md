# Markup

Builds for markup are invoked by `./gulpfile.js`.

## Files and folders for this medium

### `./markup/components` - Reusable components

All of these should start by importing the components layout and importing any content:

    {% extends "layouts/components.njk" %}
    {% from "components/carousel.njk" import carousel %}

This is followed by one or more macros.

When these are executed, the naming context of the file that they are from will not be present, so name them to be clear independently.

    {% macro biggrid() %}
    {% endmacro %}

    {% macro smallgrid() %}
    {% endmacro %}

The last part of the file sends each macro to the body block. You can send multiple variations using different parameters.

    {% block body %}
      {{ biggrid(content.products) }}
      {{ biggrid(content.services) }}
      {{ smallgrid(content.products) }}
      {{ smallgrid(content.services) }}
    {% endblock %}

### `./markup/data` - Global data

Write modules in `./markup/data/modules` and import them into `data.js`.

These modules will be usable in all Nunjucks files as their key name without importing, for example:

    <h1>{{ content.heading }}</h1>

`data.reference.json` is a generated reference file of the markup data.

### `./markup/icons` - Importable SVG icon source

Use [SVGOMG](https://jakearchibald.github.io/svgomg/) to clean up svg files.

Use the Nunjucks `{% include %}` tag to import the SVG code directly into markup:

    {% include 'icons/icon.svg' %}

## Writing application templates versus static sites

The purpose of Nunjucks processing code varies depending on whether the site is generated with static content.

### Writing Nunjucks for application templates

All possible configuration by the application developer should be done through markup. Handlers and configuration for custom components should be written as `data-` attributes associated with the outer layer (a high-level `<div>`, for example) of the component rather than `<script>` elements which add information to the global scope.

For complex structures which don't require a handler, use JSON.

```njk
  <div data-hook="locations-map" data-markers="{{ JSON.stringify( markers ) }}">
  </div>
```

Comments for the application developer should be added directly as `<!-- -->` markup comments.

When writing an application template, the goals of Nunjucks code are to:

- show variations in markup to the application developer
- allow for testing variations in content such as character lengths
- show limited customization in content to the application developer, designers and the client to add context to what the elements are (though not to preview any actual pages)

A complete guide to sample content for application templates is available in the Web Process documentation under the Front-end Development section.

#### Image Resizer Parameters

The image resizer parameter API will be determined by the application developer. .NET sites should use `mode=crop` to ensure that aspect ratios are maintained. To determine static image resizer parameters, use this heuristic:

- If the aspect ratio isn’t fixed, the largest size for the appropriate background-size strategy (for example, cover or contain)
- The largest space size at any viewport size, not necessarily the size at the largest viewport size (for example, the space size might be larger at 480 than 1440 because it is 1-up instead of 4-up)
- For JPEGs, up to double that for retina displays, but not wider than 1920
  - Exceptions based on prior knowledge of the image, such as if the client can only provide assets at limited dimensions (for example, NFG’s product images in NetSuite)
  - If possible, setting the quality compression setting so that large image dimensions don’t produce large network requests

### Writing Nunjucks for static sites

Static sites use considerably more Nunjucks processing to keep the content separate from the front-end implementation. A static site can pull differing content into the same code from `./markup/data.json`. This is done by having an entry point file for each page, which defines blocks of unique markup but also sets variables that are used with reflection.

In each of the `./markup/data/modules` files, you can define individual data. Each file has to be brought in via `./data/data.js`.

Your page Nunjucks file will set as little information as possible. As much information as can practically be associated with the identifiers should be. A page might set multiple identifiers to target different types aspects of a site, for example identifying the page in the menu versus the product to display.

If you're using multiple templates, extend the default layout from the template layout. You can use the identifier directly (shown in the `src` attribute in the example below) as well as the reflected information (shown in the `alt` attribute).

#### Example

##### `./markup/data/products.json`:

```js
{
  "plate": {
    "name": "Plate",
    "subtitle": "Food goes on top of it."
  },
  "bowl": {
    "name": "Bowl",
    "subtitle": "Food goes inside of it."
  },
}
```

- The main keys (`plate`, `bowl`) can be reflected on to obtain individual values. See the `product.njk` layout markup example.

##### `./markup/data/data.js`:

```js
const products = require('./modules/products')

const data = {
  products,
}

module.exports = data
```

##### `./markup/pages/plate.njk`:

```njk
{% extends "layouts/product.njk" %}
{% set productId = 'plate' %}
{% set pageId = 'plate' %}

{% block productRichText %}
  <h2>Product data</h2>
  <p>This is an extended product description.</p>
{% endblock %}
```

- Populates `productRichText` in the `product.njk` layout.
- Sets variables for the `product.njk` layout to consume.

##### `./markup/layouts/product.njk`:

```njk
{% extends "layouts/default.njk" %}
{% from "components/header.njk" import header %}

{% block body %}
  {{ header(pageId) }}
  <img src="./assets/{{ productId }}.jpg" alt="{{ products[productId].name }}">
  <div class="rich-text">
    {% block productRichText %}
    {% endblock %}
  </div>
{% endblock %}
```

- Creates `productRichText` for the `plate.njk` page to populate.
- Populates `body` in `default.njk`.
- Uses `productId` from `plate.njk`.
- Passes `pageId` from `plate.njk` to the `header` macro via a parameter.
