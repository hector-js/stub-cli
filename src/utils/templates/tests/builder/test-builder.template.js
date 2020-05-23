import { existsSync, readFileSync } from 'fs';
import { describe, endDes } from './sections/describe.template';
import { it, endIt, endItDelay } from './sections/it.template';
import { request } from './sections/request.template';
import { methodReq } from './sections/method.template';
import { headers } from './sections/headers.template';
import { bodyReq, bodyReqXml } from './sections/body-req.template';
import { assert, status, noErrors, body, endAssert, bodyG, bodyGXml, emptyBody } from './sections/assert.template';
import { libraries } from './sections/libraries.template';
import { cookies } from './sections/cookies.template';
import { replacements, prependNewLines } from './sections/replacements';

export class TestBuilder {
  constructor(args, methodName, extraTemplate, description) {
    this.template = ``;
    this.args = args;
    this.methodName = methodName;
    this.description = description;
    if (this.args.template && existsSync(this.args.template)) {
      this.replacements = prependNewLines(readFileSync(this.args.template));
    }
    if (extraTemplate) {
      this.replacements = {
        ...extraTemplate,
        ...(this.replacements || {})
      };
    }
  }

  static aTemplate(args, methodName, extraTemplate, describe) {
    return new TestBuilder(args, methodName, extraTemplate, describe);
  }

  libraries() {
    this.template = this.template + libraries(this.replacements);
    return this;
  }

  describe() {
    this.template = this.template + describe(this.description || this.args._[2], this.methodName, this.replacements);
    return this;
  }

  it() {
    this.template = this.template + it(this.replacements);
    return this;
  }

  request() {
    this.template = this.template + request(this.replacements);
    return this;
  }

  method(idFormatted) {
    this.template = this.template + methodReq(this.methodName, this.description || this.args._[2], idFormatted, this.replacements);
    return this;
  }

  headers() {
    const headersArg = this.args.headers;
    if (headersArg) {
      this.template = this.template + headers(headersArg, this.replacements);
    }
    return this;
  }
  cookies() {
    const cookiesArg = this.args.cookies;
    if (cookiesArg) {
      this.template = this.template + cookies(cookiesArg, this.replacements);
    }
    return this;
  }

  bodyReq() {
    const body = this.args.xml ? bodyReqXml(this.replacements) : bodyReq(this.replacements);
    this.template = this.template + body;
    return this;
  }

  assert() {
    this.template = this.template + assert(this.replacements);
    return this;
  }

  noErrors() {
    this.template = this.template + noErrors(this.replacements);
    return this;
  }

  status() {
    this.template = this.template + status(this.args.status, this.replacements);
    return this;
  }

  body() {
    const bod = this.args.xml ? bodyGXml(this.replacements) : body(this.replacements);
    this.template = this.template + bod;
    return this;
  }

  bodyG() {
    const body = this.args.xml ?
      bodyGXml(this.replacements) :
      bodyG(this.replacements, replacements(this.replacements).bodyKey, replacements(this.replacements).bodyVal);
    this.template = this.template + body;
    return this;
  }

  emptyBody() {
    this.template = this.template + emptyBody(this.replacements);
    return this;
  }

  endAssert() {
    this.template = this.template + endAssert(this.replacements);
    return this;
  }

  endDes() {
    this.template = this.template + endDes(this.replacements);
    return this;
  }

  endIt() {
    if (this.args.delay) {
      this.template = this.template + endItDelay(this.args.delay + 500, this.replacements);
    } else {
      this.template = this.template + endIt(this.replacements);
    }
    return this;
  }

  build() {
    return this.template;
  }
}
