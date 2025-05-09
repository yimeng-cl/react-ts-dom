

declare module '*.less';
declare module '*.svg';
declare module '*.png';

declare global {
  interface Window {



    // 归档调试字段
    isDebuggerArchive?: boolean;
    fixDocHtml: (id: string) => void;
    fixDocSchema?: (schema: IDescendant[]) => void;
    sona?: Sona;
    fixZsWesternHtml: (visitId: string) => void;
    /** 前端本地时间与服务器当前时间差值 */
    EMR_SERVER_TIME_OFFSET?: number;
    EMR_MODAL?: {
      canSaveHistoryModal?: boolean;
    };
    /** 针对接口请求参数 做全局拦截的便捷方法
     * 尽可能不要结合实际业务场景使用,否则可能会导致出问题难以定位
     */
    __emrModifyRequestOptions?: (options: AxiosRequestConfig) => AxiosRequestConfig;
  }
}
interface ImportMetaEnv {
  /** 后端接口代理 */
  readonly VITE_PROXY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
