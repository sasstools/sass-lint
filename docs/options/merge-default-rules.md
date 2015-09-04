# Merge Default Rules

Option `merge-default-rules` will determine whether the rules present in a user's external configuration file or passed directly in to Sass Lint will override or merge with the default rules present in Sass Lint. All other configuration options will still be merged.

If an external configuration file has `merge-default-rules` set to `false`, its rules will override the default rules, but rules passed directly in to Sass Lint will be merged with the configuration file rules (unless they, to have `merge-default-rules` set to `false`, in which case they will override).

## Options

* `true`/`false` (defaults to `true`)
