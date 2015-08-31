# Command Line Interface

Sass Lint can be run via its Command Line Interface (CLI). To do so, run `sass-lint` from the command line.

By default, the command will run against the glob defined by a user's `file.include` option in their config, or a glob (or single file) can be passed as the last argument to the CLI to be explicitly run against.

## Options

The following options are available for the CLI:

* `-h, --help`: Outputs usage information for the CLI
* `-V, --version`: Outputs the version number of Sass Lint
* `-c, --config [path]`: Path to the config file that should be used, relative to the directory the the command is being run in (will override other config path options)
* `-i, --ignore [pattern]`: A pattern that should be ignored from linting. Multiple patterns can be used by separating each pattern by `, `. Patterns should be wrapped in quotes (will be merged with other ignore options)
* `-q, --no-exit`: Prevents the CLI from throwing an error if there is one (useful for development work)
* `-v, --verbose`: Verbose output (fully formatted output)
 
