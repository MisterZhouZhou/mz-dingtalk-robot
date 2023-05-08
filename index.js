/* dingtalk-msg-send version is 1.0.6 commonjs */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var request = require('request');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var request__default = /*#__PURE__*/_interopDefaultLegacy(request);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/**
 * 抛出错误信息
 * @param msg err msg
 */
function inputError(msg) {
  throw new Error(msg);
}
// 获取text body
function getTextMsgBody(_ref) {
  var text = _ref.text,
    _ref$atAll = _ref.atAll,
    atAll = _ref$atAll === void 0 ? false : _ref$atAll,
    _ref$atMobiles = _ref.atMobiles,
    atMobiles = _ref$atMobiles === void 0 ? [] : _ref$atMobiles;
  if (!text) inputError('需要传入 text');
  return {
    msgtype: 'text',
    text: {
      content: text
    },
    at: {
      atMobiles: atMobiles,
      isAtAll: atAll
    }
  };
}
// link 消息body
function getLinkMsgBody(_ref2) {
  var title = _ref2.title,
    text = _ref2.text,
    msgUrl = _ref2.msgUrl,
    picUrl = _ref2.picUrl;
  if (!title || !text || !msgUrl) inputError('需要传入 title 和 text 和 msgUrl');
  return {
    msgtype: 'link',
    link: {
      title: title,
      text: text,
      picUrl: picUrl,
      messageUrl: msgUrl
    }
  };
}
// markdown 消息body
function getMarkDownMsgBody(_ref3) {
  var title = _ref3.title,
    mdText = _ref3.mdText,
    _ref3$atAll = _ref3.atAll,
    atAll = _ref3$atAll === void 0 ? false : _ref3$atAll,
    _ref3$atMobiles = _ref3.atMobiles,
    atMobiles = _ref3$atMobiles === void 0 ? [] : _ref3$atMobiles;
  if (!title || !mdText) inputError('需要传入 title 和 mdText');
  return {
    msgtype: 'markdown',
    markdown: {
      title: title,
      text: mdText
    },
    at: {
      atMobiles: atMobiles,
      isAtAll: atAll
    }
  };
}
// feedCard 消息body
function getFeedCardMsgBody(_ref4) {
  var links = _ref4.links;
  if (!links.length) inputError('需传入links');
  return {
    feedCard: {
      links: links.map(function (link) {
        return {
          title: link.title,
          messageURL: link.msgUrl,
          picURL: link.picUrl
        };
      })
    },
    msgtype: 'feedCard'
  };
}
// aloneAction 消息body
function getAloneActionMsgBody(_ref5) {
  var title = _ref5.title,
    mdText = _ref5.mdText,
    btns = _ref5.btns,
    _ref5$sort = _ref5.sort,
    sort = _ref5$sort === void 0 ? 'vertical' : _ref5$sort,
    _ref5$hideAvatar = _ref5.hideAvatar,
    hideAvatar = _ref5$hideAvatar === void 0 ? false : _ref5$hideAvatar;
  if (!title || !mdText || !btns.length) inputError('需要传入 title 和 mdText 和 btns');
  return {
    msgtype: 'actionCard',
    actionCard: {
      title: title,
      text: mdText,
      btns: btns.map(function (item) {
        return {
          title: item.title,
          actionURL: item.url
        };
      }),
      hideAvatar: hideAvatar ? '1' : '0',
      btnOrientation: sort === 'horizontal' ? '1' : '0'
    }
  };
}
// wholeAction 消息body
function getWholeActionMsgBody(_ref6) {
  var title = _ref6.title,
    mdText = _ref6.mdText,
    singleTitle = _ref6.singleTitle,
    singleUrl = _ref6.singleUrl,
    _ref6$sort = _ref6.sort,
    sort = _ref6$sort === void 0 ? 'vertical' : _ref6$sort,
    _ref6$hideAvatar = _ref6.hideAvatar,
    hideAvatar = _ref6$hideAvatar === void 0 ? false : _ref6$hideAvatar;
  if (!title || !mdText || !singleTitle || !singleUrl) inputError('需要传入 title 和 mdText 和 singleTitle 和 singleUrl');
  return {
    msgtype: 'actionCard',
    actionCard: {
      title: title,
      text: mdText,
      singleTitle: singleTitle,
      singleURL: singleUrl,
      hideAvatar: hideAvatar ? '1' : '0',
      btnOrientation: sort === 'horizontal' ? '1' : '0'
    }
  };
}
var DingTalk = /*#__PURE__*/function () {
  function DingTalk(token) {
    _classCallCheck(this, DingTalk);
    this.url = "https://oapi.dingtalk.com/robot/send?access_token=".concat(token);
  }
  // 发送消息
  _createClass(DingTalk, [{
    key: "_sendData",
    value: function _sendData(msgBody) {
      var _this = this;
      return new Promise(function (resolve) {
        request__default["default"]({
          url: _this.url,
          method: 'post',
          body: JSON.stringify(msgBody),
          headers: {
            'Content-Type': 'application/json'
          }
        }, function (_, _2, body) {
          resolve(body);
        });
      });
    }
    /**
     * text 类型消息
     * @param params { title: string, mdText: string, text: string }
     * @returns Promise
     */
  }, {
    key: "text",
    value: function text(params) {
      return this._sendData(getTextMsgBody(params));
    }
    /**
     * link 消息类型
     * @param param { title: string, text: string, msgUrl: string, picUrl: string }
     * @return Promise
     */
  }, {
    key: "link",
    value: function link(params) {
      return this._sendData(getLinkMsgBody(params));
    }
    /**
     * markdown 消息类型
     * @param param { title: string, mdText: string, msgUrl: string, picUrl: string }
     * @return Promise
     */
  }, {
    key: "markDown",
    value: function markDown(params) {
      return this._sendData(getMarkDownMsgBody(params));
    }
    /**
     * feedCard 消息类型
     * @param param { links: { title: string, msgUrl: string, picUrl: string }]
     * @return Promise
     */
  }, {
    key: "feedCard",
    value: function feedCard(params) {
      return this._sendData(getFeedCardMsgBody(params));
    }
    /**
     * aloneAction 消息类型
     * @param param { links: { title: string, mdText: string, btns: { title: string, url: string}, sort: 'vertical' | 'horizontal', hideAvatar: boolean }]
     * @return Promise
     */
  }, {
    key: "aloneAction",
    value: function aloneAction(params) {
      return this._sendData(getAloneActionMsgBody(params));
    }
    /**
     * aloneAction 消息类型
     * @param param { links: { title: string, mdText: string, singleTitle: string, singleUrl: string, hideAvatar: boolean }]
     * @return Promise
     */
  }, {
    key: "wholeAction",
    value: function wholeAction(params) {
      return this._sendData(getWholeActionMsgBody(params));
    }
  }]);
  return DingTalk;
}();

exports["default"] = DingTalk;
/* email: 16619930394@163.com */
