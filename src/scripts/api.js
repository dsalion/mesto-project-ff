fetch('https://nomoreparties.co/v1/wff-cohort-17/cards', {
  headers: {
    authorization: '39372700-6f6a-42da-8d54-aca056f2fb48'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 
