/*
 * @Author: sizhou
 * @Date: 2020-09-14 16:22:58
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-15 11:28:07
 */
'use strict';

const { genId } = require('../lib/tool_helper');
const Controller = require('egg').Controller;
const fs = require('mz/fs');
const OSS = require('ali-oss');
const { Success } = require('../lib/response_status');


const aliInfo = {
  region: 'oss-cn-shenzhen',
  bucket: 'sizhou',
  accessKeyId: '',
  accessKeySecret: '',
  // endpoint: 'oss.jcxcc.cn',
  // cname: true,
};

const client = new OSS(aliInfo);

class AliOssController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    let result;
    const name = 'blog/' + genId(10) + file.filename.split('.')[1];
    try {
      result = await client.put(name, file.filepath);
    } finally {
      await fs.unlink(file.filepath);
    }
    const data = { url: result.url };
    ctx.body = Success(0, 'success', data);
  }
}

module.exports = AliOssController;
