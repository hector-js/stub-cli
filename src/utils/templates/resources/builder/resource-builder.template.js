import { path } from './path.template';
import { getHeaders, getCookies, getStatus } from '../../../utils.cli';

export class ResourceBuilder {
  constructor(args, methodName, idsFormatted) {
    this.template = {};
    this.args = args;
    this.methodName = methodName;
    this.idsFormatted = idsFormatted;
    this.met;
    this.endpoint;
    this.req;
    this.res;
  }

  static aTemplate(args, methodName, idsFormatted) {
    return new ResourceBuilder(args, methodName, idsFormatted);
  }

  method() {
    this.met = this.template[this.methodName] = {};
    return this;
  }

  path() {
    path(this.args._[2], this.met);
    this.endpoint = this.met[Object.keys(this.met)[0]][0];
    return this;
  }

  xml() {
    if (this.args.xml) {
      this.res._xml = true;
    }
    return this;
  }

  req() {
    this.req = this.endpoint._req = {};
    return this;
  }

  res() {
    this.res = this.endpoint._res = {};
    return this;
  }

  delay() {
    if (this.args.delay) {
      this.res._delay = this.args.delay;
    }
    return this;
  }

  ids() {
    this.idsFormatted.forEach((value) => this.req[`_${value}`] = `${value}TBD`);
    return this;
  }

  reqBody() {
    if (this.args.xml) {
      this.req._body = '<xml><tbd>Xml request to be defined</tbd></xml>';
    } else {
      this.req._body = { dummy: 'dummy' };
    }
    return this;
  }

  resBody() {
    if (this.args.xml) {
      this.res._body = '<xml><tbd>Xml response to be defined</tbd></xml>';
    } else {
      this.res._body = { dummyResponse: 'dummyResponse' };
    }
    return this;
  }

  resBodyG() {
    if (this.args.xml) {
      this.res._body = '<xml><tbd>Xml response to be defined</tbd></xml>';
    } else {
      this.res._body = { body: 'To be defined' };
    }
    return this;
  }

  reqHeaders() {
    const headersArg = this.args.headers;
    if (headersArg) {
      this.req._headers = getHeaders(headersArg);
    }
    return this;
  }

  reqCookies() {
    const cookiesArg = this.args.cookies;
    if (cookiesArg) {
      this.req._cookies = getCookies(cookiesArg);
    }
    return this;
  }

  status() {
    const statusArg = this.args.status;
    if (statusArg) {
      this.res._status = getStatus(statusArg);
    }
    return this;
  }

  description() {
    const description = this.args.description;
    this.endpoint._description = `${description ? description : 'Description to be defined'}`;
    return this;
  }

  build() {
    return JSON.stringify(this.template, null, '  ');
  }
}

