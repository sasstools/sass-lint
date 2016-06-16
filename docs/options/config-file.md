# Config File

### Configuration Options
When passing options directly to `Sass-lint` option `config-file` will tell Sass Lint the path to a custom config file. `config-file` should be set to a path plus file name relative to where Sass Lint is being run from OR an absolute path. If not included, Sass Lint will attempt to find the closest config file, or fall back to the default one.

### Config File Options

You may specify a config file in your current config file as follows:

```yaml
options:
  config-file: my-folder/my-other-config.yml
rules:
  no-ids: 2
```

The config file loaded from the `config-file` option will be treated as a base config file and as such will be extended with the rules and options in your main config. The path of this must be either an absolute path or a path relative to your main config file.

**Absolute path**

`/root/my/projects/config/extend/.sass-lint.yml`

**Relative path**

`extra-config/.sass-lint.yml`

## Example

**Project Structure**
```
my-project/
 - .sass-lint-A.yml
 - sub-folder/
   - .sass-lint-B.yml
```

**.sass-lint-A.yml**
```yml
options:
  config-file: sub-folder/.sass-lint-B.yml
rules:
  no-ids: 1
```

**.sass-lint-B.yml**
```yml
rules:
  no-ids: 2
  no-important: 1
```

**start Sass-lint from the my-project directory**

`sass-lint -c .sass-lint-A.yml`


In the scenario above the first config would load and merge the second config recursively.

The resulting config you could expect would be:

```yml
options:
  config-file: sub-folder/.sass-lint-B.yml
rules:
  no-ids: 1
  no-important: 1
```

Notice how the B config's `no-ids` rule is ignored as we are 'extending' A from B.

There is no limit to how many config files can be loaded, but please do be aware of circular dependencies.
