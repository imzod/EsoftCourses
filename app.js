const form = document.getElementsByTagName('form')[0];
const email = document.getElementById('email');

let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
let dateRegExp = /\d{4}-\d{1,2}-\d{1,2}/;
