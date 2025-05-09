export type NodeType = {
  key: string;
  title: string;
  parentKey?: string;
  children?: NodeType[];
}

/** 生成树形数据
 * @param  level 层数
 * @param  parentKey 父节点key
 * @param  index 当前是第几层
*/
export const generateTreeData = (level: number, parentKey: string = ''): NodeType[] => {
  const data = [];
  for (let i = 1; i < level; i++) {
    const nodeKey = `${parentKey || 'node'}-${i}`;
    const node: NodeType = {
      parentKey: parentKey,
      key: nodeKey,
      title: nodeKey,
      children: generateTreeData(level - 1, nodeKey)
    };
    data.push(node);
  }
  return data;
}