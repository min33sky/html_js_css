const CustomPromise = {
  async all(promises = []) {
    const result = [];

    for (let i = 0; i < promises.length; i++) {
      result.push(await promises[i]);
    }

    return result;
  },
};

function first() {
  return new Promise((resolve) => setTimeout(() => resolve(1), 4000));
}

function second() {
  return 2;
}

const result = await CustomPromise.all([first(), second()]);
console.log(result);
