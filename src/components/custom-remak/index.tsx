import cls from "classnames";
import React from "react";

const getRemarkDom = (remarkConfig: any) => {
  return ({ noMargin = false }) => {
    if (!remarkConfig.remarkText) {
      return null;
    }
    const remarkPrintDefine = remarkConfig.remarkPosition === "down" ? "bottom" : "top";
    // 是每页都打印，才设置 print-define 否则只显示一次
    const printDefine = remarkConfig.printType === "allPage" ? remarkPrintDefine : undefined;
    // 如果有备注就展示
    return (
      <div
        className={cls({
          "emr-nrs-view-remark-bottom": remarkConfig.remarkPosition === "down",
        })}
        style={{ whiteSpace: "pre-wrap", ...remarkConfig.remarkStyle, margin: noMargin && 0 }}
        // 这个ID 是给打印的时候用的
        id={`remark-print-${remarkPrintDefine}-dom`}
        print-define={printDefine}
      >
        {remarkConfig.remarkText}
      </div>
    );
  };
};

export default getRemarkDom;
