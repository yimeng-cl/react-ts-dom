// 支持的物料列表以及与嘉和类型的映射
export const typeMapping = {
  // checkbox 指的是通过 children 设置选项的单选多选
  dynamicCheckboxGroup: 'checkbox',
  dynamicRadioGroup: 'checkbox',
  // combobox 指的是通过 options 设置选项的的单选多选
  checkbox: 'combobox',
  radio: 'combobox',
  select: 'combobox',
  selectDict: 'selectDict',
  dynamicCheckbox: 'option',
  dynamicRadio: 'option',
  inlineContainer: 'section',
  input: 'textbox',
  date: 'datetimepicker',
  text: 'label',
  pageContainer: 'pageContainer',
  inlineReturn: 'inlineReturn',
  scoreBtn: 'scoreBtn',
  yesNo: 'yesNo',
  boolean: 'boolean',
  mulSelect: 'combobox',
  number: 'textbox',
  // 单位组件
  unit: 'unit',
  // 分数组件
  scoreCalculation: 'scoreCalculation'
};
export function getJson(elements: any, indexMap: any, parentName = "") {
  console.log("一梦的测试 log ~ getJson ~ elements:", elements);
  const filteredElements = Object.entries(elements).filter(
    ([, _]) => _.props?.xmlAttr && (_.props?.xmlAttr?.parentName || "") === parentName
  );
  // 根据 layout 顺序调整 filteredElements 顺序
  filteredElements.sort(([a], [b]) => indexMap[a] - indexMap[b]);
  console.log(filteredElements, "filteredElements");
  return filteredElements.map(([elementId, element]) => {
    const xmlAttr = element.props.xmlAttr;
    const id = xmlAttr.name;
    let children;
    if (id) {
      children = getJson(elements, indexMap, id);
    }
    let type: string = typeMapping[element.type] || element.type;
    if (element.props.showHide === true) {
      type = "showhide";
    }

    return {
      ...xmlAttr,
      children,
      name: id,
      type,
      originType: element.type,
      elementId,
      relatedModelField: element.props.relatedModelField as string,
      options: element.props.options,
    };
  });
}


export const mockData = {

  "inlineContainer-7e9dcc20": {
    "type": "inlineContainer",
    "props": {
      "textAlign": "left",
      "verticalAlign": "top",
      "layout": "left",
      "title": null,
      "xmlAttr": {
        "name": "inlineContainer-7e9dcc20",
        "multi": false
      }
    }
  },
  "radio-03b5218c": {
    "type": "radio",
    "props": {
      "options": [
        {
          "label": "左侧",
          "value": "1"
        },
        {
          "label": "右侧",
          "value": "2"
        }
      ],
      "optionType": "default",
      "size": "middle",
      "formProps": {
        "asteriskPosition": "front",
        "label": "左右侧",
        "readOnly": false,
        "required": false
      },
      "calcConfig": {
        "calcType": "selectedVal",
        "calcDetail": "",
        "value2MarkMap": {
          "1": {
            "mark": 0,
            "label": "左侧"
          },
          "2": {
            "mark": 0,
            "label": "右侧"
          }
        }
      },
      "width": 180,
      "schemaAlias": "左右侧",
      "relatedModelField": "leftRight",
      "xmlAttr": {
        "name": "radio-03b5218c",
        "multi": false,
        "strPrev": "左右测："
      }
    }
  },

}


export const mockIndexMap = {
  "inlineContainer-7e9dcc20": 1,
  "date-d13d66fb": 2,
  "inlineReturn-0b8ef5b0": 3,
  "select-01553160": 4,
  "inlineReturn-71df64e4": 5,
  "radio-abf8e3e5": 6,
  "inlineReturn-4d09d307": 7,
  "inlineReturn-44ab5ff0": 8,
  "inlineReturn-9fd2169f": 9,
  "select-dbba474c": 10,
  "input-367dc370": 11,
  "inlineReturn-4a5e5ede": 12,
  "unit-8b8c0422": 13,
  "inlineReturn-cd3b71ee": 14,
  "unit-2906b7ff": 15,
  "inlineReturn-78c76ac0": 16,
  "radio-2a2de3b7": 17,
  "inlineReturn-44c46d08": 18,
  "radio-e89ea14c": 19,
  "inlineReturn-01d74444": 20,
  "radio-d0abd462": 21,
  "inlineReturn-ed09dbb7": 22,
  "radio-d846a413": 23,
  "checkbox-9f31a7c9": 24,
  "inlineReturn-ceb871f7": 25,
  "input-9890c112": 26,
  "radio-03b5218c": 27
}