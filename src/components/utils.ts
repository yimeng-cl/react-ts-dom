const deleteNotExistElement = (elementIds: string[], treeData: any[]) => {
  const newTreeData = treeData.filter((item) => {
    let children = item.children;
    if (children) {
      item.children = deleteNotExistElement(elementIds, item.children);
    }
    // 这里删除，会直接把 父节点删除，子节点也没有保留，不过问题不大， 后面 addMissingElements 内会补充回来
    return elementIds.includes(item.elementId);
  });
  return newTreeData;
};

export const findElementById = (elementId: string, treeData: any[]) => {
  let result: any | undefined;
  treeData.forEach((item) => {
    if (item.elementId === elementId) {
      result = item;
    }
    const children = item.children;
    if (children) {
      const childResult = findElementById(elementId, children);
      if (childResult) {
        result = childResult;
      }
    }
  });
  return result;
};

const elementIds = [
  "input-837a9eb6",
  "input-5d4eed13",
  "input-f704accd",
  "input-9c8a6f09",
  "inlineContainer-0d5a97ca"
]
const testData = [
  {
    "name": "input-837a9eb6",
    "multi": false,
    "type": "textbox",
    "originType": "input",
    "elementId": "input-837a9eb6",
    "relatedModelField": "input-837a9eb6"
  },
  {
    "name": "input-5d4eed13",
    "multi": false,
    "type": "textbox",
    "originType": "input",
    "elementId": "input-5d4eed13",
    "relatedModelField": "input-5d4eed13"
  },
  {
    "name": "input-f704accd",
    "multi": false,
    "type": "textbox",
    "originType": "input",
    "elementId": "input-f704accd",
    "relatedModelField": "input-f704accd"
  },
  {
    "name": "input-9c8a6f09",
    "multi": false,
    "type": "textbox",
    "originType": "input",
    "elementId": "input-9c8a6f09",
    "relatedModelField": "input-9c8a6f09"
  },
  {
    "name": "inlineContainer-0d5a97ca",
    "multi": false,
    "children": [
      {
        "multi": false,
        "strPrev": "测试写回",
        "strNext": "写回后",
        "name": "radio-abf5e335",
        "text": "测试文本",
        "parentName": "inlineContainer-0d5a97ca",
        "type": "combobox",
        "originType": "radio",
        "elementId": "radio-abf5e335",
        "relatedModelField": "radio-abf5e335",
        "options": [
          {
            "label": "文案1",
            "value": "1"
          },
          {
            "label": "文案2",
            "value": "2"
          }
        ]
      }
    ],
    "type": "section",
    "originType": "inlineContainer",
    "elementId": "inlineContainer-0d5a97ca"
  }
]

// export const newTreeData = deleteNotExistElement(elementIds, testData)
export const findData = findElementById("radio-abf5e335", testData)