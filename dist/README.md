# 介绍

钉钉机器人发送群消息封装的工具库

项目是使用`typescript`写的，使用在 node 服务端， 支持 commonjs 和 esm

# 支持消息模式

- text
- feedCard
- aloneAction
- wholeAction
- link
- markDown

# 使用

## 安装

```shell
// npm
$ npm install dingtalk-msg

// yarn
$ yarn add dingtalk-msg
```

## 初始化

```js
const DingTalk = require('dingtalk-msg')
const dingTalk = new DingTalk('你的群机器人access token')
```

## 使用方式

### text

```js
dingTalk.text({
  atAll: true,
  text: '通知测试 text',
})
```

### link

```js
dingTalk.link({
  title: '通知测试 link',
  text: '测试文案',
  msgUrl: 'http://www.baidu.com',
  picUrl:
    'https://images.pexels.com/photos/11369622/pexels-photo-11369622.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
})
```

### markdown

```js
dingTalk.markDown({
  atAll: true,
  title: '通知测试 markDown',
  mdText: `
  # 测试 markdown
  ## 测试用例
  ## 测软件
  `,
})
```

### feedCard

```js
dingTalk.feedCard({
  links: [
    {
      title: '通知测试 feedCard',
      msgUrl: 'http://www.baidu.com',
      picUrl:
        'https://images.pexels.com/photos/11369622/pexels-photo-11369622.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  ],
})
```

### aloneAction

```js
dingTalk.aloneAction({
  title: '通知测试 aloneAction',
  mdText: '# 测试 markdown',
  btns: [
    { title: '测试按钮 1', url: 'http://www.baidu.com' },
    { title: '测试按钮 2', url: 'http://www.baidu.com' },
  ],
  sort: 'horizontal',
  hideAvatar: false,
})
```

### wholeAction

```js
dingTalk.wholeAction({
  title: '通知测试 wholeAction',
  mdText: '# 测试 markdown, 钉钉目前发送消息需要添加消息关键词哦！',
  singleTitle: '测试 single 标题',
  singleUrl: 'http://www.baidu.com',
  sort: 'vertical',
  hideAvatar: false,
})
```
