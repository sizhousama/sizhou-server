/*
 * @Author: sizhou
 * @Date: 2020-09-10 10:43:36
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-11 16:15:45
 */
'use strict';

class ResponseStatus {
  // success
  Success(status, message, data) {
    return {
      status: status || 1,
      msg: message || 'Success',
      data,
    };
  }

  // fail
  Fail(status, message) {
    return {
      status: status || 0,
      msg: message || 'Server Error',
    };
  }
}

module.exports = new ResponseStatus();
