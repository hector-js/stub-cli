'use strict';

import { expect } from 'chai';
import { headTemplate } from '../../../../src/utils/templates/resources/head.template';
import { headTestTemplate } from '../../../../src/utils/templates/tests/head.template';

describe('head-template', () => {
  describe('resources', () => {
    let args;
    let ids

    beforeEach(() => {
      args = {
        _: ['', '', '/any-path/{id}/data']
      };
      ids = ['id'];
    });

    it('should return the resource scenario', () => {
      const result = headTemplate(args, ids);

      expect(result).to.equal(`{
  "_head" : {
    "/any-path/{id}/data" : [
      {
        "_id": "idTBD",
        "_headers" : [  ],
        "_cookies" : [  ],
        
        "_description" : "Description to be defined" 
      }
    ]
  }
}`
      );
    });
  });

  describe('test',()=>{
    let args;
    let ids

    beforeEach(() => {
      args = {
        _: ['', '', '/any-path/{id}/data']
      };
      ids = ['id'];
    });

    it('should return a test template',()=>{

      const result = headTestTemplate(args, ids);

      expect(result).to.equal(`'use strict';
    
var app = require('../app');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('HEAD - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .head('/any-path/idTBD/data')
      
      
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.empty;
          done();
      });
  });
});`
            );
    });
  });
});
