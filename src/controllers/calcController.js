import axios from 'axios';

const promiseTemp = (idArray) => {
  const tetheredTemp = (resolve, reject) => {
    let data;
    resolve(data);
  }
  return new Promise(tetheredTemp);
}

