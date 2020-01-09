import { method, endMethod } from './sections/method.template';
import { path, endPath, pathXml } from './sections/path.template';
import { ids } from './sections/ids.template';
import { reqHeaders } from './sections/req-headers.template';
import { getHeaders, getCookies, getStatus } from '../../../utils.cli';
import { reqCookies } from './sections/req-cookies.template';
import { description } from './sections/description.template';
import { reqBody, reqBodyXml } from './sections/req-body.template';
import { resBody, resBodyG, resBodyGXml, resBodyXml } from './sections/res-body.template';
import { status } from './sections/status.template';

export class ResourceBuilder {
  constructor(args, methodName, idsFormatted) {
    this.template = ``;
    this.args = args;
    this.methodName = methodName;
    this.idsFormatted = idsFormatted;
  }

  static aTemplate(args, methodName, idsFormatted) {
    return new ResourceBuilder(args, methodName, idsFormatted);
  }

  method() {
    this.template = this.template + method(this.methodName);
    return this;
  }

  path() {
    const pathString = this.args.xml ? pathXml(this.args._[2]) : path(this.args._[2]);
    this.template = this.template + pathString;
    return this;
  }

  ids() {
    this.template = this.template + ids(this.idsFormatted);
    return this;
  }

  reqBody() {
    const body = this.args.xml ? reqBodyXml() : reqBody();
    this.template = this.template + body;
    return this;
  }

  resBody() {
    const body = this.args.xml ? resBodyXml() : resBody();
    this.template = this.template + body;
    return this;
  }

  resBodyG() {
    const bodyGet = this.args.xml ? resBodyGXml() : resBodyG();
    this.template = this.template + bodyGet;
    return this;
  }

  reqHeaders() {
    const headersArg = this.args.headers;
    if (headersArg) {
      this.template = this.template + reqHeaders(getHeaders(headersArg));
    }
    return this;
  }

  reqCookies() {
    const cookiesArg = this.args.cookies;
    if (cookiesArg) {
      this.template = this.template + reqCookies(getCookies(cookiesArg));
    }
    return this;
  }

  status() {
    const statusArg = this.args.status;
    if (statusArg) {
      this.template = this.template + status(getStatus(statusArg));
    }
    return this;
  }

  description() {
    this.template = this.template + description(this.args.description);
    return this;
  }

  endPath() {
    this.template = this.template + endPath();
    return this;
  }

  endMethod() {
    this.template = this.template + endMethod();
    return this;
  }

  build() {
    return this.template;
  }
}

