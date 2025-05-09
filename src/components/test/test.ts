
export const TestObj = () => {

  let schemaParams = 0

  const getSetAllDataFn = () => {
    schemaParams += 1
  }
  const beforeClose = () => {
    console.log(schemaParams, 'aa')
  }

  return {
    getSetAllDataFn,
    beforeClose
  }
}
