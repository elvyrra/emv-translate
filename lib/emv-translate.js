/*global define, module, exports*/
/* eslint no-invalid-this:0 */

/**
 * emv-translate.js {{ version }}
 *
 * @author Elvyrra S.A.S
 * @license http://rem.mit-license.org/ MIT
 */
'use strict';

(function(global, factory) {
    if(typeof exports === 'object' && typeof module !== 'undefined') {
        const EMV = require('emv');

        module.exports = factory(EMV);
    }
    else if (typeof define === 'function' && define.amd) {
        define(['emv'], factory);
    }
    else {
        factory(global.EMV);
    }
})(this, function(EMV) {
    EMV.translate = function(key, parameters, language) {
        const browserLanguages = window.navigator.languages;
        let lang = language;

        if(browserLanguages.indexOf(language) === -1) {
            lang = browserLanguages[0];
        }

        if(!EMV.config.translate) {
            return key;
        }

        if(!EMV.config.translate[lang]) {
            lang = Object.keys(EMV.config.translate)[0];
        }

        // Find the key
        let translation = EMV.config.translate[lang];
        const keySteps = key.split('.');
        const keyExists = keySteps.every((step) => {
            translation = translation[step];

            return translation !== undefined;
        });

        if(!keyExists || typeof translation !== 'string') {
            return key;
        }

        // We have the language key, insert parameters
        translation = translation.replace(/\{\s*(\w+)\s*\}/g, (match, param) => {
            return parameters[param] || match;
        });

        return translation;
    };

    EMV.transform('translate', (key, parameters) => {
        // Detect language
        return EMV.translate(key, parameters);
    });
});