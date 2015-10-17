# Merge Default Rules

Option `merge-default-rules` will determine whether the rules present in a user's external configuration file or passed directly in to Sass Lint will override or merge with the default rules present in Sass Lint. All other configuration options will still be merged.

If an external configuration file has `merge-default-rules` set to `false`, its rules will override the default rules, but rules passed directly in to Sass Lint will be merged with the configuration file rules (unless they too have `merge-default-rules` set to `false`, in which case they will override).

## Options

* `true`/`false` (defaults to `true`)

## Examples

Below is a sample of sass-lints default rules. You can see the full default ruleset [here](https://github.com/sasstools/sass-lint/blob/develop/lib/config/sass-lint.yml).

```yml
options:
  formatter: stylish
files:
  include: '**/*.s+(a|c)ss'
rules:
  # Extends
  extends-before-mixins: 1
  extends-before-declarations: 1
  placeholder-in-extend: 1

  # Mixins
  mixins-before-declarations: 1
  no-color-literals: 1
```

Below is a default user configured ruleset containing only one rule with `merge-default-rules: true`

```yml
options:
  formatter: stylish
  merge-default-rules: true
files:
  include: '**/*.s+(a|c)ss'
rules:

  no-color-literals: 2
```

With `merge-default-rules: true` the rules applied to the linter would be as follows. Notice that `no-color-literals` is now set to `2` and the default ruleset has been merged with our user config

```yml
options:
  formatter: stylish
  merge-default-rules: true

files:
  include: '**/*.s+(a|c)ss'
rules:
  # Extends
  extends-before-mixins: 1
  extends-before-declarations: 1
  placeholder-in-extend: 1

  # Mixins
  mixins-before-declarations: 1
  no-color-literals: 2
```

Below is a default user configured ruleset containing only one rule with `merge-default-rules: false`

```yml
options:
  formatter: stylish
  merge-default-rules: false
files:
  include: '**/*.s+(a|c)ss'
rules:

  no-color-literals: 1
```

With `merge-default-rules: false` the rules applied to the linter would be as follows. Notice that `no-color-literals` is now set to `1` but rules not present in the user configuration are not merged.

```yml
options:
  formatter: stylish
  merge-default-rules: false

files:
  include: '**/*.s+(a|c)ss'
rules:

  no-color-literals: 1
```
