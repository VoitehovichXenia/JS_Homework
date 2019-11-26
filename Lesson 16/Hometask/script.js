var  body = document.getElementsByTagName('body')[0],
    secondBlock = document.createElement('div'),
    container = document.getElementsByClassName('users')[0],
    usersData;

secondBlock.classList.add('container--second');
body.appendChild(secondBlock);

localStorage.clear();

var getUsersInfo = document.getElementsByClassName('button')[0];

getUsersInfo.addEventListener('click', getRequest,false);
container.onclick = function (event) {

    var target = event.target,
        usersCollection = container.getElementsByClassName('user_tab');

    if(target.className === 'user_tab'){
        secondBlock.textContent = null;
        drawUsersInfo(target);

        for(var m = 0; m < usersCollection.length; m++){
            usersCollection[m].classList.remove('user_tab--active');
        }

        target.classList.add('user_tab--active');
    }
}



function getRequest() {

    if (localStorage.getItem('usersData')) return drawUserList();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://reqres.in/auyfkiyfhukpi/users?page=2',true);
    xhr.send();
    xhr.onloadend = function () {

        var status = String(this.status)[0];

        if (status === '2') {
            try{
                localStorage.setItem('usersData',this.response);
                usersData = JSON.parse(localStorage.getItem('usersData')).data;
                drawUserList();
            } catch (error){
                drawErrorMessage('Can\'t get ','users information');
            }

        } else {
            drawErrorMessage(this.status, this.statusText);
        }

    }
}



function drawUserList() {

    container.textContent = null;

    for (var i = 0; i < usersData.length; i++){

        var tab = document.createElement('div');
        tab.classList.add('user_tab');

        if(!i){
            tab.classList.add('user_tab--active');
            drawUsersInfo(usersData[i]);
        }
        tab.setAttribute('id', usersData[i].id)
        tab.textContent = 'User ' + (i+1);
        container.appendChild(tab);
    }

}


function drawUsersInfo(user) {

    var usersCollection = container.getElementsByClassName('user_tab'),
        infoBlock = document.createElement('div'),
        img = document.createElement('img'),
        text = document.createElement('div');

    secondBlock.textContent = null;
    var user = usersData.find(function (element) {
        return element.id === +(user.id);
    });

    img.setAttribute('src', user.avatar);
    text.innerHTML = '<p class = "text_info">First name: ' + user['first_name'] +'\n'
        + '</p><p class = "text_info">Last name: ' + user['last_name']+'</p>';

    infoBlock.classList.add('users_info');

    infoBlock.appendChild(img);
    infoBlock.appendChild(text);

    secondBlock.appendChild(infoBlock);

}


function drawErrorMessage(name,message) {

    body.textContent = null;
    localStorage.clear();

    var errorMessage = document.createElement('div');

    if (!name){
        name = '';
    }
    if(!message){
        message = ''
    }

    body.classList.add('body');

    errorMessage.classList.add('error');
    errorMessage.innerHTML = '<p>Sorry, something went wrong.<br>\n '
        + name + message +'\n' +
        '<br><a href="https://www.google.com"><button class = "button button--google">Redirect to google</button></a>'

    body.appendChild(errorMessage);
}