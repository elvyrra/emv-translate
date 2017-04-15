/*global define, module, exports*/
/* eslint no-invalid-this:0 */

/**
 * emv-translate.js 1.0.0
 *
 * @author Elvyrra S.A.S
 * @license http://rem.mit-license.org/ MIT
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
        var EMV = require('emv');

        module.exports = factory(EMV);
    } else if (typeof define === 'function' && define.amd) {
        define(['emv'], factory);
    } else {
        factory(global.EMV);
    }
})(undefined, function (EMV) {
    EMV.translate = function (key, parameters, language) {
        var browserLanguages = window.navigator.languages;
        var lang = language;

        if (browserLanguages.indexOf(language) === -1) {
            lang = browserLanguages[0];
        }

        if (!EMV.config.translate) {
            return key;
        }

        if (!EMV.config.translate[lang]) {
            lang = Object.keys(EMV.config.translate)[0];
        }

        // Find the key
        var translation = EMV.config.translate[lang];
        var keySteps = key.split('.');
        var keyExists = keySteps.every(function (step) {
            translation = translation[step];

            return translation !== undefined;
        });

        if (!keyExists || typeof translation !== 'string') {
            return key;
        }

        // We have the language key, insert parameters
        translation = translation.replace(/\{\s*(\w+)\s*\}/g, function (match, param) {
            return parameters[param] || match;
        });

        return translation;
    };

    EMV.transform('translate', function (key, parameters) {
        // Detect language
        return EMV.translate(key, parameters);
    });
});
