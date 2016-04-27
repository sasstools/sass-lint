# Sass Lint Changelog

## v1.7.0

**April 27, 2016**

You wait months for one release and then four come along in a week!

**Fixes**
* Fixed an issue with final newline not registering correctly for `.sass` syntax [#627](https://github.com/sasstools/sass-lint/issues/627) & [#630](https://github.com/sasstools/sass-lint/issues/630).
* Fixed an issue with `placeholder-name-format` generating warnings on variables used as placeholder names.
* Fixed the `empty-args` rule being wrongly labeled as `no-empty-args` in lint warnings/errors [#625](https://github.com/sasstools/sass-lint/issues/625)
* Fixed an issue with `no-color-literals` incorrectly flagging variable names and map identifiers that shared their names with color literals [#538](https://github.com/sasstools/sass-lint/issues/538)
* CLI examples corrected thanks to [alxndr](https://github.com/alxndr) - [#649](https://github.com/sasstools/sass-lint/issues/649)

**Changes**
* `no-color-literals` now includes two extra options `allow-map-identifiers` and `allow-variable-identifiers` which allow you to fine tune your use of color literals in map identifiers/variables on top of the existing functionality [see the docs](https://github.com/sasstools/sass-lint/blob/develop/docs/rules/no-color-literals.md)
* Updated to `gonzales-pe-sl` v3.2.8

## v1.6.2

**April 22, 2016**

**Fixes**
* Fix `brace-style` rule incorrectly flagging `@imports` as single-line statements [#634](https://github.com/sasstools/sass-lint/issues/634)
* Fix `brace-style` rule not allowing multiline parameters [#632](https://github.com/sasstools/sass-lint/issues/632)
* `no-misspelled-properties` now correctly ignores vendor prefixes [#606](https://github.com/sasstools/sass-lint/issues/606)
* Now correctly strips double-barreled vendor prefixes such as `-moz-osx-`

## v.1.6.1

The update that time forgot

* Issues publishing to npm

## v1.6.0

**April 21, 2016**

The long lost 1.6 update

**WARNING**
* We've moved to the latest version of gonzales-pe and then onto our own fork in which we've fixed our issues with CRLF etc. All of our tests are passing but there may be unforeseen regressions in gonzales that we will aim to fix. If you find a problem like this please report it to us and we'll investigate further. You can then decide to keep your sass-lint dependency to 1.5.1 if you so choose.

**Changes**
* Updated all rules to work with the new Gonzales-pe 3.2.x release [#495](https://github.com/sasstools/sass-lint/issues/495)
> No breaking changes in the sense that all the rules are the same and pass the same tests or more BUT many did involve a complete re write.

* Now using gonzales-pe-sl 3.2.7 fork
* Update the no-mergeable-selectors rule to ignore certain situations and work a little more reliably across codebases
* Added BEM conventions to all naming rules [#614](https://github.com/sasstools/sass-lint/pull/614)
* Added Appveyor CI for testing against CRLF line endings on Windows


**CLI**
* Add max warnings option to the CLI --max-warnings [#568](https://github.com/sasstools/sass-lint/pull/568)

**New Rules**
* `no-trailing-whitespace` rule added [#605](https://github.com/sasstools/sass-lint/pull/605)

**Fixes**
* Fixed parsing error when using interpolated values [#44](https://github.com/sasstools/sass-lint/issues/44), [#184](https://github.com/sasstools/sass-lint/issues/184), [#210](https://github.com/sasstools/sass-lint/issues/210), [#222](https://github.com/sasstools/sass-lint/issues/222),
[#321](https://github.com/sasstools/sass-lint/issues/321),
[#486](https://github.com/sasstools/sass-lint/issues/486),
* Fixed parsing error when using the `!global` flag [#56](https://github.com/sasstools/sass-lint/issues/56)
* Having `-` within a class name will no longer return a parse error [#229](https://github.com/sasstools/sass-lint/issues/229)
* Fixed parsing error when using extrapolated variable as extend name [#313](https://github.com/sasstools/sass-lint/issues/313)
* Fixed an un-handled error thrown from the indentation rule [#389](https://github.com/sasstools/sass-lint/issues/389)
* Fixed an issue with final newline rule for sass [#445](https://github.com/sasstools/sass-lint/issues/445)
* Updated indentation rule to work with CRLF (indentation is mainly scss for the moment) [#524](https://github.com/sasstools/sass-lint/pull/524)
* Fixed parsing error when using nested maps [#531](https://github.com/sasstools/sass-lint/issues/531)
* Fixed parsing error when using variables for placeholder name [#532](https://github.com/sasstools/sass-lint/issues/532)
* Fixed issue with dots in filenames [#541](https://github.com/sasstools/sass-lint/pull/541)
* Fixed use of modulo operator in SCSS syntax [#565](https://github.com/sasstools/sass-lint/issues/565)
* Fixed an issue with space-around-operator and unicode [#620](https://github.com/sasstools/sass-lint/pull/620)
* Fixed an issue with CRLF line endings in the no-trailing-whitespace rule [#623](https://github.com/sasstools/sass-lint/pull/623)

**A big thank you to everyone who reported issues or contributed to the discussion around issues and also for everyone bearing with us while we go this monster update ready for you.**

## v1.5.1
**February 26, 2016**

Hotfix

**Fixes**
* Fix lodash dependancy issue [#549](https://github.com/sasstools/sass-lint/issues/549)

## v1.5.0
**January 28, 2016**

New year blues

**Changes**
* AST parse errors will now be returned to the user as `Fatal` lint errors this prevents un-handled errors breaking builds [#459](https://github.com/sasstools/sass-lint/pull/459)
* Sass-lint plugin for Brackets added to the README [#470](https://github.com/sasstools/sass-lint/issues/470)
* Sass-lint plugin for IntelliJ IDEA, RubyMine, WebStorm, PhpStorm, PyCharm, added to the README [#484](https://github.com/sasstools/sass-lint/issues/484)


**CLI**
* Updated error codes, whenever errors are present even when cli is using the `--no-exit` flag a error code of 1 will be output [#221](https://github.com/sasstools/sass-lint/issues/221)

**Fixes**
* Fixed an issue where an error of `next is undefined` would be thrown in the `space-after-colon` rule [#468](https://github.com/sasstools/sass-lint/issues/468)
* Fixed an issue with negative z-index values in the `space-around-operator` rule [#454](https://github.com/sasstools/sass-lint/issues/454)
* Fixed another minor issue with `space-around-operator` to prevent a possible crash [#483](https://github.com/sasstools/sass-lint/issues/483)

## v1.4.0
**December 10, 2015**

The long overdue update!

**Changes**
* The config file can now be cached for a small performance boost [#279](https://github.com/sasstools/sass-lint/issues/279)
* Added an `ignore-custom-properties` option to the property sort order rule, allowing you to ignore/include non standard properties in your property sort orders [#302](https://github.com/sasstools/sass-lint/issues/302)
* Streamlined the `force-pseudo-nesting`, `force-element-nesting` and `force-attribute-nesting` rules [#323](https://github.com/sasstools/sass-lint/pull/323)
* Improved the testing of our config handling [#403](https://github.com/sasstools/sass-lint/issues/403)
* Corrected the naming of the `no-misspelled-properties` tests [#405](https://github.com/sasstools/sass-lint/pull/405)
* Updated some of our dependencies to their latest versions [#428](https://github.com/sasstools/sass-lint/pull/428)
* `no-trailing-zero` now acts similar to the `no-unnecessary-mantissa` rule of scss-lint in that it warns about unnecessary decimals [#438](https://github.com/sasstools/sass-lint/issues/438)

**CLI**
* [-s --syntax] Syntax flag allows you to specify syntax of the file(s) you wish to lint [#381](https://github.com/sasstools/sass-lint/issues/381)

**New Rules**
* [space-around-operator](https://github.com/sasstools/sass-lint/blob/master/docs/rules/space-around-operator.md)
* [class-name-format](https://github.com/sasstools/sass-lint/blob/master/docs/rules/class-name-format.md)
* [id-name-format](https://github.com/sasstools/sass-lint/blob/master/docs/rules/id-name-format.md)
* [property-units](https://github.com/sasstools/sass-lint/blob/master/docs/rules/property-units.md)
* [bem-depth](https://github.com/sasstools/sass-lint/blob/master/docs/rules/bem-depth.md)

**Fixes**
* Pre emptive fix for `space-around-operator` with negative values [#394](https://github.com/sasstools/sass-lint/issues/394)
* Pre emptive fix for `space-around-operator` with percentage values [#425](https://github.com/sasstools/sass-lint/issues/425)
* `no-trailing-zero` now works as expected with 0 values after a decimal [#439](https://github.com/sasstools/sass-lint/issues/439)
* Percentage values are now correctly handled and reported in the `shorthand-values` rule [#435](https://github.com/sasstools/sass-lint/issues/435)
* `function-name-format` no longer incorrectly reports on valid default CSS & Sass functions [#442](https://github.com/sasstools/sass-lint/pull/442)
* Corrected a typo in config file documentation [#384](https://github.com/sasstools/sass-lint/pull/384)

**Brought to you by**

* [Sam Richard](https://github.com/Snugug)
* [Ben Griffith](https://github.com/bgriffith)
* [Dan Purdy](https://github.com/DanPurdy)
* [Ben Rothman](https://github.com/benthemonkey)
* [Don Abrams](https://github.com/donabrams)
* [Andrew Hays](https://github.com/Dru89)
* [Kaelig](https://github.com/kaelig)

**A big thankyou to everyone who reported issues or contributed to the discussion around issues**

## v1.3.3
**November 16, 2015**

**Changes**
* Added coveralls code coverage tool, updated relevant tests [#351](https://github.com/sasstools/sass-lint/pull/351)

**Fixes**
* Added missing `background-clip` property to the SMACCS sort order [#366](https://github.com/sasstools/sass-lint/issues/366)
* Fixed an issue with negative values in the `shorthand-values` rule [#375](https://github.com/sasstools/sass-lint/issues/375)
* Fixed an issue where `mixin-name-format` was attempting to lint extends [#396](https://github.com/sasstools/sass-lint/issues/396)

## v1.3.2
**October 28, 2015**

**Changes**
* Add tests for ignored files when using the CLI [#72](https://github.com/sasstools/sass-lint/issues/72)

**Fixes**
* Ignored files passed in using the `-i` flag are now correctly ignored [#129](https://github.com/sasstools/sass-lint/issues/129)
* Fixed an issue where the `no-url-protocols` rule would ignore the users' config [#335](https://github.com/sasstools/sass-lint/issues/335)
* The `hex-length` rule now correctly handles short hexes [#341](https://github.com/sasstools/sass-lint/issues/341)
* The `no-url-protocols` rule no longer incorrectly issues warnings for data-urls [#340](https://github.com/sasstools/sass-lint/issues/340)
* The `trailing-semicolon` rule no longer incorrectly issues warnings for nested properties [#359](https://github.com/sasstools/sass-lint/pull/359)
* The `space-before-brace` rule no longer incorrectly issues warnings for nested properties [#361](https://github.com/sasstools/sass-lint/pull/361)


## v1.3.1
**October 17, 2015**

**Changes**
* Added the missing rules `function-name-format`, `mixin-name-format`, `placeholder-name-format` and `variable-name-format` to the default config [#315](https://github.com/sasstools/sass-lint/issues/315)

**Fixes**

* Corrected an issue with the rule `brace-style` that would crash sass-lint [#301](https://github.com/sasstools/sass-lint/issues/301)
* Fixed an issue where user configs and options were being ignored or overwritten by default rules [#309](https://github.com/sasstools/sass-lint/issues/309)

## v1.3.0
**October 12, 2015**

Lint all the things!

1.3.0 introduces a whole raft of changes, fixes and new rules. Enjoy!

**Changes**

* Now testing against Node 4 [#145](https://github.com/sasstools/sass-lint/pull/145#issuecomment-138744764)
* `no-duplicate-properties` now accepts an exclusion whitelist [#156](https://github.com/sasstools/sass-lint/pull/156)
* IDE integrations added to README (Atom & Sublime Text) [#163](https://github.com/sasstools/sass-lint/pull/163)
* Output is now silenced on no errors [#141](https://github.com/sasstools/sass-lint/issues/141)
* Option `config-file` will tell Sass Lint the path to a custom config file. [#226](https://github.com/sasstools/sass-lint/issues/226)
* All rules except indentation now working correctly with `.sass` syntax [#258](https://github.com/sasstools/sass-lint/pull/258)
* `space-between-parens` rule now allows multiline arguments [#260](https://github.com/sasstools/sass-lint/issues/260)
* `empty-line-between-blocks` rule now optionally allows single line rulesets [#282](https://github.com/sasstools/sass-lint/issues/282)
* The `no-duplicate-properties` rule exclusion whitelist only works for properties directly after one another. [#280](https://github.com/sasstools/sass-lint/issues/280)


**CLI**

* [-f --format]() Format flag allows you to specify output format [#127](https://github.com/sasstools/sass-lint/issues/127)
* [-o --output]() Output flag allows you to specify a file to output to [#127](https://github.com/sasstools/sass-lint/issues/127)

**Rules**

* [brace-style](https://github.com/sasstools/sass-lint/issues/36)
* [force-attribute-nesting](https://github.com/sasstools/sass-lint/blob/master/docs/rules/force-attribute-nesting.md)
* [force-element-nesting](https://github.com/sasstools/sass-lint/blob/master/docs/rules/force-element-nesting.md)
* [force-pseudo-nesting](https://github.com/sasstools/sass-lint/blob/master/docs/rules/force-pseudo-nesting.md)
* [function-name-format](https://github.com/sasstools/sass-lint/blob/master/docs/rules/function-name-format.md)
* [mixin-name-format](https://github.com/sasstools/sass-lint/blob/master/docs/rules/mixin-name-format.md)
* [no-mergeable-selectors](https://github.com/sasstools/sass-lint/blob/master/docs/rules/no-mergeable-selectors.md)
* [no-misspelled-properties](https://github.com/sasstools/sass-lint/blob/master/docs/rules/no-misspelled-properties.md)
* [no-qualifying-elements](https://github.com/sasstools/sass-lint/blob/master/docs/rules/no-qualifying-elements.md)
* [no-trailing-zero](https://github.com/sasstools/sass-lint/blob/master/docs/rules/no-trailing-zero.md)
* [no-transition-all](https://github.com/sasstools/sass-lint/blob/master/docs/rules/no-transition-all.md)
* [no-url-protocols](https://github.com/sasstools/sass-lint/blob/master/docs/rules/no-url-protocols.md)
* [no-vendor-prefixes](https://github.com/sasstools/sass-lint/blob/master/docs/rules/no-vendor-prefixes.md)
* [placeholder-name-format](https://github.com/sasstools/sass-lint/blob/master/docs/rules/placeholder-name-format.md)
* [shorthand-values](https://github.com/sasstools/sass-lint/blob/master/docs/rules/shorthand-values.md)
* [url-quotes](https://github.com/sasstools/sass-lint/blob/master/docs/rules/url-quotes.md)
* [variable-name-format](https://github.com/sasstools/sass-lint/blob/master/docs/rules/variable-name-format.md)

**Fixes**

* Capitalised all warning messages [#137](https://github.com/sasstools/sass-lint/issues/137)
* Line endings should now be consistently working cross platform [#154](https://github.com/sasstools/sass-lint/pull/154)
* Fixed issue with non resetting test prefixes [#182](https://github.com/sasstools/sass-lint/issues/182)
* Fixed resetting of test defaults [#186](https://github.com/sasstools/sass-lint/issues/186)
* Documentation fixes [#235](https://github.com/sasstools/sass-lint/pull/235)
* Absolute config paths being converted to relative all the time [#223](https://github.com/sasstools/sass-lint/issues/223)
* Multiple fixes for `.sass` syntax [#258](https://github.com/sasstools/sass-lint/pull/258)
* Fixed an issue with the warning message for `no-qualifying-elements` [#262](https://github.com/sasstools/sass-lint/pull/262)
* Fixed a bug in `no-shorthand-values` rule [#263](https://github.com/sasstools/sass-lint/issues/263)
* `indentation` rule now works with maps and multiline arguments also fixes a few edge cases [#104](https://github.com/sasstools/sass-lint/issues/104) [260](https://github.com/sasstools/sass-lint/issues/260)


**Brought to you by..**

* [Sam Richard](https://github.com/Snugug)
* [Ben Griffith](https://github.com/bgriffith)
* [Dan Purdy](https://github.com/DanPurdy)
* [Ben Rothman](https://github.com/benthemonkey)
* [Michael Vendivel](https://github.com/mven)
* [Joshua Clanton](https://github.com/joshuacc)
* [Kenneth Skovhus](https://github.com/skovhus)
* [Nick](https://github.com/MethodGrab)
* [Anders Olsen Sandvik](https://github.com/Andersos)
* [Nicolas Fortin](https://github.com/zallek)
* [Alan Souza](https://github.com/alansouzati)

**A big thankyou to everyone who reported issues or contributed to the discussion around issues**

## v1.2.3
**October 5, 2015**

**Changes**

* Lock AST to known good version ([#245](https://github.com/sasstools/sass-lint/issues/245))

**Fixes**

* Top level mixins now don't raise an incorrect `mixins before declarations` warning
([#227](https://github.com/sasstools/sass-lint/issues/227))
* Fix an issue with `final-newline` for the `.sass` syntax ([#207](https://github.com/sasstools/sass-lint/issues/207))
* The `placeholder-in-extend` rule now works for the `.sass` syntax ([#199](https://github.com/sasstools/sass-lint/issues/199))
* The `clean-import-paths` rule now works for the `.sass` syntax ([#179](https://github.com/sasstools/sass-lint/issues/179))
* The `extends-before-mixins` rule now works for the `.sass` syntax ([#193](https://github.com/sasstools/sass-lint/issues/193))


## v1.2.2
**September 22, 2015**

**Fixes**

* CLI output formatting now works ([#213](https://github.com/sasstools/sass-lint/pull/213))


## v1.2.1
**September 19, 2015**

**Fixes**

* Extends rules now work with `.sass` syntax ([#189](https://github.com/sasstools/sass-lint/pull/189))
* Silence output if there are no errors ([#170](https://github.com/sasstools/sass-lint/pull/170))
* Single line per selector now works with `.sass` syntax ([#168](https://github.com/sasstools/sass-lint/pull/168))
* Custom options no longer overwrite defaults ([#159](https://github.com/sasstools/sass-lint/pull/159))
* Fix CLI config error ([#150](https://github.com/sasstools/sass-lint/pull/153))


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
* Fix for `space-after-colon` only finding some colons ([#98](https://github.com/sasstools/sass-lint/issues/98))
* Fix `clean-import-path` bug when importing CSS ([#95](https://github.com/sasstools/sass-lint/issues/95))
* Fix EOL issues on Windows ([#65](https://github.com/sasstools/sass-lint/issues/65))
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
