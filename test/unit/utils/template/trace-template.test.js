'use strict';

import { expect } from 'chai';
import { traceTemplate } from '../../../../src/utils/templates/resources/trace.template';
import { traceTestTemplate } from '../../../../src/utils/templates/tests/trace.template';

describe('trace-template', () => {
  describe('resources', () => {
    let args;
    let ids

    beforeEach(() => {
      args = {
        _: ['', '', '/any-path/{id}/data']
      };
      ids = ['id'];
    });

    it('should add the resource scenatio', () => {
      const result = traceTemplate(args, ids);

      expect(result).to.equal(`{
  "_trace" : {
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

      const result = traceTestTemplate(args, ids);

      expect(result).to.equal(`'use strict';
    
var app = require('../app');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('TRACE - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .trace('/any-path/idTBD/data')
      
      
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
