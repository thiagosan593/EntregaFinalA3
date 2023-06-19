var sqlite3 = require('sqlite3').verbose();
var mkdirp = require('mkdirp');

mkdirp.sync('./database/data');
var db = new sqlite3.Database('./database/data/streambox.db');


var start = function start() {
    db.serialize(function () {
        createDatabase();
        insertUsuario();
        insertSeries()
        insertSeriesUsuario();
        insertplataformas();
        insertSeriePlataforma();

    });
}


function createDatabase() {

    db.run(`DROP TABLE usuario`)
    db.run(`DROP TABLE usuario_serie`)
    db.run(`DROP TABLE serie`)
    db.run(`DROP TABLE plataforma`)
    db.run(`DROP TABLE serie_plataforma`)
    
    db.run(`CREATE TABLE IF NOT EXISTS usuario (
        id_usuario INTEGER primary key autoincrement,
        nome varchar(255),
        email varchar(255),
        senha varchar(255),
        tipo char(1)
    )
    `);

    db.run(`CREATE TABLE IF NOT EXISTS usuario_serie (
        id_usuario_serie INTEGER primary key autoincrement,
        id_usuario INTEGER,
        id_serie INTEGER,
        concluido INTEGER,
        quero_assistir INTEGER,
        assistindo INTEGER,
        nao_recomendo INTEGER
    )
    `);

    db.run(`CREATE TABLE IF NOT EXISTS serie (
        id_serie INTEGER primary key autoincrement,
        nome varchar(255),
        imagem varchar(255),
        lancamento varchar(20),
        pais_origem varchar(255),
        temporadas INTEGER,
        episodios INTEGER,
        status varchar(20),
        sobre varchar(255)
    )
    `);

    db.run(`CREATE TABLE IF NOT EXISTS plataforma (
        id_plataforma INTEGER primary key autoincrement,
        nome varchar(255),
        imagem varchar(255)
    )
    `);

    db.run(`CREATE TABLE IF NOT EXISTS serie_plataforma (
        id_serie_plataforma INTEGER primary key autoincrement,
        id_serie INTEGER,
        id_plataforma INTEGER
    )
    `);
}
function insertplataformas() {
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'Netflix',
        'netflix.png'
    ]);
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'Globo Play',
        'globoplay.png'
    ]);
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'HBO',
        'hbo.png'
    ]);
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'Hulu',
        'hulu.png'
    ]);
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'look',
        'loook.png'
    ]);
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'Crunchyroll',
        'crunchyroll-50.png'
    ]);
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'Paramount Plus',
        'paramount-plus-.png'
    ]);
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'Globo Play',
        'globoplay.png'
    ]);
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'Prime Video',
        'amazon-prime-video.png'
    ]);
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'Disney +',
        'disneyplus.png'
    ]);
    db.run(`INSERT INTO plataforma (nome, imagem) VALUES (?, ?)`, [
        'Apple Tv',
        'appletv.png'
    ]);
}

function insertUsuario() {
    db.run("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [
        "jefferson",
        "jefferson@straembox.com",
        "123",
        "A"
    ], 0);
    db.run("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [
        "Thiago",
        "thiago@straembox.com",
        "123",
        "A"
    ], 0);
    db.run("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [
        "Maria",
        "maria@straembox.com",
        "123",
        "A"
    ], 0);
    db.run("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [
        "junin",
        "junin@hotmail.com",
        "123",
        "U"
    ], 0);
    db.run("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [
        "ana",
        "ana@hotmail.com",
        "123",
        "U"
    ], 0);
    db.run("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [
        "Pedro",
        "pedro@hotmail.com",
        "123",
        "U"
    ], 0);
    db.run("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [
        "Gilson",
        "gilson@hotmail.com",
        "123",
        "U"
    ], 0);
    db.run("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [
        "Alisson",
        "alison@hotmail.com",
        "123",
        "U"
    ], 0);
    db.run("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [
        "Lucas",
        "lucas@hotmail.com",
        "123",
        "U"
    ], 0);
    db.run("INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)", [
        "Rafael",
        "rafael@hotmail.com",
        "123",
        "U"
    ], 0);
}


function insertSeries() {
    db.run("INSERT INTO serie (nome,imagem,lancamento,pais_origem,temporadas,episodios,status ,sobre) VALUES (?, ?, ?, ?,?, ?, ?, ?)", [
        "Mr. Robot",
        "mr.robot.png",
        "2015",
        "Estados Unidos",
        "4",
        "45",
        "Finalizada",
        "Elliot é um jovem programador que trabalha como engenheiro de segurança virtual durante o dia, e como hacker vigilante durante a noite. Elliot se vê em uma encruzilhada quando é recrutado para destruir a firma que ele é pago para proteger."
    ], 0);

    db.run("INSERT INTO serie (nome, imagem, lancamento, pais_origem, temporadas, episodios, status, sobre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        "Breaking Bad",
        "breaking_bad.png",
        "2008",
        "Estados Unidos",
        "5",
        "62",
        "Finalizada",
        "Um professor de química do ensino médio, Walter White, entra para o mundo das drogas após ser diagnosticado com câncer terminal. Ele se torna um dos maiores produtores de metanfetamina e enfrenta diversos desafios nesse novo estilo de vida."
    ], 0);

    db.run("INSERT INTO serie (nome, imagem, lancamento, pais_origem, temporadas, episodios, status, sobre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        "Game of Thrones",
        "game_of_thrones.png",
        "2011",
        "Estados Unidos",
        "8",
        "73",
        "Finalizada",
        "Baseada na série de livros 'As Crônicas de Gelo e Fogo' de George R.R. Martin, Game of Thrones é uma história épica de intrigas políticas e batalhas pelo controle do Trono de Ferro, no continente fictício de Westeros."
    ], 0);

    db.run("INSERT INTO serie (nome, imagem, lancamento, pais_origem, temporadas, episodios, status, sobre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        "Friends",
        "friends.png",
        "1994",
        "Estados Unidos",
        "10",
        "236",
        "Finalizada",
        "Friends acompanha a vida de um grupo de seis amigos em Nova York, explorando os altos e baixos de suas carreiras, relacionamentos e amizades duradouras."
    ], 0);

    db.run("INSERT INTO serie (nome, imagem, lancamento, pais_origem, temporadas, episodios, status, sobre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        "The Office",
        "the_office.png",
        "2005",
        "Estados Unidos",
        "9",
        "201",
        "Finalizada",
        "The Office é uma comédia que se passa em um escritório de uma empresa de papel. A série utiliza o formato de falso documentário para retratar o cotidiano dos funcionários e suas interações hilariantes."
    ], 0);

    db.run("INSERT INTO serie (nome, imagem, lancamento, pais_origem, temporadas, episodios, status, sobre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        "Stranger Things",
        "stranger_things.png",
        "2016",
        "Estados Unidos",
        "4",
        "34",
        "Em andamento",
        "Stranger Things é uma série de suspense e ficção científica que se passa nos anos 80, onde um grupo de crianças se depara com eventos sobrenaturais e criaturas aterrorizantes em sua cidade."
    ], 0);

    db.run("INSERT INTO serie (nome, imagem, lancamento, pais_origem, temporadas, episodios, status, sobre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        "The Crown",
        "the_crown.png",
        "2016",
        "Reino Unido",
        "5",
        "50",
        "Em andamento",
        "The Crown retrata a vida da Rainha Elizabeth II desde seu casamento até os eventos recentes da realeza britânica, explorando os desafios políticos e pessoais enfrentados pela monarca."
    ], 0);

    db.run("INSERT INTO serie (nome, imagem, lancamento, pais_origem, temporadas, episodios, status, sobre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        "Black Mirror",
        "black_mirror.png",
        "2011",
        "Reino Unido",
        "5",
        "22",
        "Finalizada",
        "Black Mirror é uma série antológica de ficção científica que aborda os impactos da tecnologia na sociedade, explorando temas como a dependência de dispositivos eletrônicos e os dilemas éticos que surgem."
    ], 0);

    db.run("INSERT INTO serie (nome, imagem, lancamento, pais_origem, temporadas, episodios, status, sobre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        "The Mandalorian",
        "the_mandalorian.png",
        "2019",
        "Estados Unidos",
        "2",
        "16",
        "Em andamento",
        "Situada no universo de Star Wars, The Mandalorian segue as aventuras de um caçador de recompensas solitário nos confins da galáxia, longe da autoridade da Nova República."
    ], 0);

    db.run("INSERT INTO serie (nome, imagem, lancamento, pais_origem, temporadas, episodios, status, sobre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        "The Witcher",
        "the_witcher.png",
        "2019",
        "Estados Unidos",
        "2",
        "16",
        "Em andamento",
        "Baseada nos livros de fantasia de Andrzej Sapkowski, The Witcher segue o caçador de monstros Geralt de Rivia em suas missões em um mundo repleto de criaturas mágicas, política complexa e personagens intrigantes."
    ], 0);
}

function insertSeriesUsuario() {
    db.run(
        "INSERT INTO usuario_serie (id_usuario,id_serie,concluido,quero_assistir,assistindo,nao_recomendo) VALUES (?, ?, ?, ?,?, ?)",
        [2, 2, 1, 0, 1, 0],
        0
    );
}

function insertSeriePlataforma() {
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [1, 9], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [2, 1], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [3, 3], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [4, 9], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [4, 3], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [5, 1], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [5, 3], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [5, 7], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [6, 1], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [7, 1], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [8, 1], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [9, 9], 0);
    db.run("INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)", [10, 1], 0);
}




module.exports = {
    start
};