const assert = require('chai').assert;
const getFormatter = require('../lib/format/getFormatter');
const path = require('path');

describe('getFormatter()', () => {

  it('should return a function when a bundled formatter is requested', () => {

    const formatter = getFormatter('compact');

    assert.isFunction(formatter);
  });

  it('should return a function when no argument is passed', () => {
    const formatter = getFormatter();

    assert.isFunction(formatter);
  });

  it('should return a function when a custom formatter is requested', () => {
    const formatter = getFormatter(path.resolve(process.cwd(), 'tests/formatters/fixtures', 'simple.js'));

    assert.isFunction(formatter);
  });

  it('should return a function when a custom formatter is requested, also if the path has backslashes', () => {
    const formatter = getFormatter('.\\\\tests\\formatters\\fixtures\\simple.js');

    assert.isFunction(formatter);
  });

  it('should return null when a customer formatter doesn\'t exist', () => {
    const formatterPath = path.resolve('../lib/format/formatters', 'doesntexist.js');

    assert.throws(() => {
      getFormatter(formatterPath);
    }, `There was a problem loading formatter: ${formatterPath}\nError: Cannot find module '${formatterPath}'`);
  });

  it('should return null when a built-in formatter doesn\'t exist', () => {

    assert.throws(() => {
      getFormatter('special');
    }, 'There was a problem loading formatter: ./formatters/special\nError: Cannot find module \'./formatters/special\'');
  });

  it('should throw if the required formatter exists but has an error', () => {
    const formatterPath = path.resolve(process.cwd(), 'tests/formatters/fixtures', 'broken.js');

    assert.throws(() => {
      getFormatter(formatterPath);
    }, `There was a problem loading formatter: ${formatterPath}\nError: Cannot find module 'this-module-does-not-exist'`);
  });

  it('should return null when a non-string formatter name is passed', () => {
    const formatter = getFormatter(5);

    assert.isNull(formatter);
  });
});
