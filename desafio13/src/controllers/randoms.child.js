const randoms = (cant) => {
    let sum = [];
    for (let i=0; i<cant; i++) {
      sum.push(Math.floor(Math.random() * 999));
    }
    const num = {}
    sum.forEach(e => (num[e] = num[e] + 1 || 1))
    return num;
};
  
process.on('message', (cant) => {
  process.send(randoms(cant));
});