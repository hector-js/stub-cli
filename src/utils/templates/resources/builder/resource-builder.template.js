import { method, endMethod } from './sections/method.template';
import { path, endPath } from './sections/path.template';
import { ids } from './sections/ids.template';
import { reqHeaders } from './sections/req-headers.template';
import { getHeaders, getCookies, getStatus } from '../../../utils.cli';
import { reqCookies } from './sections/req-cookies.template';
import { description } from './sections/description.template';
import { reqBody } from './sections/req-body.template';
import { resBody, resBodyG } from './sections/res-body.template';
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
    this.template = this.template + path(this.args._[2]);
    return this;
  }

  ids() {
    this.template = this.template + ids(this.idsFormatted);
    return this;
  }

  reqBody() {
    this.template = this.template + reqBody();
    return this;
  }

  resBody() {
    this.template = this.template + resBody();
    return this;
  }

  resBodyG() {
    this.template = this.template + resBodyG();
    return this;
  }

  reqHeaders() {
    this.template = this.template + reqHeaders(getHeaders(this.args));
    return this;
  }

  reqCookies() {
    this.template = this.template + reqCookies(getCookies(this.args));
    return this;
  }

  status() {
    this.template = this.template + status(getStatus(this.args));
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

