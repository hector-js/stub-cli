export function libraries(args) {
    var pathToApp = '';

    if (args && args.path) {
        args.path.split('/').forEach(() => pathToApp = pathToApp + '../');
    }

    return `'use strict';
    
var app = require('${pathToApp}../app');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;
`;

}
