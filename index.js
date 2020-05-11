const fetch = require('node-fetch');
const readline = require('readline-sync');


const cek = resi => new Promise((resolve,reject) => {
  fetch("https://jet.co.id/index/router/index.html", {
    method: 'POST',
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0",
      "X-Requested-With": "XMLHttpRequest"
    }, 
    body: `method=app.findTrack&data%5Bbillcode%5D=${resi}&data%5Blang%5D=in&data%5Bsource%5D=3`
  })
  .then(async res => {
    const hasil = await res.json();
    const json = JSON.parse(JSON.parse(hasil).data);
    resolve(json);
  });
});


(async () => {
  // JP7139218005
  while(true){

  
  const resi = await readline.question('Input Nomer Resi: ');
  const detail = await cek(resi);

  if(detail.details.length === 0){
    console.log('Resi tidak ditemukan.');
    continue;
  }

  detail.details.forEach((item,i) => {
      console.log(`${i+1}. [${item.scantime}] | ${item.scanstatus} - ${item.siteName} - ${item.city} | ${item.desc}`);
  });
  continue;
  }
})();