export declare type ISort = 'vertical' | 'horizontal';
interface IAt {
    atAll?: boolean;
    atMobiles?: string[];
}
interface ILinkItem {
    title: string;
    msgUrl: string;
    picUrl?: string;
}
export interface IText extends IAt {
    text: string;
}
export interface ILinkMsg extends ILinkItem {
    text: string;
}
export interface IMarkDown extends IAt {
    title: string;
    mdText: string;
}
export interface IFeedCard {
    links: ILinkItem[];
}
export interface IAloneAction {
    title: string;
    mdText: string;
    btns: IBtnItem[];
    sort?: ISort;
    hideAvatar?: boolean;
}
interface IBtnItem {
    title: string;
    url: string;
}
export interface IWholeAction {
    title: string;
    mdText: string;
    singleTitle: string;
    singleUrl: string;
    sort?: ISort;
    hideAvatar?: boolean;
}
declare class DingTalk {
    url: string;
    constructor(token: string);
    private _sendData;
    /**
     * text 类型消息
     * @param params { title: string, mdText: string, text: string }
     * @returns Promise
     */
    text(params: IText): Promise<unknown>;
    /**
     * link 消息类型
     * @param param { title: string, text: string, msgUrl: string, picUrl: string }
     * @return Promise
     */
    link(params: ILinkMsg): Promise<unknown>;
    /**
     * markdown 消息类型
     * @param param { title: string, mdText: string, msgUrl: string, picUrl: string }
     * @return Promise
     */
    markDown(params: IMarkDown): Promise<unknown>;
    /**
     * feedCard 消息类型
     * @param param { links: { title: string, msgUrl: string, picUrl: string }]
     * @return Promise
     */
    feedCard(params: IFeedCard): Promise<unknown>;
    /**
     * aloneAction 消息类型
     * @param param { links: { title: string, mdText: string, btns: { title: string, url: string}, sort: 'vertical' | 'horizontal', hideAvatar: boolean }]
     * @return Promise
     */
    aloneAction(params: IAloneAction): Promise<unknown>;
    /**
     * aloneAction 消息类型
     * @param param { links: { title: string, mdText: string, singleTitle: string, singleUrl: string, hideAvatar: boolean }]
     * @return Promise
     */
    wholeAction(params: IWholeAction): Promise<unknown>;
}
export default DingTalk;
