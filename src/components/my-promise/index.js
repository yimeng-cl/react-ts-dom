
const PADDING = 'padding'

const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class MyPromise {
  #state = PADDING;
  #data = undefined;
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (err) => {
      this.#changeState(REJECTED, err);
    };
    try {
      executor(resolve, reject)
    } catch (error) {
      this.#changeState(REJECTED, error);
    }
  }

  #changeState (state, data) {
    if (this.#state !== PADDING) {
      return;
    }
    this.#state = state;
    this.#data = data;

  }

}

const p = new MyPromise((resolve, reject) => {
  resolve('success');
});

const p1 = new Promise((1)=> { })
console.log(p1)