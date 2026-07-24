-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;

SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- -----------------------------------------------------
-- -----------------------------------------------------
-- -----------------------------------------------------

-- -----------------------------------------------------
-- -----------------------------------------------------


-- -----------------------------------------------------
-- Table `artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `artist` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(255) NULL DEFAULT NULL,
    `pays` VARCHAR(255) NULL DEFAULT NULL,
    `description` TEXT NULL DEFAULT NULL,
    `birthday` VARCHAR(20) NULL DEFAULT NULL,
    `death_date` VARCHAR(20) NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO
    `artist` (
        `id`,
        `name`,
        `photo`,
        `pays`,
        `description`,
        `birthday`,
        `death_date`
    )
VALUES (
        1,
        'Vincent van Gogh',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/1280px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
        'Hollande',
        'Peintre post-impressionniste néerlandais connu pour sa palette vibrante et ses coups de pinceau expressifs.',
        '1853-03-30 00:00:00',
        '1890-07-29 00:00:00'
    ),
    (
        2,
        'Pablo Picasso',
        'https://upload.wikimedia.org/wikipedia/commons/9/98/Pablo_picasso_1.jpg',
        'Espagne',
        'Peintre et sculpteur espagnol, cofondateur du cubisme.',
        '1881-10-25 00:00:00',
        '1973-04-08 00:00:00'
    ),
    (
        3,
        'Claude Monet',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/1280px-Claude_Monet_1899_Nadar_crop.jpg',
        'France',
        'Figure clé de l\'impressionnisme français.',
        '1840-11-14 00:00:00',
        '1926-12-05 00:00:00'
    ),
    (
        4,
        'Salvador Dalí',
        'https://static.wixstatic.com/media/21c73d_2f894469c5a9405c82792f103f5f8f64~mv2.jpg/v1/fill/w_1293,h_1600,al_c,q_90,enc_avif,quality_auto/21c73d_2f894469c5a9405c82792f103f5f8f64~mv2.jpg',
        'Espagne',
        'Peintre surréaliste espagnol connu pour ses images oniriques et fantasques.',
        '1904-05-11 00:00:00',
        '1989-01-23 00:00:00'
    ),
    (
        5,
        'Andy Warhol',
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTPFObJThKEgIOYd4WBWwr_CMX9OC-RaaAfctu_1wui6-cR9t3Cyd75CGmM9IVvpNYCAjTzCXgcvtyg0aStabDNmg',
        'États-Unis',
        'Chef de file du mouvement Pop Art.',
        '1928-08-06 00:00:00',
        '1987-02-22 00:00:00'
    ),(6, 'Edvard Munch', 
 'https://res.cloudinary.com/simpleview/image/upload/v1538059281/clients/norway/46f37185_b123_4793_943c_faca4b4f11ae_22963e88-1b22-4b82-909f-bfa9265d20a3.jpg',
 'Norvège', 'Pionnier de l\'expressionnisme, connu pour "Le Cri".',
 '1863-12-12 00:00:00', '1944-01-23 00:00:00'),
(7, 'Sandro Botticelli',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sandro_Botticelli_Self-portrait_ca_1475.jpg/1280px-Sandro_Botticelli_Self-portrait_ca_1475.jpg',
 'Italie', 'Maître de la Renaissance florentine, célèbre pour ses sujets mythologiques.',
 '1445-03-01 00:00:00', '1510-05-17 00:00:00'),
(8, 'Wassily Kandinsky',
 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Wassily_kandinsky.jpg',
 'Russie', 'Précurseur de l\'art abstrait et théoricien de la couleur.',
 '1866-12-16 00:00:00', '1944-12-13 00:00:00'),
(9, 'Johannes Vermeer',
 'https://www.babelio.com/users/AVT_Johannes-Vermeer_4022.jpeg',
 'Pays-Bas', 'Peintre baroque néerlandais spécialisé dans les scènes d\'intérieur et les portraits.',
 '1632-10-31 00:00:00', '1675-12-15 00:00:00'),
        (10,
        'Joseph Vernet',
        'https://upload.wikimedia.org/wikipedia/commons/a/a6/Mus%C3%A9e_Calvet_Van_Loo_Louis-Michel_Joseph_Vernet_1768.jpg',
        'France',
        'Peintre de paysages maritimes et de ports, maître du clair-obscur atmosphérique du XVIIIe siècle.',
        '1714-08-14 00:00:00',
        '1789-12-03 00:00:00'
    ),
    (
        11,
        'John Martin',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/John_Martin_by_Henry_Warren.jpg/1200px-John_Martin_by_Henry_Warren.jpg',
        'Royaume-Uni',
        'Peintre romantique britannique, connu pour ses scènes bibliques apocalyptiques et dramatiques.',
        '1789-07-19 00:00:00',
        '1854-02-17 00:00:00'
    ),
    (
        12,
        'Le Caravage',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Bild-Ottavio_Leoni%2C_Caravaggio.jpg/960px-Bild-Ottavio_Leoni%2C_Caravaggio.jpg',
        'Italie',
        'Maître du clair-obscur, révolutionna la peinture baroque avec un réalisme saisissant.',
        '1571-09-29 00:00:00',
        '1610-07-18 00:00:00'
    ),
    (
        13,
        'Rembrandt van Rijn',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Rembrandt_Self-portrait_%28Kenwood%29.jpg/1280px-Rembrandt_Self-portrait_%28Kenwood%29.jpg',
        'Pays-Bas',
        'Peintre et graveur néerlandais du siècle d\'or, célèbre pour ses autoportraits et ses scènes bibliques.',
        '1606-07-15 00:00:00',
        '1669-10-04 00:00:00'
    ),
    (
        14,
        'J. M. W. Turner',
        'https://upload.wikimedia.org/wikipedia/commons/9/9f/Joseph_Mallord_William_Turner_auto-retrato.jpg',
        'Royaume-Uni',
        'Précurseur de l\'impressionnisme, maître des paysages lumineux et maritimes aux effets atmosphériques puissants.',
        '1775-04-23 00:00:00',
        '1851-12-19 00:00:00'
    ),
    (
        15,
        'Caspar David Friedrich',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwscPEpra_HH0Jo3rwkQUlmmGL2Wq-RPDvHVBT267qy3GpwI5h7rbWaYC6rpIoErYZs0ADCjmJuUUgCpOgJFAl8Q',
        'Allemagne',
        'Peintre romantique allemand, connu pour ses paysages mélancoliques et spirituels.',
        '1774-09-05 00:00:00',
        '1840-05-07 00:00:00'
    );


-- -----------------------------------------------------
-- Table `movement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movement` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `photo` TEXT,
    `description` TEXT NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO
    `movement` (
        `id`,
        `name`,
        `photo`,
        `description`
    )
VALUES (
        1,
        'Impressionnisme',
        'https://upload.wikimedia.org/wikipedia/commons/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
        'Mouvement artistique du XIXe siècle caractérisé par des coups de pinceau visibles et une attention portée à la lumière.'
    ),
    (
        2,
        'Cubisme',
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Les_Demoiselles_d%27Avignon.jpg/1920px-Les_Demoiselles_d%27Avignon.jpg',
        'Mouvement d\'avant-garde rompant avec la perspective traditionnelle et représentant les objets sous plusieurs angles.'
    ),
    (
        3,
        'Surréalisme',
        'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
        'Mouvement visant à libérer l\'imaginaire en puisant dans les rêves et l\'inconscient.'
    ),
    (
        4,
        'Expressionnisme',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/1280px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
        'Style artistique exprimant les émotions humaines de manière intense et déformée.'
    ),
    (
        5,
        'Pop Art',
        'https://upload.wikimedia.org/wikipedia/en/4/4f/In_the_Car.jpg',
        'Mouvement artistique des années 1950-60 célébrant la culture populaire et les médias.'
    ),
    (
        6,
        'Symbolisme',
        'https://uploads6.wikiart.org/images/george-frederick-watts/hope-1886(1).jpg!Large.jpg',
        'Courant artistique du XIXe siècle fondé sur l\'évocation d\'images mystiques et oniriques.'
    ),
    (7, 'Renaissance',
 'https://static.nationalgeographic.fr/files/styles/image_3200/public/08-love-and-beauty.webp?w=1450&h=816',
 'Période artistique et intellectuelle marquée par un renouveau de l\'art classique.'),
(8, 'Abstraction',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Kandinsky_-_Jaune_Rouge_Bleu.jpg/2560px-Kandinsky_-_Jaune_Rouge_Bleu.jpg',
 'Courant artistique se détachant de la représentation du réel.'),
(9, 'Baroque',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Triumph_St_Ignatius_Pozzo.jpg/2560px-Triumph_St_Ignatius_Pozzo.jpg',
 'Style caractérisé par le réalisme, le détail et les jeux de lumière.'),
 (
        10,
        'Romantisme',
        'https://uploads0.wikiart.org/images/caspar-david-friedrich/the-wanderer-above-the-sea-of-fog.jpg!Large.jpg',
        'Mouvement du XIXe siècle valorisant l’émotion, la nature sublime et le drame personnel ou historique.'
    ),
    (
        11,
        'Réalisme',
        'https://uploads0.wikiart.org/images/jean-francois-millet/the-sower-1850(1).jpg!Large.jpg',
        'Courant artistique du XIXe siècle mettant en avant une représentation fidèle et non idéalisée du monde réel.'
    ),
    (
        12,
        'Classicisme',
        'https://uploads2.wikiart.org/00129/images/nicolas-poussin/et-in-arcadia-ego.jpg!Large.jpg',
        'Style artistique inspiré de l’Antiquité gréco-romaine, fondé sur l’harmonie, la clarté et la mesure.'
    );

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(55) NOT NULL,
    `photo` TEXT,
    `birthday` DATETIME NOT NULL,
    `date_inscription` DATETIME NOT NULL DEFAULT NOW(),
    `mail` VARCHAR(255) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `artist_id` INT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE,
    INDEX `fk_user_artist1_idx` (`artist_id` ASC) VISIBLE,
    CONSTRAINT `fk_user_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO
    `user` (
        `id`,
        `name`,
        `photo`,
        `birthday`,
        `date_inscription`,
        `mail`,
        `password`,
        `admin`,
        `artist_id`
    )
VALUES
    (
        1,
        'Alice Dupont',
        'https://i.pinimg.com/736x/c5/a2/2d/c5a22d749a0c10323bc47008e9961d41.jpg',
        '1990-05-12 00:00:00',
        '2023-04-01 10:30:00',
        'alice.dupont@example.com',
        'hashedpassword123',
        0,
        1
    ),
    (
        2,
        'Bob Martin',
        'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg',
        '1985-09-27 00:00:00',
        '2023-04-15 14:22:00',
        'bob.martin@example.com',
        'hashedpassword456',
        1,
        NULL
    ),
    (
        3,
        'Chloé Bernard',
        'https://i.pinimg.com/736x/68/df/95/68df95ccf2471d65fd52f7e65def404e.jpg',
        '1995-02-03 00:00:00',
        '2023-05-10 08:00:00',
        'chloe.bernard@example.com',
        'hashedpassword789',
        0,
        3
    ),
    (
        4,
        'David Lefèvre',
        'https://img.freepik.com/photos-gratuite/homme-noir-pose_23-2148171639.jpg?semt=ais_hybrid&w=740',
        '1978-12-11 00:00:00',
        '2023-06-18 17:45:00',
        'david.lefevre@example.com',
        'hashedpassword321',
        0,
        2
    ),
    (
        5,
        'Emma Roux',
        'https://images.unsplash.com/photo-1507019403270-cca502add9f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsJTIwZmlsbGV8ZW58MHx8MHx8fDA%3D',
        '2000-01-22 00:00:00',
        '2024-01-05 09:12:00',
        'emma.roux@example.com',
        'hashedpassword654',
        1,
        NULL
    ),
    (
        6,
        'Félix Moreau',
        'https://www.utopix.com/fr/blog/wp-content/uploads/2024/04/NGY5NDEzN2EtYjUxNy00Yjc2LWExNTktNjVlYWExYWRkODdh_68210697-79b2-40b6-8d49-08ac639970c6_profilhomme9-scaled.jpg',
        '1992-07-30 00:00:00',
        '2024-03-22 13:00:00',
        'felix.moreau@example.com',
        'hashedpassword987',
        0,
        5
    ),
    (
        7,
        'Gabriel Rousseau',
        'https://img.freepik.com/photos-gratuite/portrait-jeune-homme-africain-profil_176420-12620.jpg',
        '1980-03-05 00:00:00',
        '2024-02-10 11:45:00',
        'gabriel.rousseau@example.com',
        'hashedpassword111',
        0,
        7
    ),
    (
        8,
        'Isabelle Laurent',
        'https://www.gabrielgorgi.com/wp-content/uploads/2019/12/01.jpg',
        '1998-10-19 00:00:00',
        '2024-04-12 16:00:00',
        'isabelle.laurent@example.com',
        'hashedpassword222',
        0,
        9
    ),
    (
        9,
        'Julien Petit',
        'https://thumbs.dreamstime.com/b/portrait-beau-de-profil-de-jeune-homme-88646223.jpg',
        '1991-06-25 00:00:00',
        '2024-05-21 19:20:00',
        'julien.petit@example.com',
        'hashedpassword333',
        1,
        8
    );


-- -----------------------------------------------------
-- Table `artwork`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `artwork` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(55) NOT NULL,
    `user_id` INT NOT NULL,
    `date_artwork` VARCHAR(20),
    `photo` TEXT,
    `date_post` DATETIME NOT NULL DEFAULT NOW(),
    `musee` VARCHAR(255) NULL,
    `ville` VARCHAR(255) NULL,
    `pays` VARCHAR(255) NULL,
    `dimensions` VARCHAR(255) NOT NULL,
    `description` TEXT NULL DEFAULT NULL,
    `artist_id` INT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_artwork_user_idx` (`user_id` ASC) VISIBLE,
    INDEX `fk_artwork_artist1_idx` (`artist_id` ASC) VISIBLE,
    CONSTRAINT `fk_artwork_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`),
    CONSTRAINT `fk_artwork_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- INSERT TEST

INSERT INTO
    `artwork` (
        `id`,
        `name`,
        `user_id`,
        `date_artwork`,
        `photo`,
        `musee`,
        `ville`,
        `pays`,
        `dimensions`,
        `description`,
        `artist_id`
    )
VALUES (
        1,
        'La Nuit étoilée',
        1,
        '1889-06-01 00:00:00',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1920px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        'Musée d\'Orsay',
        'Paris',
        'France',
        '221 x 332 cm',
        'Paysage nocturne vibrant aux tourbillons célestes.',
        1
    ),
    (
        2,
        'Les Demoiselles d''Avignon',
        2,
        '1907-07-01 00:00:00',
        'https://d1ee3oaj5b5ueh.cloudfront.net/thumbs/1440xAUTO_processed_article_2023_08_98c1570a-020f-47ac-b934-bd123ed9b569-banner-master.webp',
        NULL,
        NULL,
        NULL,
        '221 x 332 cm',
        'Scène emblématique du cubisme avec cinq femmes nues aux formes anguleuses.',
        2
    ),
    (
        3,
        'Impression, soleil levant',
        4,
        '1872-11-13 00:00:00',
        'https://upload.wikimedia.org/wikipedia/commons/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
        NULL,
        NULL,
        NULL,
        '221 x 332 cm',
        'Tableau à l’origine du terme ''impressionnisme''.',
        3
    ),
    (
        4,
        'La Persistance de la mémoire',
        5,
        '1931-04-01 00:00:00',
        'https://misterprepa.net/wp-content/uploads/2023/07/Salvador-Dali-persistance-de-la-memoire-1931.jpg.webp',
        NULL,
        NULL,
        NULL,
        '221 x 332 cm',
        'Montres molles sur un paysage désertique, allégorie du temps.',
        4
    ),
    (
        5,
        'Marilyn Diptych',
        6,
        '1962-01-01 00:00:00',
        'https://www.singulart.com/blog/wp-content/uploads/2024/02/Marilyn-Diptych.jpg',
        NULL,
        NULL,
        NULL,
        '221 x 332 cm',
        'Portrait sériel de Marilyn Monroe devenu icône du Pop Art.',
        5
    ),
    (6, 'Le Cri', 3, '1893-01-01 00:00:00',
 'https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg',
 'Galerie nationale', 'Oslo', 'Norvège', '91 x 73 cm',
 'Icône de l\'expressionnisme représentant une angoisse existentielle.', 6),
(7, 'La Naissance de Vénus', 7, '1486-01-01 00:00:00',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/960px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
 'Galerie des Offices', 'Florence', 'Italie', '172.5 x 278.5 cm',
 'Chef-d’œuvre de la Renaissance représentant Vénus sortant de la mer.', 7),
(8, 'Composition VIII', 2, '1923-01-01 00:00:00',
 'https://upload.wikimedia.org/wikipedia/commons/4/47/Vassily_Kandinsky%2C_1923_-_Composition_8%2C_huile_sur_toile%2C_140_cm_x_201_cm%2C_Mus%C3%A9e_Guggenheim%2C_New_York.jpg',
 'Guggenheim Museum', 'New York', 'États-Unis', '140 x 201 cm',
 'Tableau abstrait composé de formes géométriques et lignes dynamiques.', 8),
(9, 'Guernica', 1, '1937-06-01 00:00:00',
 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Mural_del_Gernika.jpg',
 'Museo Reina Sofía', 'Madrid', 'Espagne', '349 x 776 cm',
 'Fresque monumentale dénonçant les horreurs de la guerre civile espagnole.', 2),
(10, 'La Jeune Fille à la perle', 8, '1665-01-01 00:00:00',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1280px-1665_Girl_with_a_Pearl_Earring.jpg',
 'Mauritshuis', 'La Haye', 'Pays-Bas', '44.5 x 39 cm',
 'Portrait intime et mystérieux surnommé la « Joconde du Nord ». ', 9),
 (11,'Vue de nuit du port de Bordeaux',1,'1757-01-01','https://www.meisterdrucke.fr/kunstwerke/1000px/Claude_Joseph_Vernet_-_The_Port_of_Bordeaux_Painting_by_Joseph_Vernet_(1714-1789)_18th_century_Paris_Mu_-_(MeisterDrucke-1021983).jpg','Musée des Beaux-Arts','Bordeaux','France','114 × 167 cm','Vue portuaire nocturne typique des Vues des Ports de France.',10),
(12,'Le Port de Dieppe',2,'1765-01-01','https://upload.wikimedia.org/wikipedia/commons/4/4a/Joseph_Vernet%2C_vue_du_port_de_Dieppe%2C1765.jpg','Musée de la Marine','Paris','France','98 × 142 cm','Scène animée du port de Dieppe, barils et marins.',10),
(13,'Shipwreck in a Thunderstorm',3,'1772-01-01','https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Claude-Joseph_Vernet_-_A_Shipwreck_in_Stormy_Seas_%28Temp%C3%AAte%29_-_c_1773_-_National_Gallery_UK.jpg/960px-Claude-Joseph_Vernet_-_A_Shipwreck_in_Stormy_Seas_%28Temp%C3%AAte%29_-_c_1773_-_National_Gallery_UK.jpg','Louvre','Paris','France','73 × 102 cm','Épave dans la tempête, dramatique et sombre.',10),
(15,'The Fighting Temeraire',2,'1839-01-01','https://upload.wikimedia.org/wikipedia/commons/3/30/The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg','National Gallery','London','Royaume-Uni','91 × 122 cm','Hommage à la fin de l’âge de la voile.',14),
(16,'Sunrise with Sea Monsters',3,'1800-01-01','https://upload.wikimedia.org/wikipedia/commons/f/fe/JMWTurner_Sunrise_with_Sea_Monsters.jpg','Tate Britain','London','Royaume-Uni','90 × 120 cm','Paysage marine au lever de soleil, atmosphérique.',14),
(17,'Rain, Steam and Speed',1,'1844-01-01','https://upload.wikimedia.org/wikipedia/commons/9/96/Turner_-_Rain%2C_Steam_and_Speed_-_National_Gallery_file.jpg','National Gallery','London','Royaume-Uni','90 × 121 cm','La modernité des chemins de fer, atmosphère vaporeuse.',14),
(18,'Wanderer above the Sea of Fog',2,'1817-01-01','https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/1280px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg','Hamburger Kunsthalle','Hamburg','Allemagne','95 × 74 cm','Symbole du romantisme et de la contemplation.',15),
(19,'Monk by the Sea',3,'1810-01-01','https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg/500px-Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg','Alte Nationalgalerie','Berlin','Allemagne','110 × 171 cm','Moine solitaire face à l’immensité marine.',15),
(20,'Chalk Cliffs on Rügen',1,'1818-01-01','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Caspar_David_Friedrich%27s_Chalk_Cliffs_on_R%C3%BCgen.jpg/500px-Caspar_David_Friedrich%27s_Chalk_Cliffs_on_R%C3%BCgen.jpg','Winterthur Museum','Winterthur','Suisse','90 × 70 cm','Falaises crayeuses et figures, paysage romantique.',15),
(21,'Moonrise over the Sea',2,'1821-01-01','https://upload.wikimedia.org/wikipedia/commons/0/01/Caspar_David_Friedrich_-_Mondaufgang_am_Meer_-_Google_Art_Project.jpg','Alte Nationalgalerie','Berlin','Allemagne','55 × 71 cm','Clair de lune et atmosphère mystérieuse.',15),
(22,'Woman at a Window',3,'1822-01-01','https://upload.wikimedia.org/wikipedia/commons/0/0f/Caspar_David_Friedrich_018.jpg','Nationalgalerie','Berlin','Allemagne','50 × 46 cm','Jeune femme regardant au-delà de la fenêtre.',15),
(23,'Abbey in the Oakwood',1,'1810-01-01','https://upload.wikimedia.org/wikipedia/commons/3/32/Caspar_David_Friedrich_-_Abtei_im_Eichwald_-_Google_Art_Project.jpg','Alte Nationalgalerie','Berlin','Allemagne','110 × 171 cm','Ruines d’abbaye dans une forêt de chênes.',15),
(24,'Souper à Emmaüs',2,'1601-01-01','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Supper_at_Emmaus-Caravaggio_%281601%29.jpg/960px-Supper_at_Emmaus-Caravaggio_%281601%29.jpg','National Gallery','London','Royaume-Uni','141 × 196 cm','Clair‑obscur dramatique, figure biblique.',12),
(25,'Judith décapitant Holopherne',3,'1599-01-01','https://upload.wikimedia.org/wikipedia/commons/7/7e/Judit_y_Holofernes%2C_por_Caravaggio.jpg','Galleria Nazionale d’Arte Antica','Rome','Italie','145 × 195 cm','Scène violente, contraste lumineux saisissant.',12),
(26,'La Vocazione di Matteo',1,'1600-01-01','https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Caravaggio_%E2%80%94_The_Calling_of_Saint_Matthew.jpg/330px-Caravaggio_%E2%80%94_The_Calling_of_Saint_Matthew.jpg','San Luigi dei Francesi','Rome','Italie','322 × 340 cm','Appel divin avec forte lumière directionnelle.',12),
(27,'Autoportrait jeune',2,'1632-01-01','https://www.meisterdrucke.fr/kunstwerke/1260px/Rembrandt_Harmensz_van_Rijn_-_Self_Portrait_as_a_Young_Man_c1628_%28oil_on_panel%29_-_%28MeisterDrucke-903688%29.jpg','Mauritshuis','La Haye','Pays‑Bas','86 × 67 cm','Jeune Rembrandt en clair‑obscur.',13),
(28,'La Ronde de nuit',3,'1642-01-01','https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Netherlands-4167_-_The_Night_Watch_%2811715123333%29.jpg/500px-Netherlands-4167_-_The_Night_Watch_%2811715123333%29.jpg','Rijksmuseum','Amsterdam','Pays‑Bas','363 × 437 cm','Groupe de milice avec jeux de lumière dynamiques.',13),
(29,'Belshazzar’s Feast',1,'1635-01-01','https://upload.wikimedia.org/wikipedia/commons/e/ec/John_Martin_-_Belshazzar%27s_Feast_-_Google_Art_Project.jpg','National Gallery','London','Royaume‑Uni','167 × 209 cm','Scène biblique riche et dramatique.',13),
(30,'Self‑Portrait at Prayer',2,'1632-01-01','https://upload.wikimedia.org/wikipedia/commons/1/1e/Rembrandt_-_An_Elderly_Man_in_Prayer_-_1967.16.jpg','Musée du Louvre','Paris','France','91 × 74 cm','Autoportrait introspectif intime.',13),
(31,'The Shipwreck',3,'1653-01-01','https://upload.wikimedia.org/wikipedia/commons/a/a0/Joseph_Mallord_William_Turner_-_The_Shipwreck_-_Google_Art_Project.jpg','Rijksmuseum','Amsterdam','Pays‑Bas','60 × 80 cm','Tempête maritime, tonalité sombre.',13),
(32,'The Slave Ship',1,'1840-01-01','https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Slave-ship.jpg/1200px-Slave-ship.jpg','Museum of Fine Arts','Boston','USA','91 × 122 cm','Critique sociale, mer dramatique.',14);

-- -----------------------------------------------------
-- Table `collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `collection` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `photo` TEXT NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`, `user_id`),
    INDEX `fk_collection_user1_idx` (`user_id` ASC) VISIBLE,
    INDEX `fk_collection_id_idx` (`id` ASC) VISIBLE,
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    CONSTRAINT `fk_collection_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `text` TEXT NOT NULL,
    `date` DATETIME NOT NULL DEFAULT NOW(),
    `user_id` INT NOT NULL,
    `artwork_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
    INDEX `fk_comment_artwork1_idx` (`artwork_id` ASC) VISIBLE,
    CONSTRAINT `fk_comment_artwork1` FOREIGN KEY (`artwork_id`) REFERENCES `artwork` (`id`),
    CONSTRAINT `fk_comment_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

ALTER TABLE comment
MODIFY COLUMN date DATETIME DEFAULT CURRENT_TIMESTAMP;



-- -----------------------------------------------------
-- Table `link_artist_movement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `link_artist_movement` (
    `movement_id` INT NOT NULL,
    `artist_id` INT NOT NULL,
    PRIMARY KEY (`movement_id`, `artist_id`),
    INDEX `fk_movement_has_artist_artist1_idx` (`artist_id` ASC) VISIBLE,
    INDEX `fk_movement_has_artist_movement1_idx` (`movement_id` ASC) VISIBLE,
    CONSTRAINT `fk_movement_has_artist_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`),
    CONSTRAINT `fk_movement_has_artist_movement1` FOREIGN KEY (`movement_id`) REFERENCES `movement` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO
    `link_artist_movement` (movement_id, artist_id)
VALUES (4, 1);
INSERT INTO
    `link_artist_movement` (movement_id, artist_id)
VALUES (2, 2);
INSERT INTO
    `link_artist_movement` (movement_id, artist_id)
VALUES (1, 3);
INSERT INTO
    `link_artist_movement` (movement_id, artist_id)
VALUES (3, 4);
INSERT INTO
    `link_artist_movement` (movement_id, artist_id)
VALUES (5, 5);
INSERT INTO `link_artist_movement` (movement_id, artist_id)
VALUES 
(4, 6), -- Munch
(7, 7), -- Botticelli
(8, 8), -- Kandinsky
(9, 9), -- Vermeer
(10, 11), -- J Martin
(10, 10), -- CJ Vernet
(9, 12), -- caravage
(9, 13), -- Rembrandt
(10, 14), -- Turner
(10, 15); -- Friedrich


-- -----------------------------------------------------
-- Table `movement_has_artwork`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movement_has_artwork` (
    `movement_id` INT NOT NULL,
    `artwork_id` INT NOT NULL,
    PRIMARY KEY (`movement_id`, `artwork_id`),
    INDEX `fk_movement_has_artwork_artwork1_idx` (`artwork_id` ASC) VISIBLE,
    INDEX `fk_movement_has_artwork_movement1_idx` (`movement_id` ASC) VISIBLE,
    CONSTRAINT `fk_movement_has_artwork_artwork1` FOREIGN KEY (`artwork_id`) REFERENCES `artwork` (`id`),
    CONSTRAINT `fk_movement_has_artwork_movement1` FOREIGN KEY (`movement_id`) REFERENCES `movement` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO
    `movement_has_artwork` (movement_id, artwork_id)
VALUES (1, 4), -- La Nuit étoilée (Post-Impressionnisme)
(2, 2), -- Les Demoiselles d'Avignon (Cubisme)
(1, 3), -- Impression, soleil levant (Impressionnisme)
(3, 4), -- La Persistance de la mémoire (Surréalisme)
(4, 6), -- Le Cri (Expressionnisme)
(7, 7), -- Naissance de Vénus (Renaissance)
(8, 8), -- Composition VIII (Abstraction)
(2, 9), -- Guernica (Cubisme)
(9, 10), -- Jeune fille à la perle (Baroque)
(10, 11), (10, 12), -- Joseph Vernet (Rattachable au pré-Romantisme/Romantisme)
(10, 13), (10, 14), (10, 15), (10, 16), -- idem Turner, Vernet
(10, 17), (10, 18), (10, 19), (10, 20), -- Friedrich
(10, 21), -- Moonrise over the Sea (Romantisme)
(10, 22), -- Woman at a Window (Romantisme)
(10, 23), -- Abbey in the Oakwood (Romantisme)
(9, 24), -- Souper à Emmaüs (Baroque)
(9, 25), -- Judith décapitant Holopherne (Baroque)
(9, 26), -- La Vocazione di Matteo (Baroque)
(9, 27), -- Autoportrait jeune (Baroque)
(9, 28), -- La Ronde de nuit (Baroque)
(9, 29), -- Belshazzar’s Feast (Baroque)
(9, 30), -- Self-Portrait at Prayer (Baroque)
(9, 31), -- The Shipwreck (Rembrandt → Baroque)
(10, 32), -- The Slave Ship (Turner → Romantisme)
(5, 5),
(4, 1);

-- -----------------------------------------------------
-- Table `user_following_artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_following_artist` (
    `artist_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`artist_id`, `user_id`),
    INDEX `fk_artist_has_user_user1_idx` (`user_id` ASC) VISIBLE,
    INDEX `fk_artist_has_user_artist1_idx` (`artist_id` ASC) VISIBLE,
    CONSTRAINT `fk_artist_has_user_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`),
    CONSTRAINT `fk_artist_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `user_following_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_following_user` (
    `follower_id` INT NOT NULL,
    `followed_id` INT NOT NULL,
    PRIMARY KEY (`follower_id`, `followed_id`),
    CONSTRAINT `fk_follower` FOREIGN KEY (`follower_id`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_followed` FOREIGN KEY (`followed_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `user_liked_artwork`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_liked_artwork` (
    `user_id` INT NOT NULL,
    `artwork_id` INT NOT NULL,
    PRIMARY KEY (`user_id`, `artwork_id`),
    INDEX `fk_user_has_artwork_artwork1_idx` (`artwork_id` ASC) VISIBLE,
    INDEX `fk_user_has_artwork_user1_idx` (`user_id` ASC) VISIBLE,
    CONSTRAINT `fk_user_has_artwork_artwork1` FOREIGN KEY (`artwork_id`) REFERENCES `artwork` (`id`),
    CONSTRAINT `fk_user_has_artwork_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `user_saving_artwork`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_saving_artwork` (
    `user_id` INT NOT NULL,
    `artwork_id` INT NOT NULL,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`user_id`, `artwork_id`),
    INDEX `fk_user_has_artwork_artwork2_idx` (`artwork_id` ASC) VISIBLE,
    INDEX `fk_user_has_artwork_user2_idx` (`user_id` ASC) VISIBLE,
    CONSTRAINT `fk_user_has_artwork_artwork2` FOREIGN KEY (`artwork_id`) REFERENCES `artwork` (`id`),
    CONSTRAINT `fk_user_has_artwork_user2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `collection_has_artwork`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `collection_has_artwork` (
    `collection_id` INT NOT NULL,
    `artwork_id` INT NOT NULL,
    PRIMARY KEY (`collection_id`, `artwork_id`),
    INDEX `fk_collection_has_artwork_artwork1_idx` (`artwork_id` ASC) VISIBLE,
    INDEX `fk_collection_has_artwork_collection1_idx` (`collection_id` ASC) VISIBLE,
    CONSTRAINT `fk_collection_has_artwork_collection1` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_collection_has_artwork_artwork1` FOREIGN KEY (`artwork_id`) REFERENCES `artwork` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `password_reset_tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expires_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_reset_token_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

SET SQL_MODE = @OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
