'use strict';

const { expect } = require('chai');
const { healthData } = require('../../../../src/utils/templates/resources/health.template');
const { healthTest } = require('../../../../src/utils/templates/tests/health.template');

describe('health-template', () => {
  describe('resources', () => {
    it('returns the resource scenario', () => {
      expect(healthData).to.equal(`{
  "_get" : {
    "/health": [
      {
        "_req": {
        },
        "_res": {
          "_body": {
            "STATUS": "UP"
          }
        }
      }
    ]
  }
}`
      );
    });
  });

  describe('test', () => {
    it('returns the resource scenario', () => {
      expect(healthTest({})).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('GET - health ', () => {
  it('should exist', (done) => {
    request(app)
      .get('/health')
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal({
            'STATUS': 'UP'
          });
          done();
      });
  });
});`);
    });
  });
});
