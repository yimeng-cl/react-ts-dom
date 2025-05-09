class MaxRequires {
  #maxSize: number
  #taskList: (() => Promise<unknown>)[]
  #pendingPromise: { resolve: (value: unknown) => void, reject: (error: any) => void }[]
  constructor(maxSize: number = 5) {
    this.#maxSize = maxSize
    this.#taskList = []
    this.#pendingPromise = []
  }

  #run() {
    if (this.#maxSize > 0 && this.#taskList.length > 0) {
      this.#maxSize--
      const { resolve, reject } = this.#pendingPromise.shift()!
      const task = this.#taskList.shift()
      task!().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      }).finally(() => {
        this.#maxSize++
        this.#run()
      })
    }
  }

  required = (task: () => Promise<unknown>) => {
    return new Promise((resolve, reject) => {
      this.#taskList.push(task)
      this.#pendingPromise.push({
        resolve, reject
      })
      this.#run()
    })
  }
}

const required = new MaxRequires(1).required
const taskList = Array.from({ length: 2 }).map((e, index) => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(index + 1)
      }, 1000);
    })
  }
})


const func = async () => {
  let sum = 0
  required(taskList[0]).then(e => { sum += e; console.log(e, 'e') })
  required(taskList[1]).then(e => { sum += e; console.log(e, 'e') })
  console.log(sum)
}
func()

const b = new Promise((re) => {
  re(2)
})
const a = Promise.resolve(b)
a.then(res => {
  console.log(res)
})