$(window).ready(() => {
    // les bons constants
    const ERROR = 0;
    const SUCCESS = 1;
    const WARNING = 2;
    const NOTICE = 3;

    function add_bootstrap_alert(message, type = SUCCESS) {
        let alert_type;
        // un switch case avec le bonne type d'alert
        switch (type) {
            case SUCCESS:
                alert_type = 'success';
                break;
            case ERROR:
                alert_type = 'danger';
                break;
            case WARNING:
                alert_type = 'warning';
                break;
            case NOTICE:
                alert_type = 'notice';
                break;
            default:
                alert_type = 'success';
                break;
        }
        // concatène le html avec les bonnes variable
        let template = '<div class="alert alert-' + alert_type + ' alert-dismissible fade show" role="alert">\n' +
            message +
            '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
            '    <span aria-hidden="true">&times;</span>\n' +
            '  </button>\n' +
            '</div>';
        // pour l'ajouter à la fin du container. Je creer html + ajloute le template
        $('.alerts-container').html($('.alerts-container').html() + template);
        // pour initialiser
        $('.alert').alert();
    }

    function init_paragraphs_size() {
        // selecteur en jquery
        $('.card-projects-list .card .card-body').each((key, elem) => {
            // permet de recuperer la valeur de data-max_length de l'élément courant
            let max_length = $(elem).data('max_length');
            // ici on test si il existe
            if (max_length !== undefined) {
                // récupère le contenue format texte du premier élément du card-body
                let content = $(elem.childNodes[1]).text();
                let content_length = content.length;
                if (content_length > max_length) {
                    // recupère dans content avec substr la partie de chaine que je souhaite
                    content = content.substr(0, max_length - 3) + '...';
                    // remplacé le contenue du paragraph par le contenue troncaturé que tu as coupé
                    $(elem.childNodes[1]).html(content);
                }
            }
        });
    }

    function check_before_delete_project(project_id) {
        /*
        * ouvrire la modale
        * if(click sur on) {
        *   $.ajax({
                    url: '/Projet_B2/?controller=projects&action=delete',
                    type: 'get',
                    data: {
                        id: project_id
                    }
                }).done(get_projects);
        * }
        * else() {
        *  fermer la modale
        * }
        * */
    }

    function init_delete_project_button_on_click() {
        $('.delete_project').each((key, button) => {
            $(button).on('click', () => {
                let project_id = $(button).attr('data-project-id');
               // on supprime cette partie et on la remmplace par la ligne en bas
                $.ajax({
                    url: '/Projet_B2/?controller=projects&action=delete',
                    type: 'get',
                    data: {
                        id: project_id
                    }
                }).done(get_projects);
                //
                /*check_before_delete_project(project_id);*/
            });
        });
    }

    // je met $('.autocomplete-search:first'); dans une variable
    let autocomplete_search = $('.autocomplete-search:first');
    // intialize la class de l'élément à hide
    // tu cache l'élément au chargement
    autocomplete_search.hide();

    function on_search_change(e) {
        // je récupère la valeur .val() de l'élément e.target dans une variable
        let value = $(e.target).val();
        // je fais un test ternaire pour voir si la longueur est
        // supérieur ou égal à deux sinon je cache
        value.length >= 2 ? autocomplete_search.show() : autocomplete_search.hide();
    }


    (() => {
        // je met un element html dans une variable
        // CAD je selectionne le pemier élément input de type search
        let input_search = $('input[type="search"]:first');
        // Je fais deux event listenner sur l'input type search
        // J'appelle "on" cad le listenner
        // et j'enregistre l'événemeent key down et blur sur la barre de recherche
        input_search.on('keydown', on_search_change);
        input_search.on('blur', on_search_change);
    })();


    function write_projects_cards(data = []) {
        let projects_container = $('.card-projects-list:first');
        projects_container.html('');
        $(data).each((key, project) => {
            let project_template = '<div class="col-sm-12 col-md-6 col-lg-4">\n' +
                '<i class="fa fa-trash-alt delete_project" ' +
                '   style="position: absolute; z-index: 888; right: 25px; top: 25px; cursor: pointer;" ' +
                '   title="Supprimer ce projet" data-project-id="' + project.id + '"></i>' +
                '            <div class="card">\n' +
                '                <img class="card-img" src="capture.png" alt="Card image cap">\n' +
                '                <div class="card-img-overlay">\n' +
                '                    <h5 class="card-title">' + project.name + '</h5>\n' +
                '                </div>\n' +
                '                <div class="card-body" data-max_length="60">\n' +
                '                    <p class="card-text">' + project.description + '</p>\n' +
                (project.downloadable
                    ? '                    <a href="#" class="card-link">Télécharger</a>\n' : '\n') +
                '                    <a href="#" class="card-link enabled">Voir plus</a>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>';
            // permet d'écrire dans le container. Je recupère le code du html plus je rajoute projects_termplate
            // si il y quelque chose sa rajoute sinon ca récupère
            // c'était pour rajouter project_template

            projects_container.html(projects_container.html() + project_template);
        });
        init_paragraphs_size();
        init_delete_project_button_on_click();
    }

    /*$.ajax({
        url: 'toto.php',
        method: 'post',
        data: {
            'toto': 'test'
        },
        async: false
    }).done(data =>  write_projects_cards(data);
    });*/

    /*let fake_data = [{
        id: 0,
        path: '',
        name: 'Mon projet 1',
        description: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        downloadable: true,
        create_date: new Date().getDate()
    }, {
        id: 1,
        path: '',
        name: 'Mon projet 2',
        description: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a :D.',
        downloadable: true,
        create_date: new Date().getDate()
    }, {
        id: 2,
        path: '',
        name: 'Mon projet 3',
        description: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        downloadable: false,
        create_date: new Date().getDate()
    }, {
        id: 3,
        path: '',
        name: 'Mon projet 4',
        description: 'This is a longer card with supporting text below.',
        downloadable: false,
        create_date: new Date().getDate()
    }];*/

    function get_projects() {
        $.ajax({
            url: '/Projet_B2/?controller=projects',
            type: 'get'
        }).done(write_projects_cards);
    }
    get_projects();

    //write_projects_cards(fake_data);

    //selecteur de la classe add-button
    // on boucle sur le tableau d'éléments
    $('.add-button').each((key, button) => {
        // on crée un évènement
        $(button).on('click', () => {
            // une attribut personnalisé qu'on met dans add_types
            let add_type = $(button).data('add_type');
            // switch-case sur phone et mail (add-types)
            switch (add_type) {
                case 'phone-number':
                    // on transform la class phone-container en objet et on le met dans une variable
                    let phone_container = $('.phone-container:first');
                    // transform idTel en objet qu'on let dans tel
                    let tel = $('#tel');
                    // s'il y a rien dzns tel on lui met le focus
                    if (tel.val() === '') {
                        tel.focus();
                    }
                    // sinon on rajoute une input à la class 'phone-container'
                    else {
                        phone_container.append('<div style="margin-top: 5px; margin-bottom: 5px;">\n' +
                            '   <input type="tel" name="tel" placeholder="Telephone" class="form-control"/>\n' +
                            '</div>');
                    }
                    break;
                // même principe pour email
                case 'email':
                    let email_container = $('.email-container:first');
                    let email = $('#email');
                    if (email.val() === '') {
                        email.focus();
                    } else {
                        email_container.append('<div style="margin-top: 5px; margin-bottom: 5px;">\n' +
                            '   <input type="email" name="email" placeholder="Email" class="form-control"/>\n' +
                            '</div>');
                    }
                    break;
                default:
                    break;
            }
        });
    });

    // je met le formulaire dans le variable form_upload_file
    let form_upload_file = $('#upload_project');
    // j'appel l'évènement on à ce variable
    form_upload_file.on('submit', e => {
        // block l'envoi par défaut
        e.preventDefault();
        // j'appel à mon objet contenant l'id de l'input prop
        // le [0] récupère le file qu'on veut uploader
        let file_data = $('#project-uploaded').prop('files')[0];
        // j'instancie mon objet FormData qui va envelopper toute les données
        let form_data = new FormData();
        // mon premier data récupère le formulaire
        form_data.append('project', file_data);
        // je met à l'interieur le data nécessaire sachant que les noms doivent
        // correspondres au noms dans la fonction add_projects du ProjectsController
        // on récupère son valeur grâce au id correspodnant et à val();
        form_data.append('author', $('#recipient-name').val());
        form_data.append('name', $('#project-name').val());
        form_data.append('description', $('#message-text').val());
        form_data.append('downloadable', document.querySelector('#downloadable').checked);
        $.ajax({
            url: form_upload_file.attr('action'), // point to server-side PHP script
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post'
        }).done(data => {
            // côté callback avec les bon messgae d'érreurs
            let message = $('#upload-project-error-message');
            // premier message c'est un console.log
            // ajax renvoit toujours à la fin un callback si on a un status
            if (data.status) {
                console.log("it's ok");
                // une alert d'après la function js sachant que le type est success par défaut
                add_bootstrap_alert("L'upload s'est effectué avec succes !");
                get_projects();
            } else {
                // un message d'érreur de couleur rouge
                message.html(data.message);
                message.css('color', 'red');
            }
        });
    })
});