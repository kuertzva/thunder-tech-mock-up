# thunder::tech Front-End Development Setup Template for Vendors

## Dependencies

- NVM: `0.34.0`
- Node: `v12.4.0`
- NPM: `6.9.0`
- Yarn: `1.15.2`

## Starting a new project

Via command line:

- Clone this repository into a new location
- Navigate the current working directory to the project root
- Degit it (delete the `.git` folder)
- Run `nvm use` to ensure that you're using the correct version of Node
- Run `yarn` to install the dependencies
- Run `git init` to turn the folder into a repository
- Add the files with `git add -A` and commit them before beginning so that the Git history reflects changes from the setup template

## Getting Started

- `yarn dev` to start development server with livereloading via browsersync
- Enter the visual branding details into the `tailwind.js` configuration file.
- Rename or delete the reference files `./markup/components/example.njk` and `./scripts/modules/example.js`.

## Explanation of files and folders in this repository

- `.build` The current build files generated from all project source.
- `markup` All source code that is generated into markup.
- `scripts` All source code that is generated into scripts.
- `styles` All souce code that is generated into stylesheets.
- `root` All source media, mapped to where it will end up relative to `build`
- `.vscode` Snippets and settings for Visual Studio Code.

## Conventions used in this repository

- `instructions.md` Instructions for a main folder (`markup`, `styles` and `scripts`) of this repository including code standards and examples.
- `.reference` The file is not source because it is a generated reference.

## Requirements

- Use [Favicomatic](http://www.favicomatic.com/) to generate a favicon, to be placed in the `root` folder.
- Where possible, images and videos should be in height-driving containers so that they do not push the page around as they load. Aspect ratio containers are preferable to fixed heights and should be used unless there is a reason to use a fixed height. For example, `relative aspect-ratio-square`.
  - Images in these containers can be `absolute mx-auto my-auto max-w-100% max-h-100% left-0 right-0 top-0 bottom-0`
  - Other elements in these containers can be `absolute w-100% h-100% left-0 top-0`, typically iframes and videos.
  - This does not apply to cases where the height or aspect ratio is unknowable such as images in a rich text area.
- Dynamic cropping should be considerate of the content photography possibilities for a given image space. Extreme crop ranges, especially where unnecessary, create manageability issues for clients.
- `role="presentation"` is on any element whose level should not be read by a screen reader.
- Use progressive enhancement to balance the motivations of performance, usability, maintainability and appeal. This means that there can be slight differences in rendering between browsers, but these differences should always be acceptable as end-user facing in the contractually required browsers.
  - When using the flexible box model, apply it in ways that avoid the bugs in Internet Explorer 11.
  - When using modern techniques, make sure that appropriate detections and/or polyfills are in place.
  - When using third-party tools such as NPM modules, make sure that they support the contractually required browsers.
- There are no console logs or warnings resulting from first-party code.
- There are no console errors in ay of the code on any of the contractually required browsers.
- Schema provided by thunder::tech's optimization team, if applicable, has been installed on the appropriate templates.
- Unique classes for each type of link have been added to make links uniquely identified in Google Tag Manager.
- Use Nunjucks macros to create reusable components where applicable (headers, footers). Related variations can be written as separate macros rather than supplying parameters to macros if that is easier.
- Content display in the front-end code
  - Sample content is not intended to simulate any particular page, and only content which is the same throughout the entire site such as the organization name, main phone number and main address should be real. Rich text and structured content elements that are typically in rich text should be lorem ipsum, for example:
    - Headings
    - Paragraphs
    - Lists
    - Quotations
  - Structured content that has meaning to the application should be samples of real content, for example:
    - The names of products and categories
    - The names of languages in a language switcher
    - Text on action buttons such as “Send” or “Apply Filters”
    - Page names in menus
  - Structured content that is used in a specific way should be clearly sample content, for example:
    - Names - `Lauren Ipsum`
    - Phone numbers - `555.555.5555`
    - Email addresses - `lauren.ipsum@<domain name>.com`, `lawrence.ipsum@<domain name>.com`
    - Postal addresses - `12345 Address St.`
  - Sample content should also be varied enough to show how the site’s layout responds in unfavorable conditions. For example, in a grid list of headings, headings should vary between very low and very high character counts.
  - The visual designer should provide a single image for each aspect ratio and/or type, such as a biographical headshot, a product image and a banner image. Additionally, separate images will be shown for:
    - Vector images to be built into the site’s code, all of which should be shown in the template
    - All patterns and textures, which are typically built into the front-end code
    - Images which technically prove a particular implementation concept. These need to be demonstrated to the client along with the original image in order to illustrate the types of assets they’ll need to provide. Examples include:
      - Transparent overlays which need to show that their overlay space is reasonable
      - Parallax images which need to show that their dynamic crop is reasonable
      Images in unusual crop zones such as circles which need to show that their static crop is reasonable

## The initial build is considered complete when:

- All features of all templates are built and working in Chrome
- There’s no reason to believe that the implementation will fail in any other browser
- If an image resizer is being used, all relevant image size parameters have been specified for raster images which are structured content fields. The heuristic for determining sizes is in the Setup Template’s ./markup/instructions.md file. The application developer will determine if an image resizer is being used and will supply the query string parameter API.
- All example data handlers for application development have been written
- All documentation for application development has been written in the form of `<!-- -->`-style markup comments.
- The sample content is appropriate for the client review
- The configurations of any third-party systems needed by the front-end code (such as font license providers) have been finalized
- The success manual worksheet, a Word document in the `root` folder, has been filled out and the irrelevant sections removed
- Assets which are not intended to be manageable in a content management system have been optimized for performance.

## Testing
- After initial development and the design review, test to the specifications in the contract.
- Mobile browsers are tested at viewport sizes offered by devices that support those browsers.
- The use case for desktop browsers is considered to be 800 through 1920 pixels wide. Beyond 1920, the site should center.`
- Document any issues or inconsistencies that may not be worth the effort to resolve.

## Creating builds

If you need to create a production-ready build, you can run `yarn build --prod`.
