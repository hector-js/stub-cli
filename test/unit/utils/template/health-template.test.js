'use strict';

import { expect } from 'chai';
import { healthData } from '../../../../src/utils/templates/resources/health.template';
import { healthTest } from '../../../../src/utils/templates/tests/health.template';

describe('health-template', () => {
  describe('resources', () => {
    it('should return the resource scenario', () => {
      expect(healthData).to.equal(`{
  "_get" : {
    "/health": [
      {
        "_body": {
          "STATUS": "UP"
        }
      }
    ]
  }
}`
      );
    });
  });

  describe('test', () => {
    it('should return the resource scenario', () => {
      expect(healthTest).to.equal(`'use strict';
    
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
});`
      );
    });
  });
});
