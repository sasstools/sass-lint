# Sass Lint Changelog

## v1.2.0
**September 7, 2015**

Rockin' Rules and Fixes!

Huge thanks to [Ben Griffith](https://github.com/bgriffith) and [Dan Purdy](https://github.com/DanPurdy) for their awesome work on getting 1.2.0 out the door and welcome them as collaborators!

**Fixes**

* Color Keyword with variable names no longer fails ([#126](https://github.com/sasstools/sass-lint/issues/126))
* Space After Comma rule no longer incorrectly reports end of lines as spaces ([#125](https://github.com/sasstools/sass-lint/issues/125))
* No longer errors on empty files ([#91](https://github.com/sasstools/sass-lint/issues/91))
* Update naming of `clean-import-paths` and `no-duplicate-properties` ([#118](https://github.com/sasstools/sass-lint/issues/118))
* Fix colons in parens being not parsed for `space-before-colon` ([#98](https://github.com/sasstools/sass-lint/issues/98))
* Fix issue with `space-after-comma` and new lines ([#105](https://github.com/sasstools/sass-lint/issues/105))
* Fix for `space-after-colon` only finding some colons ([#98](https://github.com/sasstools/sass-lint/issues/))
* Fix `clean-import-path` bug when importing CSS ([#95](https://github.com/sasstools/sass-lint/issues/))
* Fix EOL issues on Windows ([#65](https://github.com/sasstools/sass-lint/issues/))
* Fix issue with `mixins-before-declarations` for strange Gonzales parsing ([#80](https://github.com/sasstools/sass-lint/issues/80))
* Fix typo in `quotes` doc

**Changes**

* Clean up tests ([#123](https://github.com/sasstools/sass-lint/issues/123), [#110](https://github.com/sasstools/sass-lint/issues/111))
* Clean up ESLint testing
* Add tests for helper functions ([#116](https://github.com/sasstools/sass-lint/issues/116))

**New**

* Enhance `property-sort-order` with RECESS, SMACSS, and Concentric default sort orders ([#20](https://github.com/sasstools/sass-lint/issues/20))
* Add Sample Sass Lint config file ([#57](https://github.com/sasstools/sass-lint/issues/57))
* Add tests for CLI ([#72](https://github.com/sasstools/sass-lint/issues/72), [#108](https://github.com/sasstools/sass-lint/issues/108))
* Add ability to write output to file and change output formatting ([#48](https://github.com/sasstools/sass-lint/issues/48))
* Add ability to specify that configured rules override instead of merge with defaults ([#58](https://github.com/sasstools/sass-lint/issues/58))

**Rules**

* [no-color-keywords](https://github.com/sasstools/sass-lint/issues/101)
* [variable-for-property](https://github.com/sasstools/sass-lint/issues/33)
* [no-color-literals](https://github.com/sasstools/sass-lint/issues/27)
* [no-duplicate-properties](https://github.com/sasstools/sass-lint/issues/28)
* [border-zero](https://github.com/sasstools/sass-lint/issues/84)
* [no-css-comments](https://github.com/sasstools/sass-lint/issues/85)
* [no-invalid-hex](https://github.com/sasstools/sass-lint/issues/82)
* [empty-args](https://github.com/sasstools/sass-lint/issues/38)
* [hex-notation](https://github.com/sasstools/sass-lint/issues/77)
* [hex-length](https://github.com/sasstools/sass-lint/issues/73)
* [zero-unit](https://github.com/sasstools/sass-lint/issues/68)
* [clean-import-paths](https://github.com/sasstools/sass-lint/issues/29)

## v1.1.0
**August 31, 2015**

CLI Goodness

**New**

* Add Command Line Interface usage for Sass Lint! ([#42](https://github.com/sasstools/sass-lint/issues/42))
* Add ability to define custom config path ([#47](https://github.com/sasstools/sass-lint/issues/47))
* Add ability for config to be found recursively up the directory tree to a user's home directory

**Fixes**

* Empty line between root-level blocks ([#54](https://github.com/sasstools/sass-lint/issues/54))
* Bang whitespace include `!default` flag ([#53](https://github.com/sasstools/sass-lint/issues/53))
* One declaration per line inside arguments ([#51](https://github.com/sasstools/sass-lint/issues/51))
* Leading zero non-decimal issues ([#49](https://github.com/sasstools/sass-lint/issues/49))
* Indentation rule with parenthesis ([#46](https://github.com/sasstools/sass-lint/issues/46))

## v1.0.0
**August 29, 2015**

Initial Release!

**Rules**

* [extends-before-mixins](docs/rules/extends-before-mixins.md)
* [extends-before-declarations](docs/rules/extends-before-declarations.md)
* [placeholder-in-extend](docs/rules/placeholder-in-extend.md)
* [mixins-before-declarations](docs/rules/mixins-before-declarations.md)
* [one-declaration-per-line](docs/rules/one-declaration-per-line.md)
* [empty-line-between-blocks](docs/rules/empty-line-between-blocks.md)
* [single-line-per-selector](docs/rules/single-line-per-selector.md)
* [no-empty-rulesets](docs/rules/no-empty-rulesets.md)
* [no-extends](docs/rules/no-extends.md)
* [no-ids](docs/rules/no-ids.md)
* [no-important](docs/rules/no-important.md)
* [indentation](docs/rules/indentation.md)
* [leading-zero](docs/rules/leading-zero.md)
* [nesting-depth](docs/rules/nesting-depth.md)
* [property-sort-order](docs/rules/property-sort-order.md)
* [space-after-comma](docs/rules/space-after-comma.md)
* [space-before-colon](docs/rules/space-before-colon.md)
* [space-after-colon](docs/rules/space-after-colon.md)
* [space-before-brace](docs/rules/space-before-brace.md)
* [space-before-bang](docs/rules/space-before-bang.md)
* [space-after-bang](docs/rules/space-after-bang.md)
* [space-between-parens](docs/rules/space-between-parens.md)
* [trailing-semicolon](docs/rules/trailing-semicolon.md)
* [final-newline](docs/rules/final-newline.md)
* [no-debug](docs/rules/no-debug.md)
* [no-warn](docs/rules/no-warn.md)
* [quotes](docs/rules/quotes.md)
