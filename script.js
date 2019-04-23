$(window).ready(() => {
    function init_paragraphs_size() {
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

    // je met $('.autocomplete-search:first'); dans une variable
    let autocomplete_search = $('.autocomplete-search:first');
    // intialize la class de l'élément à hide
    // tu cache l'élément au chargement
    autocomplete_search.hide();
    // tu enregistre l'événemeent key down sur la barre de recherche
    // cad tu fais un event listenner sur l'input type search
    // je selectionne le pemier élément input de type search
    // ensuite j'appelle "on" cad le listenner
    function on_search_change(e) {
        // je récupère la valeur .val() de l'élément e.target dans une variable
        let value = $(e.target).val();
        // je fais un test ternaire pour voir si la longueur est
        // supérieur ou égal à deux sinon je cache
        value.length >= 2 ? autocomplete_search.show() : autocomplete_search.hide();
    }
    // je met un element html dans une variable
    let input_search = $('input[type="search"]:first');
    // focus quand on rentre l'élément
    input_search.on('keydown', on_search_change);
    // blurr c'est quand on click à côté
    input_search.on('blur', on_search_change);

    function write_projects_cards(data = []) {
        let projects_container = $('.card-projects-list:first');
        data.forEach(project => {
            let project_template = '<div class="col-sm-12 col-md-6 col-lg-4">\n' +
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
    }
    /*$.ajax({
        url: 'toto.php',
        method: 'pots',
        data: {
            'toto': 'test'
        },
        async: false
    }).done(data => {
        write_projects_cards(data);
    });*/

    let fake_data = [{
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
    }];

    write_projects_cards(fake_data);



});