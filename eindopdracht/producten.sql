-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 11 jun 2026 om 11:58
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webshop`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `producten`
--

CREATE TABLE `producten` (
  `productid` int(11) NOT NULL,
  `naam` varchar(100) NOT NULL,
  `prijs` decimal(11,0) NOT NULL,
  `afbeelding` text NOT NULL,
  `categorie_id` int(11) NOT NULL,
  `beschrijving` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `producten`
--

INSERT INTO `producten` (`productid`, `naam`, `prijs`, `afbeelding`, `categorie_id`, `beschrijving`) VALUES
(1, 'Kobe 6 total orange', 149, 'afbeeldingen/kobe-6-total-orange.avif', 1, 'De Kobe 6 Protro \"Total Orange\" is een eerbetoon aan het vrouwenbasketbal en Kobe Bryants steun voor de sport. De opvallende oranje kleur, gecombineerd met de iconische slangenhuidtextuur, maakt deze sneaker zowel betekenisvol als stijlvol.'),
(2, 'Kobe 6 Reverse Grinch', 149, 'afbeeldingen/Kobe-6-reverse-grinch.jpg', 1, 'De Kobe 6 Protro Reverse Grinch is een moderne twist op een van de meest iconische colorways uit de Kobe-lijn. De felle rode en groene accenten creëren een opvallende look die direct in het oog springt op het veld. Dankzij het lichte bovenwerk en de responsieve demping is deze schoen ontworpen voor explosieve spelers die snelheid en controle willen combineren. De “Reverse Grinch” straalt dezelfde energie uit als Kobe’s agressieve en gedreven speelstijl.'),
(3, 'Kobe 6 Grinch', 149, 'afbeeldingen/kobe-6-grinch.webp', 1, 'De Kobe 6 Protro Grinch is een van de meest legendarische sneakers ooit uitgebracht binnen de Kobe-lijn. De felgroene colorway met rode accenten maakt deze schoen direct herkenbaar en iconisch. Het innovatieve slangenhuiddesign benadrukt Kobe’s “Black Mamba” mentaliteit. De combinatie van grip, stabiliteit en responsieve demping maakt deze schoen perfect voor snelle, creatieve spelers die het verschil willen maken in elke wedstrijd.'),
(4, 'Kobe 6 Dodgers', 149, 'afbeeldingen/Kobe-6-Dodgers.jpg', 1, 'De Kobe 6 Dodgers combineert sportieve elegantie met een uniek eerbetoon aan Los Angeles. De blauwe en witte kleuren verwijzen naar de Dodgers-franchise en Kobe’s band met de stad. De schoen biedt uitstekende ondersteuning, lichtgewicht comfort en betrouwbare grip voor snelle bewegingen. Ideaal voor spelers die stijl willen combineren met performance op het hoogste niveau.'),
(5, 'Kobe 4 Girldad', 149, 'afbeeldingen/Kobe-4-Girldad.jpg', 1, 'De Kobe 4 Girldad is een speciale colorway die Kobe Bryant’s liefde voor zijn dochters eert. Het ontwerp straalt eenvoud, elegantie en betekenis uit. De schoen biedt uitstekende stabiliteit, goede grip en een laag profiel dat zorgt voor optimale controle op het veld. Perfect voor all-around spelers die comfort en performance willen combineren.'),
(6, 'Kobe 4 Gold Medal', 149, 'afbeeldingen/Kobe-4-Gold-Medal.webp', 1, 'De Kobe 4 Gold Medal is geïnspireerd op Kobe Bryant’s Olympische successen en zijn winning mentaliteit. De gouden accenten symboliseren prestatie, discipline en dominantie. Deze schoen biedt uitstekende grip, responsieve demping en een lichtgewicht constructie die zorgt voor maximale snelheid en wendbaarheid op het veld. Een echte performance sneaker voor spelers met een winnaarsmentaliteit.'),
(7, 'Kobe 4 Black Mamba', 149, 'afbeeldingen/Kobe-4-Black-Mamba.jpg', 1, 'De Kobe 4 Black Mamba is een iconische sneaker die Kobe’s legendarische mentaliteit weerspiegelt. Het minimalistische design combineert met maximale performance en betrouwbaarheid. De schoen biedt sterke grip, stabiliteit en een responsief gevoel bij elke stap. Ontworpen voor spelers die met precisie en killer instinct willen spelen.'),
(8, 'Kobe 4 Philly', 149, 'afbeeldingen/Kobe-4-Philly.jpg', 1, 'De Kobe 4 Philly is een eerbetoon aan Kobe’s roots en zijn liefde voor basketbalcultuur. Het design is klassiek maar krachtig, met een focus op stabiliteit en controle. De schoen biedt comfortabele demping en betrouwbare traction voor snelle richtingsveranderingen. Ideaal voor spelers die een solide all-around performance zoeken.'),
(9, 'Nike JA 3 Jelly Bean', 107, 'afbeeldingen/Nike-Ja-3-Jelly-Bean.jpeg', 2, 'De Nike JA 3 Jelly Bean is een kleurrijke en energieke performance sneaker die perfect past bij Ja Morant’s explosieve speelstijl. De lichte constructie en responsieve demping zorgen voor maximale snelheid en wendbaarheid. Het speelse design geeft de schoen een unieke uitstraling die opvalt op én naast het veld.'),
(10, 'Nike JA 3 Max Volume', 107, 'afbeeldingen/Nike-Ja-3-Max-Volume.webp', 2, 'De Nike JA 3 Max Volume is ontworpen voor spelers die explosief spelen en veel impact maken in de paint. De extra demping zorgt voor comfort bij harde landingen, terwijl de grip snelle richtingsveranderingen ondersteunt. Een ideale schoen voor agressieve guards.'),
(11, 'Nike JA 3 Zombie', 107, 'afbeeldingen/Nike-Ja-3-Zombie.jpg', 2, 'De Nike JA 3 Zombie combineert een opvallend design met serieuze performance. De schoen biedt uitstekende grip en stabiliteit voor snelle drives en explosieve bewegingen. Het unieke thema versterkt Ja Morant’s creatieve en onvoorspelbare speelstijl.'),
(12, 'KD 18 Aunt Pearl', 132, 'afbeeldingen/KD-18-Aunt-Pearl.webp', 3, 'De KD 18 Aunt Pearl is een emotioneel eerbetoon aan Kevin Durant’s tante en straalt zachtheid en kracht tegelijk uit. De schoen biedt premium demping en comfort, ideaal voor scorers die vloeiende bewegingen en precisie willen combineren.\n'),
(13, 'KD 18 Slim Reaper', 132, 'afbeeldingen/KD-18-Slim-Reaper.webp', 3, 'De KD 18 Slim Reaper weerspiegelt Kevin Durant’s dodelijke efficiëntie op het veld. De schoen ondersteunt soepele shooting, snelle cuts en stabiele landingen. Perfect voor spelers die moeiteloos willen scoren vanuit elke positie.'),
(14, 'KD 18 Pink Photo Blue', 132, 'afbeeldingen/KD-18-Pink-Photo-Blue.webp', 3, 'De KD 18 Pink Photo Blue combineert opvallende kleuren met high-performance technologie. De schoen biedt responsieve demping en uitstekende enkelondersteuning, ideaal voor veelzijdige scorers.'),
(15, 'KD 18 Washed Purple', 132, 'afbeeldingen/KD-18-Washed purple.webp', 3, 'De KD 18 Washed Purple straalt stijl en controle uit. De schoen biedt comfort en stabiliteit voor lange wedstrijden en consistente prestaties op hoog niveau.'),
(16, 'Lebron XXII Limelight', 157, 'afbeeldingen/Lebron-XXII-Limelight.webp', 4, 'De LeBron XXII Limelight is gebouwd voor pure kracht en dominantie. De schoen biedt maximale ondersteuning en demping, ideaal voor fysieke spelers die het spel controleren in de paint.'),
(17, 'Lebron XXII Grand Opening', 157, 'afbeeldingen/Lebron-XXII-Grand-Opening.webp', 4, 'De LeBron XXII Grand Opening combineert stabiliteit en comfort voor spelers die op hoog tempo en met veel contact spelen. De schoen ondersteunt explosieve bewegingen en krachtige landingen.'),
(18, 'Sabrina 3 Crimson Tint', 107, 'afbeeldingen/Sabrina-3-Crimson-Tint.webp', 5, 'De Sabrina 3 Crimson Tint is een snelle, lichte performance sneaker ontworpen voor guards met een hoge snelheid en scherpe cuts. De schoen biedt uitstekende controle en grip.'),
(19, 'Sabrina 3 Gamer', 107, 'afbeeldingen/Sabrina-3-Gamer.webp', 5, 'De Sabrina 3 Gamer combineert comfort en stabiliteit met een strak design. Perfect voor spelers die het spel willen controleren met precisie en snelheid.'),
(20, 'Sabrina EP Blueprint', 107, 'afbeeldingen/Sabrina-3-EP-Blueprint.jpeg', 5, 'De Sabrina EP Blueprint is een veelzijdige performance schoen die snelheid, stabiliteit en balcontrole combineert. Ideaal voor moderne guards met een compleet spel.'),
(21, 'Rigorer BP1 Family Matters', 140, 'afbeeldingen/Rigorer-BP1-Family-Matters.webp', 6, 'De Rigorer BP1 Family Matters biedt een stevige en stabiele basis voor all-around spelers. De schoen is ontworpen voor comfort en betrouwbaarheid tijdens lange wedstrijden.'),
(22, 'Rigorer AR1 Juicy Peach', 140, 'afbeeldingen/Rigorer-AR1-Juicy-Peach.webp', 6, 'De Rigorer AR1 Juicy Peach is licht en flexibel, ideaal voor creatieve en snelle spelers. De schoen ondersteunt explosieve bewegingen met goede grip.'),
(23, 'Rigorer AR2 15 Flavours', 140, 'afbeeldingen/Rigorer-AR2-15Flavours.webp', 6, 'De Rigorer AR2 15 Flavours combineert speels design met solide performance. De schoen biedt goede demping en stabiliteit voor veelzijdige spelers.'),
(24, 'Rigorer AR2 Snowman', 140, 'afbeeldingen/Rigorer-AR2-Snowman.webp', 6, 'De Rigorer AR2 Snowman is ontworpen voor indoor performance met betrouwbare grip en comfortabele demping. Perfect voor consistente spelers.'),
(25, 'Nike GT Cut 2 Hyper Pink', 149, 'afbeeldingen/Nike-GT-CUT2-Hyper-Pink.jpg', 7, 'De Nike GT Cut 2 Hyper Pink is een elite performance sneaker voor snelle guards. De schoen biedt uitzonderlijke traction en responsieve cushioning voor explosieve bewegingen.'),
(26, 'Nike GT Cut 2 Arike Ogunbowale', 149, 'afbeeldingen/Nike-GT-CUT2-Arike-Ogunbowale.jpg', 7, 'De Nike GT Cut 2 Arike Ogunbowale is ontwikkeld voor elite scorers die snelheid en precisie combineren. De schoen ondersteunt snelle drives en gecontroleerde stops.'),
(27, 'Nike GT Cut 2 Black Phantom', 149, 'afbeeldingen/Nike-GT-CUT2-Black-Phantom.jpeg', 7, 'De Nike GT Cut 2 Black Phantom combineert een strak en minimalistisch design met topniveau performance. Ideaal voor spelers die snelheid en controle willen maximaliseren.');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `producten`
--
ALTER TABLE `producten`
  ADD PRIMARY KEY (`productid`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `producten`
--
ALTER TABLE `producten`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
