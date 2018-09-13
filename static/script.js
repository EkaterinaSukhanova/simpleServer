'use strict';
const BaseURL = 'http://188.246.227.119:8080';

const myFormText = document.querySelector('.text-form');
const myText = document.querySelector('#myText');
const textAreaMessage = document.querySelector('.text-area-message');

const myFormId = document.querySelector('.id-form');
const idUser = document.querySelector('#idUser');
const textAreaId = document.querySelector('.text-area-id');

const myFormAllUsers = document.querySelector('.all-users-form');
const textAreaAllUsers = document.querySelector('.text-area-all-users');

const myFormNewUser = document.querySelector('.new-user-form');
const nameNewUser = document.querySelector('#nameUser');
const emailNewUser = document.querySelector('#emailUser');
const ageNewUser = document.querySelector('#ageUser');

const getMessage = () => {
    fetch(`${BaseURL}/getMessage`).then((res) => {
        return res.text();
    }).then((data) => {
        textAreaMessage.innerHTML = data;
    }).catch((err) => {
        console.error(err);
    })
};

const sendMessage = () => {
    const data = myText.value;
    fetch(`${BaseURL}/sendMessage`, {
        method: 'POST',
        body: data,
    }).then(() => {
        myText.value = '';
        getMessage();
    }).catch((err) => {
        console.error(err);
    })
};


const getUser = () => {
    const data = idUser.value;
    fetch(`${BaseURL}/user/${data}`).then((res) => {
        return res.text();
    }).then((data) => {
        textAreaId.innerHTML = data;
    }).catch((err) => {
        console.error(err);
    })
};

const getAllUser = () => {
    fetch(`${BaseURL}/users`).then((res) => {
        return res.text();
    }).then((data) => {
        textAreaAllUsers.innerHTML = data;
    }).catch((err) => {
        console.error(err);
    })
};


const sendNewUser = () => {
    const data = {
        name: nameNewUser.value,
        email: emailNewUser.value,
        age: ageNewUser.value
    };
    fetch(`${BaseURL}/user`, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(() => {
        nameNewUser.value = '';
        emailNewUser.value = '';
        ageNewUser.value = '';

    }).catch((err) => {
        console.error(err);
    })
};

myFormText.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

myFormId.addEventListener('submit', (e) => {
    e.preventDefault();
    getUser();
});

myFormAllUsers.addEventListener('submit', (e) => {
    e.preventDefault();
    getAllUser();
});

myFormNewUser.addEventListener('submit', (e) => {
    e.preventDefault();
    sendNewUser();
});

window.onload = () => {
    getMessage();

};