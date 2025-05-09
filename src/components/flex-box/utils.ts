
export const OPTIONS: { tip?: string; value: string; type?: string }[] = [
  {
    // name 默认与 id 一致
    tip: '节点名称，与子节点的 parentName 对应',
    value: 'name',
    type: 'input'
  },
  {
    tip: '父节点名称',
    value: 'parentName',
    type: 'input'
  },
  {
    tip: 'text (选中后的文案)',
    value: 'text'
  },
  {
    tip: 'text 前面的文字',
    value: 'strPrev'
  },
  {
    tip: 'text 后面的文字',
    value: 'strNext'
  },
  {
    tip: '结尾的文字，拼接到本区块内所有内容的后面',
    value: 'bd'
  },
  {
    tip: '换行写1，不换行写0或不写(暂时只针对拼接组件的单个组件回写生效)',
    value: 'wrap'
  }
];
