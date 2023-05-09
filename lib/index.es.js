/* dingtalk-msg-send version is 1.0.9 commonjs */
import request from 'request';

/**
 * 抛出错误信息
 * @param msg err msg
 */
function inputError(msg) {
    throw new Error(msg);
}
// 获取text body
function getTextMsgBody(_a) {
    var text = _a.text, _b = _a.atAll, atAll = _b === void 0 ? false : _b, _c = _a.atMobiles, atMobiles = _c === void 0 ? [] : _c;
    if (!text)
        inputError('需要传入 text');
    return {
        msgtype: 'text',
        text: { content: text },
        at: { atMobiles: atMobiles, isAtAll: atAll },
    };
}
// link 消息body
function getLinkMsgBody(_a) {
    var title = _a.title, text = _a.text, msgUrl = _a.msgUrl, picUrl = _a.picUrl;
    if (!title || !text || !msgUrl)
        inputError('需要传入 title 和 text 和 msgUrl');
    return { msgtype: 'link', link: { title: title, text: text, picUrl: picUrl, messageUrl: msgUrl } };
}
// markdown 消息body
function getMarkDownMsgBody(_a) {
    var title = _a.title, mdText = _a.mdText, _b = _a.atAll, atAll = _b === void 0 ? false : _b, _c = _a.atMobiles, atMobiles = _c === void 0 ? [] : _c;
    if (!title || !mdText)
        inputError('需要传入 title 和 mdText');
    return {
        msgtype: 'markdown',
        markdown: { title: title, text: mdText },
        at: { atMobiles: atMobiles, isAtAll: atAll },
    };
}
// feedCard 消息body
function getFeedCardMsgBody(_a) {
    var links = _a.links;
    if (!links.length)
        inputError('需传入links');
    return {
        feedCard: {
            links: links.map(function (link) { return ({
                title: link.title,
                messageURL: link.msgUrl,
                picURL: link.picUrl,
            }); }),
        },
        msgtype: 'feedCard',
    };
}
// aloneAction 消息body
function getAloneActionMsgBody(_a) {
    var title = _a.title, mdText = _a.mdText, btns = _a.btns, _b = _a.sort, sort = _b === void 0 ? 'vertical' : _b, _c = _a.hideAvatar, hideAvatar = _c === void 0 ? false : _c;
    if (!title || !mdText || !btns.length)
        inputError('需要传入 title 和 mdText 和 btns');
    return {
        msgtype: 'actionCard',
        actionCard: {
            title: title,
            text: mdText,
            btns: btns.map(function (item) { return ({ title: item.title, actionURL: item.url }); }),
            hideAvatar: hideAvatar ? '1' : '0',
            btnOrientation: sort === 'horizontal' ? '1' : '0',
        },
    };
}
// wholeAction 消息body
function getWholeActionMsgBody(_a) {
    var title = _a.title, mdText = _a.mdText, singleTitle = _a.singleTitle, singleUrl = _a.singleUrl, _b = _a.sort, sort = _b === void 0 ? 'vertical' : _b, _c = _a.hideAvatar, hideAvatar = _c === void 0 ? false : _c;
    if (!title || !mdText || !singleTitle || !singleUrl)
        inputError('需要传入 title 和 mdText 和 singleTitle 和 singleUrl');
    return {
        msgtype: 'actionCard',
        actionCard: {
            title: title,
            text: mdText,
            singleTitle: singleTitle,
            singleURL: singleUrl,
            hideAvatar: hideAvatar ? '1' : '0',
            btnOrientation: sort === 'horizontal' ? '1' : '0',
        },
    };
}
var DingTalk = /** @class */ (function () {
    function DingTalk(token) {
        this.url = "https://oapi.dingtalk.com/robot/send?access_token=".concat(token);
    }
    // 发送消息
    DingTalk.prototype._sendData = function (msgBody) {
        var _this = this;
        return new Promise(function (resolve) {
            request({
                url: _this.url,
                method: 'post',
                body: JSON.stringify(msgBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            }, function (_, _2, body) {
                resolve(body);
            });
        });
    };
    /**
     * text 类型消息
     * @param params { title: string, mdText: string, text: string }
     * @returns Promise
     */
    DingTalk.prototype.text = function (params) {
        return this._sendData(getTextMsgBody(params));
    };
    /**
     * link 消息类型
     * @param param { title: string, text: string, msgUrl: string, picUrl: string }
     * @return Promise
     */
    DingTalk.prototype.link = function (params) {
        return this._sendData(getLinkMsgBody(params));
    };
    /**
     * markdown 消息类型
     * @param param { title: string, mdText: string, msgUrl: string, picUrl: string }
     * @return Promise
     */
    DingTalk.prototype.markDown = function (params) {
        return this._sendData(getMarkDownMsgBody(params));
    };
    /**
     * feedCard 消息类型
     * @param param { links: { title: string, msgUrl: string, picUrl: string }]
     * @return Promise
     */
    DingTalk.prototype.feedCard = function (params) {
        return this._sendData(getFeedCardMsgBody(params));
    };
    /**
     * aloneAction 消息类型
     * @param param { links: { title: string, mdText: string, btns: { title: string, url: string}, sort: 'vertical' | 'horizontal', hideAvatar: boolean }]
     * @return Promise
     */
    DingTalk.prototype.aloneAction = function (params) {
        return this._sendData(getAloneActionMsgBody(params));
    };
    /**
     * aloneAction 消息类型
     * @param param { links: { title: string, mdText: string, singleTitle: string, singleUrl: string, hideAvatar: boolean }]
     * @return Promise
     */
    DingTalk.prototype.wholeAction = function (params) {
        return this._sendData(getWholeActionMsgBody(params));
    };
    return DingTalk;
}());

export { DingTalk as default };
/* email: 16619930394@163.com */
