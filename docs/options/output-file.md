# Output File

Option `output-file`  will determine if formatted output should be written to a file. `output-file` should be set to a path plus file name relative to where Sass Lint is being run from. If not included, formatted output will be logged to the console.

Example:

```
sass-lint -c sass-lint.yml `**/*.scss` -v -q -o results.txt
```
or with long form flags
```
sass-lint --config sass-lint.yml `**/*.scss` --verbose --no-exit --output results.txt
```
