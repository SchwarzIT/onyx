# @sit-onyx/nuxt

## 1.0.0-beta.33

### Patch Changes

- Updated dependencies [e8c5341]
  - sit-onyx@1.0.0-beta.32

## 1.0.0-beta.32

### Patch Changes

- Updated dependencies [467d8f8]
  - sit-onyx@1.0.0-beta.31

## 1.0.0-beta.31

### Major Changes

- d7b68e0: feat: remove inline font families from bundle

  onyx now no longer bundles/inlines the recommend font families because they got bundled by Vite into the main `style.css` file as base64 encoded URL.
  This had negative impact on performance, tree-shaking and bundle size.

  From now on, you need to install and import the font families manually. For more information see our [typography docs](https://onyx.schwarz/development/typography.html#installation).

  For Nuxt, you can run

  ```sh
  npm install -D @fontsource-variable/source-sans-3 @fontsource-variable/source-code-pro
  ```

  and then import them in your `nuxt.config.ts`:

  ```ts
  export default defineNuxtConfig({
    css: ["@fontsource-variable/source-sans-3", "@fontsource-variable/source-code-pro"],
  });
  ```

### Patch Changes

- Updated dependencies [d7b68e0]
  - sit-onyx@1.0.0-beta.30

## 1.0.0-beta.30

### Patch Changes

- Updated dependencies [40b517d]
  - sit-onyx@1.0.0-beta.29

## 1.0.0-beta.29

### Patch Changes

- Updated dependencies [4c49760]
  - sit-onyx@1.0.0-beta.28

## 1.0.0-beta.28

### Patch Changes

- Updated dependencies [3163863]
  - sit-onyx@1.0.0-beta.27

## 1.0.0-beta.27

### Patch Changes

- Updated dependencies [93f4386]
  - sit-onyx@1.0.0-beta.26

## 1.0.0-beta.26

### Patch Changes

- Updated dependencies [244219f]
  - sit-onyx@1.0.0-beta.25

## 1.0.0-beta.25

### Patch Changes

- Updated dependencies [6f7149f]
  - sit-onyx@1.0.0-beta.24

## 1.0.0-beta.24

### Patch Changes

- Updated dependencies [dae102e]
  - sit-onyx@1.0.0-beta.23

## 1.0.0-beta.23

### Patch Changes

- Updated dependencies [349f412]
  - sit-onyx@1.0.0-beta.22

## 1.0.0-beta.22

### Patch Changes

- Updated dependencies [d6321d8]
  - sit-onyx@1.0.0-beta.21

## 1.0.0-beta.21

### Patch Changes

- Updated dependencies [4c73713]
  - sit-onyx@1.0.0-beta.20

## 1.0.0-beta.20

### Patch Changes

- Updated dependencies [9570420]
  - sit-onyx@1.0.0-beta.19

## 1.0.0-beta.19

### Patch Changes

- Updated dependencies [82fffac]
  - sit-onyx@1.0.0-beta.18

## 1.0.0-beta.18

### Patch Changes

- Updated dependencies [17c0aa5]
  - sit-onyx@1.0.0-beta.17

## 1.0.0-beta.17

### Patch Changes

- Updated dependencies [258c3ec]
  - sit-onyx@1.0.0-beta.16

## 1.0.0-beta.16

### Patch Changes

- Updated dependencies [02e4f4d]
- Updated dependencies [9cb8667]
  - sit-onyx@1.0.0-beta.15

## 1.0.0-beta.15

### Patch Changes

- Updated dependencies [25bfc85]
  - sit-onyx@1.0.0-beta.14

## 1.0.0-beta.14

### Patch Changes

- Updated dependencies [cae1e24]
  - sit-onyx@1.0.0-beta.13

## 1.0.0-beta.13

### Patch Changes

- Updated dependencies [7b8ad3d]
  - sit-onyx@1.0.0-beta.12

## 1.0.0-beta.12

### Patch Changes

- Updated dependencies [8a1c8d4]
  - sit-onyx@1.0.0-beta.11

## 1.0.0-beta.11

### Patch Changes

- Updated dependencies [5c0535e]
  - sit-onyx@1.0.0-beta.10

## 1.0.0-beta.10

### Patch Changes

- Updated dependencies [dd42def]
  - sit-onyx@1.0.0-beta.9

## 1.0.0-beta.9

### Patch Changes

- Updated dependencies [d0247d1]
  - sit-onyx@1.0.0-beta.8

## 1.0.0-beta.8

### Patch Changes

- Updated dependencies [df21d23]
  - sit-onyx@1.0.0-beta.7

## 1.0.0-beta.7

### Patch Changes

- Updated dependencies [c2a6447]
  - sit-onyx@1.0.0-beta.6

## 1.0.0-beta.6

### Patch Changes

- Updated dependencies [59bca7e]
  - sit-onyx@1.0.0-beta.5

## 1.0.0-beta.5

### Patch Changes

- Updated dependencies [6e14afd]
  - sit-onyx@1.0.0-beta.4

## 1.0.0-beta.4

### Patch Changes

- Updated dependencies [67a5e50]
  - sit-onyx@1.0.0-beta.3

## 1.0.0-beta.3

### Patch Changes

- Updated dependencies [15114f7]
  - sit-onyx@1.0.0-beta.2

## 1.0.0-beta.2

### Minor Changes

- 3385622: Support themes in nuxt module

## 1.0.0-beta.1

### Patch Changes

- Updated dependencies [7b72cbc]
  - sit-onyx@1.0.0-beta.1

## 1.0.0-beta.0

### Major Changes

- bf3ea0a: release beta version

  🎉 onyx is now beta! There are no breaking changes to the last `1.0.0.-alpha.*` version

### Patch Changes

- Updated dependencies [bf3ea0a]
  - sit-onyx@1.0.0-beta.0

## 1.0.0-alpha.47

### Patch Changes

- Updated dependencies [bf1e992]
  - sit-onyx@1.0.0-alpha.165

## 1.0.0-alpha.46

### Patch Changes

- Updated dependencies [555ac22]
- Updated dependencies [555ac22]
- Updated dependencies [48b24d2]
  - sit-onyx@1.0.0-alpha.164

## 1.0.0-alpha.45

### Patch Changes

- Updated dependencies [4ddd145]
  - sit-onyx@1.0.0-alpha.163

## 1.0.0-alpha.44

### Patch Changes

- Updated dependencies [90f9f86]
- Updated dependencies [90f9f86]
  - sit-onyx@1.0.0-alpha.162

## 1.0.0-alpha.43

### Patch Changes

- Updated dependencies [4492231]
  - sit-onyx@1.0.0-alpha.161

## 1.0.0-alpha.42

### Patch Changes

- Updated dependencies [cd4a885]
  - sit-onyx@1.0.0-alpha.160

## 1.0.0-alpha.41

### Major Changes

- 981495f: Require mapping of onyx locales to the project ones.

  This change was necessary because registering all languages supported by onyx would force the project to also support them due to the way locales are merged by nuxt-i18n.

### Patch Changes

- 981495f: Only show registration order warning if nuxt-i18n is used

## 1.0.0-alpha.40

### Patch Changes

- Updated dependencies [760bb76]
  - sit-onyx@1.0.0-alpha.159

## 1.0.0-alpha.39

### Patch Changes

- 5b1aab0: fix(nuxt): i18n locales not resolvable

  Prevents error on application start:

  ERROR ENOENT: no such file or directory, open '/node_modules/@sit-onyx/nuxt/dist/runtime/locales/de-DE.ts'

## 1.0.0-alpha.38

### Patch Changes

- Updated dependencies [4ee1e7f]
  - sit-onyx@1.0.0-alpha.158

## 1.0.0-alpha.37

### Patch Changes

- Updated dependencies [c79e491]
- Updated dependencies [8d14b72]
  - sit-onyx@1.0.0-alpha.157

## 1.0.0-alpha.36

### Patch Changes

- Updated dependencies [ea9a9e7]
  - sit-onyx@1.0.0-alpha.156

## 1.0.0-alpha.35

### Patch Changes

- Updated dependencies [b8db0cc]
- Updated dependencies [b8db0cc]
  - sit-onyx@1.0.0-alpha.155

## 1.0.0-alpha.34

### Minor Changes

- 529a84f: feat(nuxt): integrate @nuxtjs/i18n into onyx nuxt module

### Patch Changes

- Updated dependencies [529a84f]
  - sit-onyx@1.0.0-alpha.154

## 1.0.0-alpha.33

### Patch Changes

- Updated dependencies [2cef847]
  - sit-onyx@1.0.0-alpha.153

## 1.0.0-alpha.32

### Patch Changes

- Updated dependencies [8692b19]
  - sit-onyx@1.0.0-alpha.152

## 1.0.0-alpha.31

### Patch Changes

- Updated dependencies [3c8cf6d]
  - sit-onyx@1.0.0-alpha.151

## 1.0.0-alpha.30

### Patch Changes

- Updated dependencies [0bdb49a]
- Updated dependencies [0bdb49a]
  - sit-onyx@1.0.0-alpha.150

## 1.0.0-alpha.29

### Patch Changes

- Updated dependencies [1cc020a]
- Updated dependencies [1cc020a]
  - sit-onyx@1.0.0-alpha.149

## 1.0.0-alpha.28

### Patch Changes

- Updated dependencies [2d0458d]
  - sit-onyx@1.0.0-alpha.148

## 1.0.0-alpha.27

### Patch Changes

- Updated dependencies [743ee88]
- Updated dependencies [b7e9aaf]
  - sit-onyx@1.0.0-alpha.147

## 1.0.0-alpha.26

### Patch Changes

- Updated dependencies [d4fbcf4]
  - sit-onyx@1.0.0-alpha.146

## 1.0.0-alpha.25

### Patch Changes

- Updated dependencies [02f1a8a]
  - sit-onyx@1.0.0-alpha.145

## 1.0.0-alpha.24

### Patch Changes

- Updated dependencies [85128a2]
  - sit-onyx@1.0.0-alpha.144

## 1.0.0-alpha.23

### Patch Changes

- Updated dependencies [02f5691]
  - sit-onyx@1.0.0-alpha.143

## 1.0.0-alpha.22

### Patch Changes

- Updated dependencies [7c98a6d]
  - sit-onyx@1.0.0-alpha.142

## 1.0.0-alpha.21

### Patch Changes

- Updated dependencies [08b434b]
  - sit-onyx@1.0.0-alpha.141

## 1.0.0-alpha.20

### Patch Changes

- Updated dependencies [d3e9321]
  - sit-onyx@1.0.0-alpha.140

## 1.0.0-alpha.19

### Patch Changes

- Updated dependencies [107ec36]
  - sit-onyx@1.0.0-alpha.139

## 1.0.0-alpha.18

### Patch Changes

- Updated dependencies [0863114]
- Updated dependencies [0863114]
- Updated dependencies [53b0d50]
  - sit-onyx@1.0.0-alpha.138

## 1.0.0-alpha.17

### Patch Changes

- Updated dependencies [442e4c5]
  - sit-onyx@1.0.0-alpha.137

## 1.0.0-alpha.16

### Patch Changes

- Updated dependencies [f1aad40]
  - sit-onyx@1.0.0-alpha.136

## 1.0.0-alpha.15

### Patch Changes

- Updated dependencies [0511127]
  - sit-onyx@1.0.0-alpha.135

## 1.0.0-alpha.14

### Patch Changes

- Updated dependencies [02d9f0f]
  - sit-onyx@1.0.0-alpha.134

## 1.0.0-alpha.13

### Patch Changes

- sit-onyx@1.0.0-alpha.133

## 1.0.0-alpha.12

### Patch Changes

- Updated dependencies [6059d12]
  - sit-onyx@1.0.0-alpha.132

## 1.0.0-alpha.11

### Patch Changes

- Updated dependencies [1baef56]
  - sit-onyx@1.0.0-alpha.131

## 1.0.0-alpha.10

### Patch Changes

- Updated dependencies [37ee3fd]
  - sit-onyx@1.0.0-alpha.130

## 1.0.0-alpha.9

### Patch Changes

- Updated dependencies [70c7f93]
  - sit-onyx@1.0.0-alpha.129

## 1.0.0-alpha.8

### Patch Changes

- Updated dependencies [55c0b19]
  - sit-onyx@1.0.0-alpha.128

## 1.0.0-alpha.7

### Patch Changes

- Updated dependencies [62cb2ca]
  - sit-onyx@1.0.0-alpha.127

## 1.0.0-alpha.6

### Patch Changes

- Updated dependencies [85482cd]
- Updated dependencies [edbfc22]
- Updated dependencies [edbfc22]
  - sit-onyx@1.0.0-alpha.126

## 1.0.0-alpha.5

### Patch Changes

- Updated dependencies [2805e75]
  - sit-onyx@1.0.0-alpha.125

## 1.0.0-alpha.4

### Patch Changes

- Updated dependencies [5294c95]
  - sit-onyx@1.0.0-alpha.124

## 1.0.0-alpha.3

### Patch Changes

- Updated dependencies [f7e965b]
  - sit-onyx@1.0.0-alpha.123

## 0.0.1-alpha.2

### Patch Changes

- 1c541ae: fix dev mode of module caused by postcss issue

## 0.0.1-alpha.1

### Patch Changes

- 585f2f5: fix build issue in nuxt projects using @sit-onyx/nuxt

## 0.0.1-alpha.0

### Patch Changes

- 25893ed: feat: add nuxt module to easily integrate onyx into nuxt projects

  - Add the global styles to the nuxt project
  - Auto imports all onyx components
  - Add nuxt section to the getting started guide
