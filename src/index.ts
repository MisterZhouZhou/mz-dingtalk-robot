import request from 'request'

export type ISort = 'vertical' | 'horizontal'

interface IAt {
  atAll?: boolean
  atMobiles?: string[]
}

interface ILinkItem {
  title: string
  msgUrl: string
  picUrl?: string
}

// Text
export interface IText extends IAt {
  text: string
}

// Link
export interface ILinkMsg extends ILinkItem {
  text: string
}

// MarkDown
export interface IMarkDown extends IAt {
  title: string
  mdText: string
}

// FeecCard
export interface IFeedCard {
  links: ILinkItem[]
}

// AloneAction
export interface IAloneAction {
  title: string
  mdText: string
  btns: IBtnItem[]
  sort?: ISort
  hideAvatar?: boolean
}

interface IBtnItem {
  title: string
  url: string
}

// WholeAction
export interface IWholeAction {
  title: string
  mdText: string
  singleTitle: string
  singleUrl: string
  sort?: ISort
  hideAvatar?: boolean
}

/**
 * 抛出错误信息
 * @param msg err msg
 */
function inputError(msg: string) {
  throw new Error(msg)
}

// 获取text body
function getTextMsgBody({ text, atAll = false, atMobiles = [] }: IText) {
  if (!text) inputError('需要传入 text')
  return {
    msgtype: 'text',
    text: { content: text },
    at: { atMobiles, isAtAll: atAll },
  }
}

// link 消息body
function getLinkMsgBody({ title, text, msgUrl, picUrl }: ILinkMsg) {
  if (!title || !text || !msgUrl) inputError('需要传入 title 和 text 和 msgUrl')
  return { msgtype: 'link', link: { title, text, picUrl, messageUrl: msgUrl } }
}

// markdown 消息body
function getMarkDownMsgBody({
  title,
  mdText,
  atAll = false,
  atMobiles = [],
}: IMarkDown) {
  if (!title || !mdText) inputError('需要传入 title 和 mdText')
  return {
    msgtype: 'markdown',
    markdown: { title, text: mdText },
    at: { atMobiles, isAtAll: atAll },
  }
}

// feedCard 消息body
function getFeedCardMsgBody({ links }: IFeedCard) {
  if (!links.length) inputError('需传入links')
  return {
    feedCard: {
      links: links.map((link) => ({
        title: link.title,
        messageURL: link.msgUrl,
        picURL: link.picUrl,
      })),
    },
    msgtype: 'feedCard',
  }
}

// aloneAction 消息body
function getAloneActionMsgBody({
  title,
  mdText,
  btns,
  sort = 'vertical',
  hideAvatar = false,
}: IAloneAction) {
  if (!title || !mdText || !btns.length)
    inputError('需要传入 title 和 mdText 和 btns')
  return {
    msgtype: 'actionCard',
    actionCard: {
      title,
      text: mdText,
      btns: btns.map((item) => ({ title: item.title, actionURL: item.url })),
      hideAvatar: hideAvatar ? '1' : '0',
      btnOrientation: sort === 'horizontal' ? '1' : '0',
    },
  }
}

// wholeAction 消息body
function getWholeActionMsgBody({
  title,
  mdText,
  singleTitle,
  singleUrl,
  sort = 'vertical',
  hideAvatar = false,
}: IWholeAction) {
  if (!title || !mdText || !singleTitle || !singleUrl)
    inputError('需要传入 title 和 mdText 和 singleTitle 和 singleUrl')
  return {
    msgtype: 'actionCard',
    actionCard: {
      title,
      text: mdText,
      singleTitle,
      singleURL: singleUrl,
      hideAvatar: hideAvatar ? '1' : '0',
      btnOrientation: sort === 'horizontal' ? '1' : '0',
    },
  }
}

class DingTalk {
  url: string // 钉钉开放api

  public constructor(token: string) {
    this.url = `https://oapi.dingtalk.com/robot/send?access_token=${token}`
  }

  // 发送消息
  private _sendData(msgBody: any) {
    return new Promise((resolve) => {
      request(
        {
          url: this.url,
          method: 'post',
          body: JSON.stringify(msgBody),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        (_, _2, body) => {
          resolve(body)
        }
      )
    })
  }

  /**
   * text 类型消息
   * @param params { title: string, mdText: string, text: string }
   * @returns Promise
   */
  text(params: IText) {
    return this._sendData(getTextMsgBody(params))
  }

  /**
   * link 消息类型
   * @param param { title: string, text: string, msgUrl: string, picUrl: string }
   * @return Promise
   */
  link(params: ILinkMsg) {
    return this._sendData(getLinkMsgBody(params))
  }

  /**
   * markdown 消息类型
   * @param param { title: string, mdText: string, msgUrl: string, picUrl: string }
   * @return Promise
   */
  markDown(params: IMarkDown) {
    return this._sendData(getMarkDownMsgBody(params))
  }

  /**
   * feedCard 消息类型
   * @param param { links: { title: string, msgUrl: string, picUrl: string }]
   * @return Promise
   */
  feedCard(params: IFeedCard) {
    return this._sendData(getFeedCardMsgBody(params))
  }

  /**
   * aloneAction 消息类型
   * @param param { links: { title: string, mdText: string, btns: { title: string, url: string}, sort: 'vertical' | 'horizontal', hideAvatar: boolean }]
   * @return Promise
   */
  aloneAction(params: IAloneAction) {
    return this._sendData(getAloneActionMsgBody(params))
  }

  /**
   * aloneAction 消息类型
   * @param param { links: { title: string, mdText: string, singleTitle: string, singleUrl: string, hideAvatar: boolean }]
   * @return Promise
   */
  wholeAction(params: IWholeAction) {
    return this._sendData(getWholeActionMsgBody(params))
  }
}

export default DingTalk
