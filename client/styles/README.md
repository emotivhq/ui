## SASS Structure
This documentation is a work in progress. Joel Serino, Sept 15, 2015

- `_folder`: Depicts a library
  - `_bootstrap` - Bootstrap's core SASS
  - `_bourbon` - Bourbon's core SASS
  - `_semantic` - Semantic's core SASS
- `colors` - Available color style guides
- `css` - Straight up CSS to build into project (special grunt rules will apply)
  - `custom.css` - CSS overrides, hacks, and customizations outside the scope of SASS builds (only stuff needing to avoid build process should be in here)
  - `animate.css` - Animation hacks - should be rewritten in SASS as a `plugin`
- `global` - Globally available variables & styles
- `images`: Supporting images (assets) for SASS
- `layouts`: Basic layouts globally available
- `mixins`: SASS mixins
- `plugins`: 3rd party & custom built plugins
- `theme`: Dropin theme styles based on `<_framework>`
- `ui`: UI components & images
  - `components`: UI components
  - `images`: Supporting UI SASS images (icons, etcs)
- `bootstrap.scss` - Loads bootstrap
- `global.scss` - Loads global styles
- `layout.scss` - Loads the current layout to use
- `theme.scss` - Loads the theme to use
- `ui.scss` - Loads the UI & its components
