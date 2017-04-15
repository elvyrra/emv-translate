/* global require */
'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiCheerio = require('chai-cheerio');
const EMV = require('emv');
global.EMV = EMV;
require('../lib/emv-translate');
const HTMLElement = require('html-element').Element;

global.HTMLElement = HTMLElement;
global.navigator = {
    languages : [
        'en', 'en-US', 'fr', 'fr-FR'
    ],
    language : 'en'
};

chai.use(chaiAsPromised);
chai.use(chaiCheerio);
chai.should();

const expect = chai.expect;
const utils = require('./utils');

describe('emv-translate', () => {
    let emv, $;

    beforeEach(() => {
        emv = new EMV({
            time : '00:00',
            date : '01/01/1970',
            menu : [
                {id : 1},
                {id : 2}
            ]
        });

        EMV.config.translate = {
            en : {
                today : 'We are {date}, time is {time}',
                menu : {
                    'label-1' : 'menu1',
                    'label-2' : 'menu2'
                }
            }
        };

        return utils.loadPage('test.html')

        .then((jquery) => {
            emv.$apply();

            $ = jquery;
        });
    });

    it('test translate transformation', () => {
        expect($("#date").text()).to.equal('We are 01/01/1970, time is 00:00');
        expect($("#without-time").text()).to.equal('We are 01/01/1970, time is {time}');

        emv.time = '01:00';
        expect($("#date").text()).to.equal('We are 01/01/1970, time is 01:00');

        expect($("#menu li").get(0).innerText).to.equal('menu1');
        expect($("#menu li").get(1).innerText).to.equal('menu2');

        expect($("#unexisting").text()).to.equal('unexisting');

        delete EMV.config.translate;
        // Change a model data to upadte the view
        emv.time = '00h00';
        expect($("#date").text()).to.equal('today');
    });
});