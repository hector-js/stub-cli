import { describe, endDes } from './sections/describe.template';
import { it, endIt, endItDelay } from './sections/it.template';
import { request } from './sections/request.template';
import { methodReq } from './sections/method.template';
import { headers } from './sections/headers.template';
import { bodyReq, bodyReqXml } from './sections/body-req.template';
import { assert, status, noErrors, body, endAssert, bodyG, bodyGXml, emptyBody } from './sections/assert.template';
import { libraries } from './sections/libraries.template';
import { cookies } from './sections/cookies.template';
import { replacements, addReplacements, restoreReplacements } from '../../replacements';

export class TestBuilder {
  constructor(args, methodName, extraTemplate, description) {
    this.template = ``;
    this.args = args;
    this.methodName = methodName;
    this.description = description;
    this.storedReplacements = addReplacements(extraTemplate);
  }

  static aTemplate(args, methodName, extraTemplate, describe) {
    return new TestBuilder(args, methodName, extraTemplate, describe);
  }

  libraries() {
    this.template = this.template + libraries();
    return this;
  }

  describe() {
    this.template = this.template + describe(this.description || this.args._[2], this.methodName);
    return this;
  }

  it() {
    this.template = this.template + it();
    return this;
  }

  request() {
    this.template = this.template + request();
    return this;
  }

  method(idFormatted) {
    this.template = this.template + methodReq(this.methodName, this.description || this.args._[2], idFormatted);
    return this;
  }

  headers() {
    const headersArg = this.args.headers;
    if (headersArg) {
      this.template = this.template + headers(headersArg);
    }
    return this;
  }
  cookies() {
    const cookiesArg = this.args.cookies;
    if (cookiesArg) {
      this.template = this.template + cookies(cookiesArg);
    }
    return this;
  }

  bodyReq() {
    const body = this.args.xml ? bodyReqXml() : bodyReq();
    this.template = this.template + body;
    return this;
  }

  assert() {
    this.template = this.template + assert();
    return this;
  }

  noErrors() {
    this.template = this.template + noErrors();
    return this;
  }

  status() {
    this.template = this.template + status(this.args.status);
    return this;
  }

  body() {
    const bod = this.args.xml ? bodyGXml() : body();
    this.template = this.template + bod;
    return this;
  }

  bodyG() {
    const body = this.args.xml ? bodyGXml() : bodyG(this.fromTemplate, replacements().bodyKey, replacements().bodyVal);
    this.template = this.template + body;
    return this;
  }

  emptyBody() {
    this.template = this.template + emptyBody();
    return this;
  }

  endAssert() {
    this.template = this.template + endAssert();
    return this;
  }

  endDes() {
    this.template = this.template + endDes();
    return this;
  }

  endIt() {
    if (this.args.delay) {
      this.template = this.template + endItDelay(this.args.delay + 500);
    } else {
      this.template = this.template + endIt();
    }
    return this;
  }

  build() {
    restoreReplacements(this.storedReplacements);
    return this.template;
  }
}
