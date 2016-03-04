# Extends

Option `extends` will tell `sass-lint` to `require` additional defaults configs to load before loading your rules.

`extends` is expected to be an array of strings with either the module name to import or an absolute path to the file to load by default.

When using `extends`, the configs are loaded in the same order they are defined in and they each override the default config before finally loading your config/rules on top.

Example:

```yml
options:
  extends:
    # Load in company wide default config to start with
    - 'sass-lint-config-company'
rules:
  # Project specific rules
  extends-before-mixins: 0
```

In the above example, `sass-lint` will start with the default config file, then load and override that with `sass-lint-config-company`, and finally override everything with the defined `rules`.

## Writing a config module

When writing a config module to import, you should either export a JavaScript object representation of the config or use a JSON file.

### Exporting JavaScript object

package.json:

```json
{
  "name": "sass-lint-config-company",
  "version": "0.1.0",
  "main": "config.js"
}
```

config.js:

```js
// Define config inline
module.exports = {
  options: {},
  rules: {
    'extends-before-mixins': 0
  }
};


// Or, load config from local yml file
var fs = require('fs');
var path = require('path');
var yml = require('yml');

module.exports = yml.safeLoad(fs.readFileSync(path.join(__dirname, '.sass-lint.yml'), 'utf-8'));
```

### Using JSON config file

package.json:

```json
{
  "name": "sass-lint-config-company",
  "version": "0.1.0",
  "main": "config.json"
}
```

config.json:

```json
{
  "options": {},
  "rules": {
    "extends-before-mixins": 0
  }
}
```
