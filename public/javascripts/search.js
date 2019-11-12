// Search persons
var accounts = ['anhlt59','hello123','abcxyz','tuananh','newmoon','twilight'];
var txt1 = '';


accounts.map((name) => {txt1 += '<li>' + name + '</li>';});
document.getElementById('account').innerHTML = txt1;

function addAccount(){
    console.log('addAccount');
    let name = document.getElementById('getAccount').value;
    if (!accounts.includes(name) && name !== ''){
        accounts.push(name);
        txt1 += '<li>' + name + '</li>';
        document.getElementById('account').innerHTML = txt1;
    }
    document.getElementById('getAccount').value = "";
};

function deleteAccount(){
    console.log('deleteAccount');
    let name = document.getElementById('getAccount').value;
    if (accounts.includes(name)){
        index = accounts.indexOf(name)
        accounts.splice(index, 1);
        tag = '<li>' + name + '</li>'
        txt1 = txt1.replace(tag, ' ');
        document.getElementById('account').innerHTML = txt1;
    }
    document.getElementById('getAccount').value = "";
};


function findAccount(accountPassed){
    console.log('findAccount');
    let txt2 = '';
    accounts.map(account => {
        if(account.search(accountPassed) != -1){
            txt2 += '<li>' + account + '</li>'
        }
    });
    document.getElementById('account').innerHTML = txt2;
};
