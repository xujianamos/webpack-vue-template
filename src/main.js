const p1 = new Promise((resolve, reject) => {
  reject("第一个错");
});

const p2 = new Promise((resolve, reject) => {
  resolve("第二个对----");
});

Promise.allSettled([p1, p2]).then((results) => {
  console.log(results);
});
