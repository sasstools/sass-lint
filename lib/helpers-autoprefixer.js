'use strict';

const autoprefixer = require('autoprefixer');
const Browsers = require('autoprefixer/lib/browsers');
const Prefixes = require('autoprefixer/lib/prefixes');

const prefixes = new Prefixes(
  autoprefixer.data.prefixes,
  new Browsers(autoprefixer.data.browsers, [])
);

module.exports = {
  atRuleName (identifier) {
    return prefixes.remove[`@${identifier.toLowerCase()}`];
  },

  selector (identifier) {
    return prefixes.remove.selectors.some(selectorObj => {
      return identifier.toLowerCase() === selectorObj.prefixed;
    });
  },

  mediaFeature (identifier) {
    return identifier.toLowerCase().indexOf('device-pixel-ratio') !== -1;
  },

  property (identifier) {
    return autoprefixer.data.prefixes[
      prefixes.unprefixed(identifier.toLowerCase())
    ];
  },

  propertyValue (prop, value) {
    const possiblePrefixableValues =
      prefixes.remove[prop.toLowerCase()] &&
      prefixes.remove[prop.toLowerCase()].values;
    return (
      possiblePrefixableValues &&
      possiblePrefixableValues.some(valueObj => {
        return value.toLowerCase() === valueObj.prefixed;
      })
    );
  }
};
