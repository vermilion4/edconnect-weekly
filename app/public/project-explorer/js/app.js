var user = null;
uri = window.location.href.split('/').pop();

function getCookieId() {
    if (document.cookie.includes('uid')) {
        let uidRow = document.cookie.split(';').find(row => row.startsWith('uid'));
        if (uidRow != -1) {
            return uidRow.split('=')[1];
        }
    }
    return false;
};

function showLoggedInUser() {

    let authElements = document.querySelectorAll('.auth-buttons');
    if (user) {
        authElements[1].classList.toggle('hidden')
        document.getElementById("username").textContent = 'Hi ' + user.firstname;
    } else {
        authElements[0].classList.toggle('hidden')
    }
};

async function initUser() {
    let userId = getCookieId()
    if (userId) {
        let response = await fetch('/api/users/' + userId)
        user = await response.json();
    } else if (!user && uri.startsWith('createProject.html')) {
        window.location = 'login.html';
    }
    showLoggedInUser();
};

function logOut() {
    let logOutBtn = $('#logout')
    logOutBtn.on('click', function (event) {
        document.cookie = `uid= ; expires = Sat, 03 Mar 2001 13:00:00 GMT; path=/`;
        window.location = "index.html";
    });
};

function programs() {
    let dropdown = $('#program');

    dropdown.empty();

    dropdown.append('<option selected="true" disabled>Choose Program</option>');
    dropdown.prop('selectedIndex', 0);

    const url = 'http://localhost:4000/api/programs';

// Populate dropdown with list of programs
    $.getJSON(url, function (data) {
        $.each(data, function (entry) {
            dropdown.append($('<option></option>').attr('value', data[entry]).text(data[entry]));
        })
    });
}

function years() {
    let dropdown2 = $('#year');

    dropdown2.empty();

    dropdown2.append('<option selected="true" disabled>Select Year</option>');
    dropdown2.prop('selectedIndex', 0);

    const url2 = 'http://localhost:4000/api/graduationYears';

// Populate dropdown with list of grad years
    $.getJSON(url2, function (data) {
        $.each(data, function (entry) {
            dropdown2.append($('<option></option>').attr('value', data[entry]).text(data[entry]));
        })
    });

}

function registerPost() {
    const data = {};

    $('#signupForm').on("submit", function (e) {
        e.preventDefault();

        data['firstname'] = $('#firstname').val();
        data['lastname'] = $('#lastname').val();
        data['email'] = $('#email').val();
        data['password'] = $('#password').val();
        data['matricNumber'] = $('#matricnumber').val();
        data['program'] = $('#program').val();
        data['graduationYear'] = $('#year').val();

        if(data['graduationYear'] === null){
            data['graduationYear'] = ''
        }
        if(data['program'] === null){
            data['program'] = ''
        }

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(async function (response) {
                const resp = await response.json()
                if (response.status == 200) {
                    document.cookie = `uid=${resp.data.id}; max-age=${60 * 60 * 24 * 7}; path=/`;
                    window.location = "index.html";
                } else {
                    $("#signupForm").prepend('<div id="erroralert" class="alert alert-danger" role="alert"></div>');

                    let err = $('#erroralert').css('margin-right','21%')
                        $.each(resp.errors, function (error) {

                            err.append($('<h6>').text(resp.errors[error]));
                        })
                    }
                })
            });
    };


function loginPost() {
    const data2 = {};

    $('#loginForm').on("submit", function (e) {
        e.preventDefault();

        data2['email'] = $('#email').val();
        data2['password'] = $('#password').val();

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data2)
        })
            .then(async function (response) {
                const resp = await response.json()
                if (response.status == 200) {
                    document.cookie = `uid=${resp.data.id}; max-age=${60 * 60 * 24 * 7}; path=/`;
                    window.location = "index.html";
                } else {
                    $("#loginForm").prepend('<div id="erroralert2" class="alert alert-danger" role="alert"></div>');

                    let err = $('#erroralert2')
                        err.append($('<h6>').text('Invalid email/password'));

                }
            })
    });
};

function projectPost() {
    const data3 = {};

    $('#createProjectForm').on("submit", function (e) {
        e.preventDefault();

        data3['name'] = $('#name').val();
        data3['abstract'] = $('#abstract').val();
        data3['authors'] = $('#authors').val().split(',');
        data3["tags"] = $("#tags").val().split(',');

        fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data3)
        })
            .then(async function (response) {
                const resp = await response.json()
                if (response.status == 200) {
                    window.location = "index.html";
                } else {
                    $("#createProjectForm").prepend('<div id="erroralert3" class="alert alert-danger" role="alert"></div>');

                    let err = $('#erroralert3')
                    $.each(resp.errors, function (error) {

                        err.append($('<h6>').text(resp.errors[error]));
                    })
                }
            })
    });
};

function projectList() {
    fetch('/api/projects')
        .then(response => response.json())
        .then(data => {
            projectData = data.slice(0, 4);
            $.each(projectData, function(project){

             var name = projectData[project].name;
             var authors = projectData[project].authors;
             var abstract = projectData[project].abstract;
             var tags = projectData[project].tags;
             var id = projectData[project].id;

             $('.showcase').append(`  <div class="col-md-3">\n` +
                 `                    <div class="card">\n` +
                 `                    <div class="card-body">\n` +
                 `                <a class="card-title text-primary" href='viewProject.html?id=${id}'>${name}</a>\n` +
                 `                <h5 class="card-subtitle text-muted">${authors}</h5>\n` +
                 `                <p>${abstract}</p>\n` +
                 `                <a class="card-link" href="#">${tags}</a>\n` +
                 `\n` +
                 `           </div>\n` +
                 `           </div>\n` +
                 `            </div>`)

            })


        })

}

function projectView() {
    const queryString = window.location.search;
    const urlP = new URLSearchParams(queryString);
    urlId = urlP.get('id');
    fetch('/api/projects/' + urlId)
        .then(response => response.json())
        .then(data => {
            if (data != null) {
                $('#project_name').text(data.name);
                $('#project_abstract').text(data.abstract);

                var list = $("#project_authors");
                var parent = list.parent();

                list.detach().empty().each(function(x){
                    for (var i = 0; i < data.authors.length; i++){
                        $(this).append('<li class="list-group-item">' + data.authors[i] + '</li>');
                        if (i == data.authors.length - 1){
                            $(this).appendTo(parent);
                        }
                    }
                });
                $('#project_tags').text(data.tags);
                fetch('/api/users/' + data.createdBy)
                    .then(response => response.json())
                    .then(data2 => {
                        projectAuthor = $('#project_author').text( data2.firstname + ' ' + data2.lastname);
                    })
            }
        })
}

$( document ).ready(function(event) {
    initUser();
    if (uri.startsWith('register.html')) {
        programs();
        years();
        registerPost();
    } else if (uri.startsWith('login.html')) {
        loginPost();
    }
    else if (uri.startsWith('createProject.html')) {
        projectPost();
        logOut();
    }
    else if (uri.startsWith('index.html')) {
        projectList()
        logOut();
    }
    else if (uri.startsWith('viewProject.html')) {
        projectView();
        logOut();
    }
    })


