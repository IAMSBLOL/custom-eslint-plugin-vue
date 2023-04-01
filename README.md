# eslint-plugin-custom-vue

some custom rules of vue

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-custom-vue`:

```sh
npm install eslint-plugin-custom-vue --save-dev
```

## Usage

Add `custom-vue` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "custom-vue"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "custom-vue/cus-prefix-component-names": [
      2,
      {
        "ignores": [],
        "prefix": "tms"
      }
    ]
  }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


