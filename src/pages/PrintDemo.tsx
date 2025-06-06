import React, { useState } from "react";
import { View, PreviewPrintView } from "@cffe/sylas";

/**
 * 打印功能演示页面
 * 用于学习和测试各种打印相关的功能
 */
const PrintDemo: React.FC = () => {
  // 示例数据
  const [printContent] = useState({});

  return (
    <div className='print-demo-container'>
      <View
        preFetch
        viewJson={{
          value: [
            {
              type: "container",
              props: {
                uid: "u846534646282",
                span: "3",
                showType: "label",
                label: "病人主诉：",
                hiddenConfig: {
                  fieldCode: "chief",
                },
              },
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: "",
                    },
                    {
                      text: "病人主12诉12：",
                      bold: true,
                    },
                    {
                      type: "input",
                      props: {
                        uid: "u178175603145",
                        placeholder: "文本框",
                        fieldConfig: {
                          name: "主诉",
                          code: "chief",
                          sourceType: "schema",
                        },
                      },
                      children: [
                        {
                          text: "123123",
                          bold: true,
                        },
                      ],
                    },
                    {
                      text: "",
                    },
                  ],
                },
              ],
            },
          ],
          pageConfig: {
            pageHeader: "shown",
            pageType: "A4",
            pageWidth: "210mm",
            pageHeight: "297mm",
            pageDirection: "vertical",
            pageMargins: {
              top: "25.4mm",
              bottom: "25.4mm",
              right: "31.8mm",
              left: "31.8mm",
            },
            printerName: "laser",
            duplexPrint: false,
          },
          global: {
            style: {
              fontSize: "14px",
              lineHeight: "1.5715",
            },
          },
        }}
        data={{}}
      />
    </div>
  );
};

export default PrintDemo;
