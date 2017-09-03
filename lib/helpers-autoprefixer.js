'use strict';

const autoprefixer = require('autoprefixer');
const Browsers = require('autoprefixer/lib/browsers');
const Prefixes = require('autoprefixer/lib/prefixes');

const prefixes = new Prefixes(
  autoprefixer.data.prefixes,
  new Browsers(autoprefixer.data.browsers, [])
);

module.exports = {

  /**
   * Check an at rule name against autoprefixer's list
   *
   * @param {string} identifier The at rule name as a string
   * @returns {object} The matching at rule object from autoprefixer
   */
  atRuleName (identifier) {
    return prefixes.remove[`@${identifier.toLowerCase()}`];
  },

  /**
   * Check a selector name against autoprefixer's list
   *
   * @param {string} identifier The selector name as a string
   * @returns {boolean} Whether our selector matches one on the autoprefixer list
   */
  selector (identifier) {
    return prefixes.remove.selectors.some(selectorObj => {
      return identifier.toLowerCase() === selectorObj.prefixed;
    });
  },

  /**
   * Check a media feature to see if it should be prefixed
   *
   * @param {string} identifier The media feature name as a string
   * @returns {boolean} Whether our media feature is a prefixed version of device-pixel-ratio
   */
  mediaFeature (identifier) {
    return identifier.toLowerCase().indexOf('device-pixel-ratio') !== -1;
  },

  /**
   * Check a property name against autoprefixer's list
   *
   * @param {string} identifier The property name as a string
   * @returns {object} The matching property object from autoprefixer
   */
  property (identifier) {
    return autoprefixer.data.prefixes[
      prefixes.unprefixed(identifier.toLowerCase())
    ];
  },

  /**
   * Check a property value to see if it should be prefixed
   *
   * @param {string} prop The property this value belongs to
   * @param {string} value The value we want to check
   * @returns {boolean} Whether our value should be prefixed or not
   */
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
