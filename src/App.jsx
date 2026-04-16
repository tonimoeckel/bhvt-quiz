import React, { useState, useMemo, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, BookOpen, ChevronRight, Award, Dog, Target, Shuffle, ListChecks, ArrowLeft, GraduationCap } from 'lucide-react';

const SECTIONS = {
  1: { name: 'Struktur SV & Recht', short: 'Recht', color: 'from-blue-500 to-blue-600', icon: BookOpen },
  2: { name: 'Pflege, Fütterung & Krankheiten', short: 'Gesundheit', color: 'from-emerald-500 to-emerald-600', icon: Dog },
  3: { name: 'Verhalten, Erziehung & Ausbildung', short: 'Verhalten', color: 'from-amber-500 to-amber-600', icon: Target },
  4: { name: 'FCI-BH/VT-Prüfungsordnung', short: 'Prüfung', color: 'from-purple-500 to-purple-600', icon: Award },
};

const QUESTIONS = [
  {n:1,s:1,q:"In welchem Jahr wurde der SV gegründet?",o:["Im Jahr 1949","Im Jahr 1929","Im Jahr 1899"],c:[2]},
  {n:2,s:1,q:"Wer hat den Verein für Deutsche Schäferhunde gegründet?",o:["Rittmeister Max von Stephanitz","Dr. Christoph Rummel","Konrad Adenauer"],c:[0]},
  {n:3,s:1,q:"In welchem Ort hat der SV seinen Sitz?",o:["Karlsruhe","Augsburg","Frankfurt/Main"],c:[1]},
  {n:4,s:1,q:"Wieviele Landesgruppen umfasst der SV?",o:["15 Landesgruppen","17 Landesgruppen","19 Landesgruppen"],c:[2]},
  {n:5,s:1,q:"Welches Gesetz bzw. welche Verordnung regelt die Mindestanforderungen an eine tierartgerechte Haltung von Hunden im Freien?",o:["Tierschutz-Hundeverordnung","Landeshundeverordnung","Tiertransport-Verordnung"],c:[0]},
  {n:6,s:1,q:"Die Größe der uneingeschränkt benutzbaren Bodenfläche in einem Zwinger zur Haltung eines Deutschen Schäferhundes muss nach der Tierschutz-Hundeverordnung mindestens betragen:",o:["6 qm","8 qm","10 qm"],c:[1]},
  {n:7,s:1,q:"Die Fédération Cynologique Internationale (F.C.I.) ist:",o:["Der Weltverband der Hundesportvereine.","Der Weltverband der nationalen kynologischen Verbände (wie z. B. des VDH in Deutschland).","Eine internationale kynologische Organisation mit Einzelmitgliedern, die sich zum Wohle der Hunde engagieren."],c:[1]},
  {n:8,s:1,q:"Wer ist Mitglied in der WUSV?",o:["Einzelpersonen.","Schäferhundvereine aus aller Welt.","Beides zusammen."],c:[1]},
  {n:9,s:1,q:"Welche Rassen, bzw. deren Verbände, gehören der F.C.I. an?",o:["Alle inklusive der gemischtrassigen Hunde","Nur deutsche Schäferhunde","Weltweit ca. 340 Hunderassen, bzw. deren Verbände"],c:[2]},
  {n:10,s:1,q:"Welche Aussagen nach dem Naturschutz- bzw. Jagdrecht sind richtig?",o:["Tiere der freien Natur dürfen nicht mutwillig gestört werden.","Hunde müssen in der freien Natur generell an der Leine geführt werden.","Hunde dürfen sich im Jagdrevier nicht außerhalb des Einwirkungsbereichs ihres Hundeführers bewegen."],c:[0,2]},
  {n:11,s:1,q:"Die Anwendung von Elektroreizgeräten…",o:["in der Hundeausbildung ist nach dem Tierschutzgesetz verboten.","ist nur zur Erziehung schwer erziehbarer Hunde erlaubt.","ist nur mit Sachkundenachweis zulässig."],c:[0]},
  {n:12,s:1,q:"Welche allgemeinen Anforderungen gelten an das Halten von Hunden nach der Tierschutz-Hundeverordnung?",o:["Dem Hund muss ausreichend Auslauf im Freien außerhalb eines Zwingers gewährt werden.","Der Hund muss mehrmals täglich in ausreichender Dauer Umgang mit einer Betreuungsperson haben.","Der Hund muss vierteljährlich von einem Tierarzt untersucht werden."],c:[0,1]},
  {n:13,s:1,q:"Welche Grundvoraussetzung muss erfüllt sein, um Mitglied einer SV-Ortsgruppe werden zu können?",o:["6 Monate vor Aufnahmeantrag regelmäßig zu den Übungsstunden kommen.","Gültige Mitgliedschaft im SV.","Mitgliedschaft im VDH."],c:[1]},
  {n:14,s:1,q:"Was ist der „Verband für das Deutsche Hundewesen (VDH)\"?",o:["Der internationale Dachverband für die Kynologie.","Der nationale Dachverband für das Hundewesen in Deutschland.","Eine Vereinigung von Landesverbänden des Diensthundewesens."],c:[1]},
  {n:15,s:1,q:"Wann darf ein Jagdausübungsberechtigter (Jäger) Hunde abschießen?",o:["Wenn Hunde den Waldweg verlassen.","Wenn Hunde ohne Leine neben dem Halter herlaufen.","Wenn Hunde unkontrolliert Wild hetzen."],c:[2]},

  {n:16,s:2,q:"In welchem Alter sollten Welpen frühestens abgegeben werden?",o:["5. Lebenswoche","8. Lebenswoche","12. Lebenswoche"],c:[1]},
  {n:17,s:2,q:"Wer einen Hund im Freien hält, hat dafür zu sorgen, dass dem Hund…",o:["nur eine Schutzhütte zur Verfügung steht.","nur ein beschatteter, wärmegedämmter Liegeplatz zur Verfügung steht.","eine Schutzhütte sowie ein Liegeplatz zur Verfügung steht."],c:[2]},
  {n:18,s:2,q:"Wie lange ist die Tollwutschutzimpfung in der BRD gültig?",o:["18 Monate.","So lange, wie der Impfhersteller für eine Wiederholungsimpfung angibt. Die Gültigkeit muss im Impfausweis oder im EU-Heimtierpass vermerkt werden.","3 Jahre."],c:[1]},
  {n:19,s:2,q:"Wer stellt die Impfbescheinigung bzw. den Internationalen Impfpass aus?",o:["Der Züchter","Der Tierarzt, der die Impfung durchgeführt hat.","Die Veterinärämter."],c:[1]},
  {n:20,s:2,q:"Zecken sind durch ihren Biss auch für den Hund gefährlich. Welche Krankheiten können sie auf den Hund übertragen?",o:["Tollwut","Frühsommermeningoenzephalitis (FSME)","Borreliose"],c:[1,2]},
  {n:21,s:2,q:"Gegen welche Infektionskrankheiten sollten Welpen im Alter von 8 Wochen geimpft werden?",o:["Staupe.","Hepatitis (Infektiöse Leberentzündung).","Leptospirose (Stuttgarter Hundeseuche).","Parvovirose (sog. Katzenseuche).","Maul- und Klauenseuche.","Keine Impfung, da der Hund noch zu jung ist."],c:[0,1,2,3]},
  {n:22,s:2,q:"Warum müssen Welpen regelmäßig entwurmt werden?",o:["Weil sie bereits mit der Muttermilch mit Würmern infiziert werden.","Weil sie sich beim Kontakt mit Menschen mit Würmern infizieren.","Weil sich die Hunde am eigenen und Kot anderer Hunde mit Wurmeiern infizieren."],c:[0,2]},
  {n:23,s:2,q:"Fertigfuttermittel bei erwachsenen, gesunden Hunden…",o:["decken den Bedarf des Tieres.","müssen durch spezielle Futtermittel ergänzt werden.","dürfen in der Hundeernährung nicht ausschließlich verwendet werden."],c:[0]},
  {n:24,s:2,q:"Welches Getränk muss Hunden immer zur Verfügung stehen?",o:["Tee","Wasser","Milch"],c:[1]},
  {n:25,s:2,q:"Wie lange dauert die Hitze bei einer gesunden Hündin insgesamt?",o:["10 Tage","ca. 3 Wochen","ca. 4 Wochen"],c:[1]},
  {n:26,s:2,q:"Wie oft im Jahr wird eine Hündin hitzig / läufig?",o:["Immer nur einmal.","Meist zweimal (im Frühjahr und Herbst).","Ungefähr viermal."],c:[1]},
  {n:27,s:2,q:"Wie kann ein Hund vor einer Infektion mit Viren geschützt werden?",o:["Durch viel frische Luft.","Durch hohen Gemüseanteil im Futter.","Durch Impfung."],c:[2]},
  {n:28,s:2,q:"Normale Temperatur des Hundes?",o:["37,5 – 37,5 °","38,0 – 38,5 °","39,0 - 40°"],c:[1]},
  {n:29,s:2,q:"Wie erkennt man, dass ein Hund krank ist?",o:["Veränderungen der Körpertemperatur,","des Pulses,","der Atmung.","Gleich bleibender Appetit und Durst.","Teilnahmslosigkeit."],c:[0,1,2,4]},
  {n:30,s:2,q:"Auf welche Art schmarotzt der Hundefloh?",o:["Er bohrt sich in die Oberhaut und ernährt sich von Gewebe.","Er ernährt sich von Hautschuppen.","Er saugt Blut."],c:[2]},
  {n:31,s:2,q:"In welchem Alter werden Hündinnen geschlechtsreif?",o:["Mit ca. 4 Monaten","Mit ca. 7 - 10 Monaten","Mit ca. 18 Monaten"],c:[1]},
  {n:32,s:2,q:"Wie soll der Zaun beschaffen sein, mit dem das Grundstück, auf dem ein Hund gehalten wird, „ausbruchsicher\" eingezäunt werden muss?",o:["Für den Hund unüberwindbar.","Aus Stacheldraht","So, dass sich der Hund nicht darunter durchgraben kann."],c:[0,2]},
  {n:33,s:2,q:"Hunde benötigen keine Rückzugsmöglichkeit (Zufluchtsort), da sie jederzeit engen Kontakt zu den Mitgliedern der Familie pflegen.",o:["Stimmt.","Stimmt nicht.","Hängt von der Rasse ab."],c:[1]},
  {n:34,s:2,q:"Wie lang ist die Tragezeit einer Hündin?",o:["5 Monate","45 Tage","etwa 63 Tage"],c:[2]},
  {n:35,s:2,q:"Der ausgewachsene Hund hat:",o:["28 Zähne","48 Zähne","42 Zähne"],c:[2]},
  {n:36,s:2,q:"Welcher Sinn ist beim Hund nicht vorhanden?",o:["Gleichgewichtssinn","Tastsinn","Gerechtigkeitssinn"],c:[2]},
  {n:37,s:2,q:"Welche Regeln müssen immer beachtet werden, wenn der Hund im Auto bleiben muss?",o:["Auto immer im Schatten abstellen.","Türen und Fenster gut verschließen, damit der Rassehund nicht gestohlen werden kann.","Sonnenwanderung beachten, Hund und Auto immer wieder kontrollieren.","Wasser anbieten."],c:[0,2,3]},
  {n:38,s:2,q:"Wie muss der Nasenspiegel gesunder Hunde sein?",o:["Feucht und glänzend.","Trocken und rissig."],c:[0]},
  {n:39,s:2,q:"Wie oft soll ein ausgewachsener Hund entwurmt werden?",o:["Halbjährlich.","Vierteljährlich.","Einmal pro Jahr genügt."],c:[1]},
  {n:40,s:2,q:"Wenn ein Hund hechelt, kann es sein,",o:["… dass er hungrig ist.","… dass er Stress hat.","… dass ihm heiß ist."],c:[2]},
  {n:41,s:2,q:"Welche Vorsorgemaßnahmen sollten zur Gesunderhaltung des Hundes getroffen werden?",o:["Den Hund ausreichend impfen lassen und das Impfen jährlich wiederholen.","Den ganzen Körper des Hundes täglich genau anschauen, z. B. beim Bürsten oder Trockenreiben und auf Veränderungen oder Parasitenbefall kontrollieren.","Darauf achten, dass der Hund nicht zu dick wird.","Nur das teuerste Futter kaufen.","Den Hund jede Woche einmal mit Flohshampoo waschen."],c:[0,1,2]},
  {n:42,s:2,q:"In welchem Zustand sollte sich der Hund zum Zeitpunkt der Impfung befinden?",o:["Er soll gesund sein.","Er soll frei von Würmern sein.","Er soll frei von Ungeziefer sein."],c:[0,1,2]},
  {n:43,s:2,q:"Wie können Flöhe am Hund bekämpft werden?",o:["Indem man den Hund häufig schwimmen lässt.","Durch Kontaktinsektizide, z. B. spezielle Flohhalsbänder.","Durch rohe Zwiebeln."],c:[1]},
  {n:44,s:2,q:"Was ist unbedingt wichtig bei der Abgabe der Welpen?",o:["Sie müssen geimpft und mehrfach entwurmt sein.","Sie müssen stubenrein sein.","Sie müssen leinenführig sein.","Sie müssen richtige Draufgänger sein."],c:[0]},
  {n:45,s:2,q:"Welche Hunde haben den höchsten Nährstoffbedarf?",o:["Hündinnen.","Alte Hunde.","Junge Hunde."],c:[2]},
  {n:46,s:2,q:"Was sollte an einen Hund nicht verfüttert werden?",o:["Geflügelknochen.","Gewürzte Speisereste.","Rohes Schweinefleisch.","Fisch."],c:[0,1,2]},
  {n:47,s:2,q:"Zecken sollten so schnell wie möglich entfernt werden. Wie geht man vor?",o:["Mit der Zeckenzange oder Pinzette vorsichtig herausdrehen.","Mit Öl bestreichen, damit die Zecke erstickt und von selbst abfällt.","Zecke mit den Fingern zusammendrücken und schnell herausreißen."],c:[0]},
  {n:48,s:2,q:"Wie erkennt man einen gesunden Hund?",o:["Aufmerksames Wesen.","Glänzendes Fell.","Fehlender Appetit."],c:[0,1]},
  {n:49,s:2,q:"Wie oft soll ein Zwinger oder der Aufenthaltsbereich des Hundes gereinigt werden?",o:["Mindestens 1 x täglich.","Wöchentlich.","Monatlich."],c:[0]},
  {n:50,s:2,q:"Wodurch werden Ohrenkrankheiten beim Hund verursacht?",o:["Durch Ohrenschmalz.","Durch Schmutz und Fremdkörper.","Durch Milben."],c:[1,2]},
  {n:51,s:2,q:"Wie erkennt man sicher die Hitze bei einer Hündin?",o:["Am Anschwellen der Vagina.","Am blutig-wässrigen Ausfluss.","Am Verhalten der Rüden beim Zusammentreffen.","Am besonders anhänglichen Verhalten der Hündin."],c:[0,1,2]},
  {n:52,s:2,q:"Darf ich meinen Hund im Auto zurück lassen?",o:["Immer.","Nur für kurze Zeit.","Nie bei hohen Temperaturen und in der prallen Sonne.","Ja, aber nur im Kofferraum."],c:[1,2]},
  {n:53,s:2,q:"Was ist zu beachten, wenn man sich einem verletzten Hund nähern will - auch wenn es der eigene Hund ist?",o:["Beruhigend auf den Hund einreden und sich behutsam nähern.","Forsch auf den Hund zugehen und ihn ins Hörzeichen nehmen."],c:[0]},
  {n:54,s:2,q:"Wie behandelt man kleine Verletzungen der Haut in der Nähe von Augen und äußerem Gehörgang?",o:["Haare in der Umgebung scheren und vorsichtige Wundreinigung.","Mit Wasser und Seife abwaschen."],c:[0]},
  {n:55,s:2,q:"Welche Punkte müssen für eine artgerechte Haltung des Hundes mindestens erfüllt sein?",o:["Der Hund braucht täglich häufige Kontaktmöglichkeiten zu Menschen und/oder Hunden.","Hunde brauchen jederzeit Zugang zu Wasser.","Hunde brauchen ausreichend häufige und ausreichend lange Spaziergänge.","Es muss gewährleistet sein, dass der Hund im Krankheitsfall medizinisch versorgt werden kann."],c:[0,1,2,3]},

  {n:56,s:3,q:"Was verstehen wir unter dem Begriff: Wesen des Hundes?",o:["Nur angeborene Anlagen, Eigenschaften und Fähigkeiten.","Nur erworbene Anlagen, Eigenschaften und Fähigkeiten.","Gesamtheit aller angeborenen und erworbenen körperlichen und seelischen Eigenschaften, die das Verhalten des Hundes zu seiner Umwelt bestimmen."],c:[2]},
  {n:57,s:3,q:"Die Sozialisierungsphase des Welpen findet statt:",o:["bis zur 3. Lebenswoche.","ca. von der 8. bis 12. Lebenswoche.","ca. vom 7. bis 12. Lebensmonat."],c:[1]},
  {n:58,s:3,q:"Was sind die wichtigsten Dinge im Umgang mit dem Hund?",o:["Geduld, Lob und Konsequenz.","Ständige Unterdrückung.","Der tägliche, häufige Kontakt."],c:[0,2]},
  {n:59,s:3,q:"Kann man Hunde miteinander spielen lassen?",o:["Jederzeit.","Nur, wenn sie sich kennen und sie sich vertragen.","Nur, wenn es gut sozialisierte Tiere sind."],c:[1,2]},
  {n:60,s:3,q:"Der Hund…",o:["ist ein Einzelgänger.","lebt als gemischtgeschlechtliches Paar.","ist ein Rudeltier."],c:[2]},
  {n:61,s:3,q:"Sie sind mit Ihrem freilaufenden Hund unterwegs. Ein Jogger kommt Ihnen entgegen. Wie verhalten Sie sich?",o:["Ich lasse den Hund weiter laufen.","Ich bitte den Jogger, nicht so dicht vorbeizulaufen und sage, dass mein Hund nicht beißt.","Ich leine den Hund an und führe ihn am Jogger vorbei."],c:[2]},
  {n:62,s:3,q:"Sie gehen mit Ihrem freilaufenden Hund spazieren. Ein Spaziergänger bleibt zögernd und verängstigt stehen. Wie verhalten Sie sich?",o:["Mit Hörzeichen „Fuß\" zügig vorbeigehen.","Den Hund weiter frei laufen lassen und selbst normal weitergehen.","Den Hund anleinen."],c:[2]},
  {n:63,s:3,q:"Ihr Hund läuft frei, nach mehrfachem Rufen kommt er nicht. Wie verhalten Sie sich?",o:["Sie laufen ihm nach und fangen ihn ein.","Sie bleiben stehen und rufen, bis er kommt.","Sie rufen und drohen ihm Strafe an.","Sie drehen sich um und gehen langsam weg.","Wenn der Hund dann doch kommt, wird er bestraft."],c:[3]},
  {n:64,s:3,q:"Welche Erziehungsmethoden sind beim Hund anzuwenden?",o:["Antiautoritär.","Konsequent.","Je nach eigener Lebensauffassung."],c:[1]},
  {n:65,s:3,q:"In der Familie sollte der Hund…",o:["ein gleichberechtigtes Familienmitglied sein.","die Chefposition einnehmen.","die unterste Rangstellung einnehmen."],c:[2]},
  {n:66,s:3,q:"Beim Zusammensein von Hund und Kind sollte immer…",o:["der Hund beobachtet werden.","Hund und Kind beobachtet werden.","Keine besondere Beobachtung nötig."],c:[1]},
  {n:67,s:3,q:"Der Welpe sollte…",o:["möglichst wenig Kontakt zur Umwelt bekommen, weil er sonst verunsichert wird.","viel Kontakt zu Menschen, Artgenossen und Umweltreizen haben, damit er später in allen Situationen gut zurecht kommt.","überwiegend im Zwinger gehalten werden."],c:[1]},
  {n:68,s:3,q:"Ab welchem Alter kann mit der Erziehung des Hundes begonnen werden?",o:["Ab 2 - 3 Monate.","Ab 9 Monaten.","Nicht unter 12 Monate."],c:[0]},
  {n:69,s:3,q:"Die Dauer einer Trainingseinheit mit dem Hund ist hauptsächlich abhängig…",o:["von den Witterungsbedingungen.","vom Grenzwert der Leistungsfähigkeit (Belastungsgrenzen) des Hundes.","davon, ob der Vorrat der „Leckerli\" aufgebraucht ist."],c:[1]},
  {n:70,s:3,q:"Bei konsequenter Ausbildung ist situationsangepasster, dosierte Korrektur nicht immer unumgänglich. Die Korrektureinwirkungen sind so zu gestalten, dass…",o:["der Hund sich gegen den Ausbilder stellt.","der Hund sich durch richtiges Reagieren der Korrektur entziehen kann.","die erfolgten Korrektureinwirkungen auf Dauer erkennbar sind."],c:[1]},
  {n:71,s:3,q:"Eine erfolgreiche Ausbildung ist in erster Linie abhängig von…",o:["der Beschaffenheit und Art des Motiviergegenstandes.","von der Hundeführer-Hund-Beziehung.","von der Blutlinie des Hundes."],c:[1]},
  {n:72,s:3,q:"Stress in der Ausbildung entsteht durch…",o:["Umweltreize.","andauernde körperliche und seelische Belastung.","Entzug des Spielgegenstandes."],c:[1]},
  {n:73,s:3,q:"Ausbildung kann je nach Intensität Stress hervorrufen. Welche Möglichkeiten der Stressbewältigung gibt es?",o:["Bestätigung bei richtigem Verhalten durch ein Spielzeug, Futter oder Lob.","Mehrmaliges Wiederholen einer positiv gezeigten Leistung."],c:[0]},
  {n:74,s:3,q:"Nennen Sie die 5 Sinne des Hundes:",o:["Gesichtsinn","Frohsinn","Geschmacksinn","Geruchsinn","Sechster Sinn","Tastsinn","Gehörsinn"],c:[0,2,3,5,6]},
  {n:75,s:3,q:"Wann entwickelt ein Hund Jagdverhalten?",o:["In der 8. bis 14. Lebenswoche","Im 6. bis 12. Lebensmonat","Im 2. Lebensjahr"],c:[1]},
  {n:76,s:3,q:"Jeder Hund besitzt von Geburt an:",o:["Kinderfreundlichkeit.","Unterordnungsbereitschaft.","Dominanzstreben."],c:[1,2]},
  {n:77,s:3,q:"Warum entwickeln sich Hunde zu Problemhunden?",o:["Durch isolierte Haltung.","Ist bereits angeboren.","Durch falsche Ausbildung.","Durch Haltung an der Kette."],c:[0,2,3]},
  {n:78,s:3,q:"Wodurch entstehen die gravierendsten Ausbildungsfehler?",o:["Überforderung des Hundes","Unbeherrschtheit des Hundeführers","Kurze Übungseinheiten"],c:[0,1]},
  {n:79,s:3,q:"An welchen Körperteilen ist am schnellsten die Stimmung des Hundes abzulesen?",o:["An den Nackenhaaren","An der Rute","An den Ohren","An den Augen"],c:[0,1,2]},
  {n:80,s:3,q:"Ihr Hund wird in eine Beißerei mit einem gleich großen Hund verwickelt. Wie verhalten Sie sich?",o:["Sie treten zurück und lassen dem Schicksal seinen Lauf. Alles andere könnte für mich und meinen Hund gefährlich werden.","Sie packen ihn am Hals und Rückenfell und ziehen ihn aus dem Geschehen.","Sie versuchen, gemeinsam mit ihm den Gegner zu verjagen.","Sie ziehen an der Leine und schlagen notfalls auf ihn ein."],c:[0]},
  {n:81,s:3,q:"Den Hund an die Leine zu nehmen ist…",o:["immer richtig.","falsch.","situationsbedingt richtig."],c:[2]},
  {n:82,s:3,q:"Ihr Hund sieht ein Objekt. Er knurrt und zieht die Lefzen hoch. Wie reagieren Sie?",o:["Ableinen.","Anleinen und mit Hörzeichen Richtung wechseln.","Anleinen, kontrollieren und blockieren.","Durch Vorwarnung an die Umgebung auf die Aggression des Hundes hinweisen."],c:[2]},
  {n:83,s:3,q:"Wie sollte ein Hund getadelt werden?",o:["Durch Schläge.","Über Leinenruck.","Über die Stimme."],c:[1,2]},
  {n:84,s:3,q:"Die unerwünschten Aggressionen des Hundes...",o:["entstehen durch falsche Erziehung.","sind ausschließlich ererbte Eigenschaften.","können durch gezielte Ausbildung völlig unterdrückt werden.","können durch gezielte Ausbildung unter Kontrolle gehalten werden."],c:[0,3]},
  {n:85,s:3,q:"Wie beeinflussen Zerr- und Raufspiele das Selbstbewusstsein des Hundes, wenn er als Sieger hervorgeht?",o:["Minderung","Steigerung","Keinen Einfluss"],c:[1]},
  {n:86,s:3,q:"Warum verhalten sich Hunde häufig gegenüber Kindern anders als gegenüber erwachsenen Personen?",o:["Weil sie Kinder als Respektspersonen ansehen.","Weil Kinder ihr Verhalten schnell ändern und sich schnell und zum Teil unkontrolliert bewegen.","Weil Kinder häufig plötzlich laut schreien.","Weil sich Kinder häufig falsch verhalten."],c:[1,2,3]},
  {n:87,s:3,q:"Der Hund sitzt im Sessel und knurrt, wenn sich jemand dazu setzen will. Ist das ein…",o:["normales Verhalten.","unterwürfiges Verhalten.","dominierendes Verhalten."],c:[2]},
  {n:88,s:3,q:"Der Hund knurrt Gäste an, die Ihre Wohnung betreten. Wie verhalten Sie sich?",o:["Gäste auffordern, den Hund zu begrüßen.","Hund mit deutlichem Befehl auf seinen Platz schicken.","Hund gut zureden und mit Streicheln oder Leckerchen beruhigen."],c:[1]},
  {n:89,s:3,q:"Welche Aussagen über die Grundsätze bei Hörzeichen in der Hundeausbildung sind richtig?",o:["Hörzeichen können in Wortsätzen eingebaut werden.","Der Hund lernt am leichtesten einsilbige Hörzeichens.","Für dieselben Übungen sollten immer die gleichen Ausdrücke verwendet werden."],c:[1,2]},
  {n:90,s:3,q:"Ein Hörzeichen wird eingeübt…",o:["nur über das Gehör","nur über Körperkontakt","nur über Sichtzeichen","über alles zusammen"],c:[3]},
  {n:91,s:3,q:"Wann sollte ein Hund nach gutem Verhalten belohnt werden?",o:["Nach 5 Minuten.","Unmittelbar danach.","Zeit spielt keine Rolle."],c:[1]},
  {n:92,s:3,q:"Was versteht man unter Instinkt?",o:["Das antrainierte Verhalten des Hundes.","Die angeborene Anlage, die arterhaltende Verhaltensweisen auslöst.","Die angeborene Anlage in Kombination mit antrainiertem Verhalten."],c:[1]},
  {n:93,s:3,q:"Was versteht man unter Ausbilden?",o:["Den Hund vollkommen zu unterwerfen.","Mit Hilfe eines Reizes den Hund zu einem gewünschten Verhalten veranlassen oder ihn von einem unerwünschten Verhalten abbringen.","Das Triebverhalten des Hundes ausnutzen, um den Hund zur Abwehr von Gefahren als Verteidigungsmittel heranzuziehen."],c:[1]},
  {n:94,s:3,q:"Welches ist das am besten entwickelte Sinnesorgan beim Hund?",o:["Der Gerechtigkeitssinn.","Der Gefühlssinn.","Der Geruchssinn."],c:[2]},
  {n:95,s:3,q:"Was gehört zur Erziehung des jungen Hundes in erster Linie?",o:["Dass er dem Hörzeichen für Herankommen folgt.","Die Gewöhnung an die Leine und an die Pflege des Hundes.","Die Gewöhnung des Hundes an den Strassenverkehr.","Die Sozialisierung des Hundes mit anderen Menschen, anderen Tierarten und Artgenossen.","Dass er den Futternapf immer leer frisst."],c:[0,1,2,3]},
  {n:96,s:3,q:"Welche Wesenseigenschaften sind bei einem Familien- und Begleithund erwünscht?",o:["Gute Führung, enge Bindung an seinen Herrn.","Triebverhalten, Schärfe und Jagdtrieb.","Wesenssicherheit, vorab in friedlichen Situationen, gegenüber Menschen und im Verkehr."],c:[0,2]},
  {n:97,s:3,q:"Wie sollte ein Hund korrigiert werden?",o:["Durch ein scharf ausgesprochenes Hörzeichen, z. B. „Pfui\", „Aus\".","Durch Schicken auf seinen Platz.","Durch Schläge mit einem Stock, bis er sich unterwirft.","Durch Wegnahme des Spielzeugs.","Durch Streichen des Spaziergangs."],c:[0]},
  {n:98,s:3,q:"Eine gute Erziehung oder Ausbildung ist dazu geeignet…",o:["Aggression zu fördern.","Aggression zu kontrollieren.","weder noch."],c:[1]},
  {n:99,s:3,q:"Ein Hund kann bedingt…",o:["abstrakt denken.","verknüpfen.","im Gedächtnis behalten.","aus dem Gedächtnis reproduzieren."],c:[1,2,3]},
  {n:100,s:3,q:"Wie beruhigen Sie Ihren ängstlichen Hund?",o:["Durch ruhiges Zureden.","Durch striktes Hörzeichen.","Durch an die Leine legen.","Durch Körperkontakt."],c:[0,3]},
  {n:101,s:3,q:"Sie gehen mit Ihrem frei laufenden Hund spazieren, es kommt ein Spaziergänger mit angeleintem Hund entgegen. Wie verhalten Sie sich?",o:["Den Hund weiter frei laufen lassen.","Den Hund weiter frei laufen lassen, aber nicht in der Nähe des anderen Hundes.","Den Hund anleinen und den Entgegenkommenden mit Abstand passieren."],c:[2]},
  {n:102,s:3,q:"Sie starten mit Ihrem Hund einen Spaziergang vom Auto aus.",o:["Hund aus dem Auto lassen und dann anleinen.","Hund anleinen und dann aus dem Auto lassen.","Hund aus dem Auto lassen und frei laufen lassen."],c:[1]},
  {n:103,s:3,q:"Sie gehen mit Ihrem frei laufenden Hund spazieren. Es kommt ein Spaziergänger entgegen, der bei Ihrem Auftauchen seinen Hund auf den Arm nimmt.",o:["Den Hund weiter frei laufen lassen.","Den Hund zu sich rufen und im großen Bogen vorbeigehen.","Den Hund anleinen und die andere Person darauf hinweisen, dass sie den Hund am Boden vorbeiführen kann."],c:[2]},
  {n:104,s:3,q:"Das Führen von zwei Hunden gleichzeitig ist…",o:["gefahrlos, wenn beide angeleint sind.","gefahrlos, wenn ein Hund angeleint ist.","immer gefährlicher als das Führen eines einzelnen Hundes."],c:[2]},
  {n:105,s:3,q:"Wie kann ich meinen Hund loben?",o:["Ausgiebiges Streicheln.","Lobende Worte.","Nichtbeachtung.","Leckerlis (Futter)."],c:[0,1,3]},
  {n:106,s:3,q:"Der Welpe schnappt heftig im Spiel nach einem Menschen.",o:["Normales Verhalten.","Sollte geduldet werden, da er noch so klein ist.","Sollte gemaßregelt werden."],c:[2]},
  {n:107,s:3,q:"Wie gehe ich mit einem zur Dominanz neigenden Hund um?",o:["Der Hund bekommt erst etwas zu Fressen, wenn er ein Hörzeichen, z. B. Sitz oder Platz, ausgeführt hat.","Der Hund geht immer als erster durch die Tür.","Ich spiele häufig mit meinem Hund und lasse ihn öfter gewinnen.","Wenn der Hund im Weg ist, muss er aufstehen und mich vorbeilassen.","Wenn der Hund knurrt, lasse ich ihn gewähren, weil er seine Ruhe haben will.","Der Hund darf mit auf dem Sofa sitzen."],c:[0,3]},
  {n:108,s:3,q:"Der Hund liebt es, zu leben in einer…",o:["Demokratie.","Anarchie.","Hierarchie."],c:[2]},
  {n:109,s:3,q:"Angst- und Fluchtverhalten ist…",o:["ein Wesensmangel.","normales Verhalten."],c:[0]},
  {n:110,s:3,q:"Wie sollte man einen ängstlichen Hund beruhigen?",o:["Durch ein striktes Kommando.","Durch einen heftigen Leinenruck.","Durch Nichtbeachtung.","Durch ruhiges und freundliches Zureden.","Immer, wenn Angst aufkommt, schnell ein Leckerchen bereithalten."],c:[3]},
  {n:111,s:3,q:"Jeder Hund sollte wichtige Hörzeichen beherrschen. Welche Hörzeichen gehören NICHT dazu?",o:["Sitz","Pfötchen geben.","Platz.","Hier."],c:[1]},
  {n:112,s:3,q:"Was muss bei Übungen mit einem Welpen beachtet werden?",o:["Man sollte liebevoll, aber konsequent mit ihm umgehen.","Man sollte ihm im positiven Sinn viele Reizsituationen bieten, um ihn an alltägliche Situationen zu gewöhnen.","Auch bei einem Welpen muss man schon mit Druck und Strenge arbeiten, damit er sich gar nicht erst Marotten angewöhnt.","Übungen sollten spielerisch aufgebaut werden, denn so lernt der Welpe in einer stressfreien Übungsatmosphäre."],c:[0,1,3]},
  {n:113,s:3,q:"Achten Hunde auf die Körpersprache von Menschen?",o:["Ja. Hunde achten sehr auf die Körpersprache von Menschen.","Nur wenn man es ihnen beigebracht hat.","Nein, wie sich Menschen verhalten ist Hunden egal.","Nein, Hunde achten nur auf die Worte von Menschen."],c:[0]},
  {n:114,s:3,q:"Können Hunde unsere Sprache verstehen?",o:["Hunde können die Bedeutung bestimmter Worte lernen.","Hunde können nur den Klang unterscheiden.","Nein, sie erkennen aber in der Sprache einzelne Wörter wieder, deren Bedeutung sie gelernt haben.","Ja, Sprache zu verstehen, ist für Hunde kein Problem."],c:[0,2]},

  {n:115,s:4,q:"Wer darf FCI-BH/VT-Prüfungen im SV abnehmen?",o:["SV-Leistungsrichter IGP","SV-Leistungsrichter Agility","Ortsgruppen-Ausbildungswarte","SV-Leistungsrichter Obedience"],c:[0,1,3]},
  {n:116,s:4,q:"Der Teil \"A\" der BH/VT gliedert sich in:",o:["4 Übungsteile","5 Übungsteile","7 Übungsteile"],c:[0]},
  {n:117,s:4,q:"Nach der Leinenführigkeit wird die Leine…",o:["dem Prüfungsleiter übergeben.","umgehängt oder eingesteckt.","einfach auf dem Platz abgelegt."],c:[1]},
  {n:118,s:4,q:"Der Hund muss während der gesamten Vorführung Halsband oder Brustgeschirr tragen. Welche Halsbänder sind zugelassen?",o:["Langgliederhalsband","Stachelhalsband","Attrappenhalsband","Lederhalsband"],c:[0,3]},
  {n:119,s:4,q:"Der Laufschritt in der Leinenführigkeit beträgt:",o:["10- 15 Schritte.","mindestens 20 Schritte.","Spielt keine Rolle."],c:[0]},
  {n:120,s:4,q:"Das Hörzeichen \"Fuß\" kann gegeben werden…",o:["beim Angehen aus der Grundstellung.","vor den Wendungen, um den Hund aufmerksam zu machen.","beim Anhalten, um den Hund in Grundstellung zu bringen.","bei den Gangartwechseln."],c:[0,3]},
  {n:121,s:4,q:"Das Loben und Ansprechen des Hundes ist erlaubt:",o:["ständig während der gesamten Vorführung wenn der Hund richtig reagiert.","wenn sich der Hund unaufmerksam zeigt.","nach jeder beendeten Übung."],c:[2]},
  {n:122,s:4,q:"Die Schrittzahl für die Entwicklung der Übungen \"Sitz\" und \"Platz\" beträgt:",o:["10- 15 Schritte.","15 – 20 Schritte.","Spielt keine Rolle."],c:[0]},
  {n:123,s:4,q:"Der Hundeführer entfernt sich bei der Übung „Ablegen des Hundes unter Ablenkung\":",o:["Er kann in unmittelbarer Nähe stehen bleiben wenn er sich nicht sicher ist, dass der Hund liegen bleibt.","Er entfernt sich 10 Meter.","Die Entfernung spielt keine Rolle."],c:[1]},
  {n:124,s:4,q:"Bei der Übung „Ablegen unter Ablenkung\" wird der Hund auf Richteranweisung am angewiesenen Platz abgelegt. Danach…",o:["bindet der Hundeführer den Hund mit der Leine fest und entfernt sich vom Hund.","entfernt sich der Hundeführer vom Hund ohne einen Gegenstand beim Hund abzulegen.","kann der Hundeführer die Leine oder eine Gegenstand beim Hund belassen und entfernt sich vom Hund."],c:[1]},
  {n:125,s:4,q:"Aus der Übung \"Sitz\" wird der Hund:",o:["Abgerufen","Abgeholt","Spielt keine Rolle, er kann abgerufen oder abgeholt werden."],c:[1]},
  {n:126,s:4,q:"Der Hund wird bei der Übung \"Ablegen in Verbindung mit Herankommen\" mit Hörzeichen für Ablegen abgelegt. Danach entfernt sich der Hundeführer:",o:["ca. 30 Schritte","ca. 20 Schritte","ca. 40 Schritte"],c:[0]},
  {n:127,s:4,q:"Während einer Prüfung darf der Hundeführer…",o:["Spielgegenstände mit sich führen um den Hund zu motivieren.","den Hund zeitweise je nach Bedarf aus der Tasche füttern.","keinerlei Spielgegenstände oder Futter mit sich führen."],c:[2]},
  {n:128,s:4,q:"Körper- und Hörzeichenhilfen dürfen während der Vorführung vom Hundeführer...",o:["keinesfalls gegeben werden.","in jedem Fall gegeben werden.","zeitweise, falls erforderlich, gegeben werden."],c:[0]},
  {n:129,s:4,q:"Der Beginn einer Übung…",o:["wird durch den Hundeführer bestimmt.","erfolgt auf Anweisung des Richters.","erfolgt auf Anweisung des Prüfungsleiters."],c:[0]},
  {n:130,s:4,q:"Bringen Sie die nachfolgend aufgeführten Übungen des Teils \"A\" in die richtige Reihenfolge: a = Sitzübung; b = Leinenführigkeit; c = Ablegen unter Ablenkung; d = Ablegen in Verbindung mit Herankommen.",o:["a, b, c, d","b, a, d, c","d, c, b, a"],c:[1]},
  {n:131,s:4,q:"Die Übungsteile – Prüfung im Verkehr Teil \"B\" (VT) werden durchgeführt:",o:["innerhalb geschlossener Ortschaften.","auf dem Parkplatz der Ortsgruppe.","auf Wirtschaftswegen im unmittelbaren Bereich der Ortsgruppe."],c:[0]},
  {n:132,s:4,q:"Der Teil \"B\" besteht aus mindestens:",o:["4 Einzelübungen.","5 Einzelübungen.","6 Einzelübungen."],c:[2]},
  {n:133,s:4,q:"Die Überprüfung des Teils \"B\" dient…",o:["dem Sozialverhalten gegenüber Mensch und Tier.","der Umweltsicherheit."],c:[0,1]},
  {n:134,s:4,q:"Während der Überprüfung des Teils \"B\" ist der Hund bei allen Übungen:",o:["immer an der Leine zu führen.","kann zeitweise abgeleint werden.","stets frei zu führen."],c:[0]},
  {n:135,s:4,q:"Bei der Übung 1 \"Begegnung mit Personengruppe\"…",o:["wird der Hund je nach Belieben links oder rechts geführt.","wird der Hund links geführt.","kann der Hund an der Leine vorangehen."],c:[1]},
  {n:136,s:4,q:"Während der Übung 1 \"Begegnung mit Personengruppe\" wird der Hund durch eine Personengruppe geführt. Der Hundeführer wird durch eine Person angesprochen und mit Handschlag begrüßt. Dabei…",o:["kann der Hund seinen Führer verteidigen weil er den Handschlag als Bedrohung auffasst.","muss sich der Hund auf Anweisung des Hundeführers absetzen.","kann der Hund außerhalb der Personengruppe abgelegt werden."],c:[1]},
  {n:137,s:4,q:"Während der Übung 1 \"Begegnung mit Personengruppe\" kann die Strasse im Bereich eines Zebrastreifens gekreuzt werden. Dabei…",o:["spielt der Autoverkehr keine Rolle – wir befinden uns auf dem Zebrastreifen.","hat der Hundeführer vor dem Überkreuzen der Strasse auf den Verkehr zu achten.","hat der Prüfungsleiter den Verkehr aufzuhalten."],c:[1]},
  {n:138,s:4,q:"Bei Übung 6 \"Verhalten des kurzfristig im Verkehr alleingelassenen Hundes\" ist der vorgeführte Hund…",o:["vom Prüfungsleiter oder einer anderen Person an der Leine zu halten.","an einer angewiesenen Stelle mit der Leine festzubinden.","an der angewiesenen Stelle frei abzulegen."],c:[1]},
  {n:139,s:4,q:"Bei der Übung 5 \"Begegnung mit anderen Hunden\"…",o:["hat sich der Hund neutral zu verhalten.","dürfen die Hunde zusammen spielen.","darf der Hund in Sitz- oder Platzposition gebracht werden."],c:[0,2]},
  {n:140,s:4,q:"Die Reihenfolge der Übungen des Teil \"B\"…",o:["wird vom Hundeführer nach Belieben festgelegt.","kann vom Richter variiert werden.","bestimmt der Prüfungsleiter."],c:[1]},
  {n:141,s:4,q:"Können Jugendliche das Amt eines Prüfungsleiters übernehmen?",o:["Ja, mit Einverständniserklärung der Eltern","Nein, der Prüfungsleiter muss volljährig sein.","Ja, auch ohne Einverständniserklärung der Eltern"],c:[1]},
  {n:142,s:4,q:"Welche Hunde sind zur FCI-BH/VT-Prüfung zugelassen?",o:["Hunde über 20 kg und 40 cm Schulterhöhe","Nur deutsche Schäferhunde","Hunde aller Rassen und Größen"],c:[2]},
  {n:143,s:4,q:"Darf ein Hund, welcher die Unbefangenheitsprobe nicht bestanden hat, an der weiteren Prüfung teilnehmen?",o:["Ja","Nein","Das liegt im Ermessen des Leistungsrichters."],c:[1]},
  {n:144,s:4,q:"Wie hat sich der Hund bei dem Hörzeichen Fuß aus der Grundstellung heraus zu verhalten?",o:["Er hat dem Hundeführer freudig zu folgen.","Er soll sich setzen und auf weitere Hörzeichens warten.","Er soll sich links neben dem Hundeführer setzen."],c:[0]},
  {n:145,s:4,q:"Soll das Halsband während der ganzen Prüfung auf Zug gestellt sein?",o:["Das bleibt dem Hundeführer überlassen.","Ja","Nein"],c:[2]},
  {n:146,s:4,q:"Was ist für das Bestehen des Teil „B\" maßgeblich?",o:["Die Punktezahl, die der Leistungsrichter vergibt.","Der gesamte Eindruck des Verhaltens im Straßenverkehr.","Die mit gutem Erfolg gezeigten Übungen."],c:[1]},
  {n:147,s:4,q:"Wie hat sich der Hund bei der Übung „Ablegen in Verbindung mit Herankommen\" zu verhalten, wenn ihn der Hundeführer zu sich heranruft?",o:["Freudig hat er sich dem Hundeführer in schneller Gangart zu nähern und sich dicht vor ihn zu setzen.","Er hat sich freudig dem Hundeführer zu nähern und legt sich dicht vor ihn hin.","Er hat sich freudig und in schneller Gangart zu nähern und sich links neben ihn zu legen."],c:[0]},
  {n:148,s:4,q:"Wo hat der Hundeführer bei der Übung Leinenführigkeit in der FCI-BH/VT-Prüfung seine Leine zu führen?",o:["In der linken Hand","In der rechten Hand","Ist egal"],c:[0]},
  {n:149,s:4,q:"Welche Übung gehört nicht zur BH/VT-Prüfung?",o:["Überprüfung der Schusssicherheit.","Platzmachen und Herankommen.","Unbefangenheit des Hundes gegenüber Fahrzeugen und Personen."],c:[0]},
  {n:150,s:4,q:"Wer darf an BH/VT-Prüfungen teilnehmen?",o:["Hundehalter mit oder ohne Mitgliedschaft in einem VDH-Mitgliedsverein.","Nur Mitglieder von VDH-Mitgliedsvereinen."],c:[1]},
  {n:151,s:4,q:"Kann eine BH-Prüfung im Gehorsams- und Straßenverkehrsteil abgelegt werden, wenn der Hundehalter keinen Sachkundenachweis erbringen kann?",o:["Ja","Nein"],c:[1]},
  {n:152,s:4,q:"Können zwei Teilnehmer an einer Prüfung mit dem gleichen Hund teilnehmen?",o:["Ja","Nein"],c:[1]},
  {n:153,s:4,q:"Wie viele Hunde darf ein Teilnehmer zu einer Prüfung vorstellen?",o:["Max. 3 Hunde.","Max. 2 Hunde.","Nur 1 Hund."],c:[1]},
  {n:154,s:4,q:"Muss für den vorgeführten Hund eine Haftpflichtversicherung nachgewiesen werden?",o:["Ja.","Nein."],c:[0]},
];

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LS = { SETTINGS: 'bhvt-settings', WRONG: 'bhvt-wrong-ids', STATS: 'bhvt-section-stats' };
const DEFAULT_SETTINGS = { selectedSection: 'all', mode: 'practice', doShuffle: true, questionLimit: 'all' };
const DEFAULT_STATS = { 1: { a: 0, c: 0 }, 2: { a: 0, c: 0 }, 3: { a: 0, c: 0 }, 4: { a: 0, c: 0 } };
const VALID_SECTIONS = ['all', '1', '2', '3', '4'];
const VALID_MODES = ['practice', 'exam'];
const VALID_LIMITS = ['10', '20', '50', 'all'];

function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return defaultValue;
      const parsed = JSON.parse(raw);
      if (defaultValue && typeof defaultValue === 'object' && !Array.isArray(defaultValue)) {
        return { ...defaultValue, ...parsed };
      }
      return parsed;
    } catch {
      return defaultValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}

export default function App() {
  const [screen, setScreen] = useState('menu'); // menu, quiz, results
  const [settings, setSettings] = useLocalStorageState(LS.SETTINGS, DEFAULT_SETTINGS);
  const selectedSection = VALID_SECTIONS.includes(settings.selectedSection) ? settings.selectedSection : 'all';
  const mode = VALID_MODES.includes(settings.mode) ? settings.mode : 'practice';
  const doShuffle = typeof settings.doShuffle === 'boolean' ? settings.doShuffle : true;
  const questionLimit = VALID_LIMITS.includes(settings.questionLimit) ? settings.questionLimit : 'all';
  const patchSettings = (p) => setSettings(s => ({ ...s, ...p }));
  const setSelectedSection = v => patchSettings({ selectedSection: v });
  const setMode = v => patchSettings({ mode: v });
  const setDoShuffle = v => patchSettings({ doShuffle: v });
  const setQuestionLimit = v => patchSettings({ questionLimit: v });
  const [wrongIds, setWrongIds] = useLocalStorageState(LS.WRONG, []);
  const [sectionStats, setSectionStats] = useLocalStorageState(LS.STATS, DEFAULT_STATS);
  const [reviewMode, setReviewMode] = useState(false);
  const [examSimActive, setExamSimActive] = useState(false);
  const effectiveMode = examSimActive ? 'exam' : mode;
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]); // {question, selected, correct, points}

  useEffect(() => {
    setWrongIds(ids => ids.filter(n => QUESTIONS.some(q => q.n === n)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startQuiz = (review = false) => {
    let pool;
    if (review) {
      pool = QUESTIONS.filter(q => wrongIds.includes(q.n));
      if (pool.length === 0) return;
    } else {
      pool = selectedSection === 'all'
        ? [...QUESTIONS]
        : QUESTIONS.filter(q => q.s === Number(selectedSection));
    }
    if (doShuffle) pool = shuffle(pool);
    if (!review && questionLimit !== 'all') {
      pool = pool.slice(0, Number(questionLimit));
    }
    setReviewMode(review);
    setExamSimActive(false);
    setQuizQuestions(pool);
    setCurrentIdx(0);
    setSelected([]);
    setSubmitted(false);
    setResults([]);
    setScreen('quiz');
  };

  // Simulates a real BH/VT exam: 20 questions from all sections, exam mode, shuffled.
  // Per SV: 20 questions, +2/-2 scoring, 70% to pass.
  const startExamSimulation = () => {
    const pool = shuffle([...QUESTIONS]).slice(0, 20);
    setReviewMode(false);
    setExamSimActive(true);
    setQuizQuestions(pool);
    setCurrentIdx(0);
    setSelected([]);
    setSubmitted(false);
    setResults([]);
    setScreen('quiz');
  };

  const toggleOption = (idx) => {
    if (submitted) return;
    setSelected(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const submitAnswer = () => {
    const q = quizQuestions[currentIdx];
    // Scoring per official rules: +2 per correct selected, -2 per wrong selected
    let points = 0;
    selected.forEach(i => {
      if (q.c.includes(i)) points += 2;
      else points -= 2;
    });
    const isCorrect = arraysEqual(selected, q.c);
    const newResult = { question: q, selected: [...selected], isCorrect, points };
    setResults(prev => [...prev, newResult]);

    setSectionStats(s => {
      const prev = s[q.s] || { a: 0, c: 0 };
      return { ...s, [q.s]: { a: prev.a + 1, c: prev.c + (isCorrect ? 1 : 0) } };
    });
    setWrongIds(ids => {
      const set = new Set(ids);
      if (reviewMode) {
        if (isCorrect) set.delete(q.n);
      } else if (!isCorrect) {
        set.add(q.n);
      }
      return [...set];
    });

    if (effectiveMode === 'practice') {
      setSubmitted(true);
    } else {
      nextQuestion([...results, newResult]);
    }
  };

  const nextQuestion = (currentResults = results) => {
    if (currentIdx + 1 >= quizQuestions.length) {
      setScreen('results');
    } else {
      setCurrentIdx(currentIdx + 1);
      setSelected([]);
      setSubmitted(false);
    }
  };

  const backToMenu = () => {
    setScreen('menu');
    setQuizQuestions([]);
    setResults([]);
    setCurrentIdx(0);
    setSelected([]);
    setSubmitted(false);
    setReviewMode(false);
    setExamSimActive(false);
  };

  // ---------- MENU SCREEN ----------
  if (screen === 'menu') {
    const counts = {
      all: QUESTIONS.length,
      1: QUESTIONS.filter(q => q.s === 1).length,
      2: QUESTIONS.filter(q => q.s === 2).length,
      3: QUESTIONS.filter(q => q.s === 3).length,
      4: QUESTIONS.filter(q => q.s === 4).length,
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 pt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg mb-4">
              <Dog className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-2">
              BH/VT Sachkunde
            </h1>
            <p className="text-stone-600">
              Spielerisch lernen für die FCI-Begleithundeprüfung
            </p>
          </div>

          {/* Exam simulation - prominent CTA */}
          <button
            onClick={startExamSimulation}
            className="w-full bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-2xl p-5 mb-4 shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl active:scale-[0.99] text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg leading-tight">Prüfungssimulation</div>
                <div className="text-sm text-amber-50/90 mt-0.5">
                  20 Fragen · alle Bereiche · 70 % zum Bestehen
                </div>
              </div>
              <ChevronRight className="w-5 h-5 flex-shrink-0" />
            </div>
          </button>

          {/* Fehlerfragen - review mode */}
          <button
            onClick={() => startQuiz(true)}
            disabled={wrongIds.length === 0}
            className={`w-full rounded-2xl p-5 mb-4 shadow-lg transition-all text-left ${
              wrongIds.length === 0
                ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                : 'bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 text-white shadow-rose-500/25 hover:shadow-xl active:scale-[0.99]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                wrongIds.length === 0 ? 'bg-stone-300' : 'bg-white/20 backdrop-blur'
              }`}>
                <RotateCcw className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg leading-tight">Fehlerfragen üben</div>
                <div className={`text-sm mt-0.5 ${
                  wrongIds.length === 0 ? 'text-stone-500' : 'text-rose-50/90'
                }`}>
                  {wrongIds.length === 0
                    ? 'Keine Fehler gemerkt — alles richtig!'
                    : `${wrongIds.length} ${wrongIds.length === 1 ? 'Frage' : 'Fragen'} zum Wiederholen`}
                </div>
              </div>
              {wrongIds.length > 0 && <ChevronRight className="w-5 h-5 flex-shrink-0" />}
            </div>
          </button>

          {/* Divider with label */}
          <div className="flex items-center gap-3 mb-4 mt-2">
            <div className="flex-1 h-px bg-stone-300"></div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Oder gezielt üben
            </span>
            <div className="flex-1 h-px bg-stone-300"></div>
          </div>

          {/* Section selection */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 mb-4">
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <ListChecks className="w-4 h-4" />
              Themenbereich
            </h2>
            <button
              onClick={() => setSelectedSection('all')}
              className={`w-full text-left p-4 rounded-xl mb-2 transition-all border-2 ${
                selectedSection === 'all'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-stone-200 hover:border-stone-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-800">Alle Bereiche</div>
                  <div className="text-sm text-stone-500">Komplette Prüfung</div>
                </div>
                <span className="text-xs font-semibold bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full">
                  {counts.all} Fragen
                </span>
              </div>
            </button>

            {Object.entries(SECTIONS).map(([key, sec]) => {
              const Icon = sec.icon;
              const active = selectedSection === key;
              const stat = sectionStats[key] || { a: 0, c: 0 };
              const accuracy = stat.a > 0 ? Math.round((stat.c / stat.a) * 100) : null;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSection(key)}
                  className={`w-full text-left p-4 rounded-xl mb-2 transition-all border-2 ${
                    active
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${sec.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-stone-800">Teil {key}: {sec.short}</div>
                      <div className="text-xs text-stone-500 truncate">{sec.name}</div>
                      {accuracy !== null ? (
                        <div className={`text-[11px] mt-0.5 font-medium ${
                          accuracy >= 70 ? 'text-emerald-600' : accuracy >= 40 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {accuracy}% richtig · {stat.a} versucht
                        </div>
                      ) : (
                        <div className="text-[11px] text-stone-400 mt-0.5">Noch nicht geübt</div>
                      )}
                    </div>
                    <span className="text-xs font-semibold bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full flex-shrink-0">
                      {counts[key]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mode selection */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 mb-4">
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Modus
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('practice')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  mode === 'practice'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="font-semibold text-stone-800">📚 Übung</div>
                <div className="text-xs text-stone-500 mt-1">Sofortiges Feedback</div>
              </button>
              <button
                onClick={() => setMode('exam')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  mode === 'exam'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="font-semibold text-stone-800">🎯 Prüfung</div>
                <div className="text-xs text-stone-500 mt-1">Auswertung am Ende</div>
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 mb-6">
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Einstellungen
            </h2>
            <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 mb-2 cursor-pointer">
              <div className="flex items-center gap-3">
                <Shuffle className="w-5 h-5 text-stone-600" />
                <span className="font-medium text-stone-800">Fragen mischen</span>
              </div>
              <button
                onClick={() => setDoShuffle(!doShuffle)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  doShuffle ? 'bg-emerald-500' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    doShuffle ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
            <div className="p-3 rounded-xl bg-stone-50">
              <div className="text-sm font-medium text-stone-700 mb-2">Anzahl Fragen</div>
              <div className="grid grid-cols-4 gap-2">
                {['10', '20', '50', 'all'].map(n => (
                  <button
                    key={n}
                    onClick={() => setQuestionLimit(n)}
                    className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                      questionLimit === n
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-stone-700 border border-stone-200'
                    }`}
                  >
                    {n === 'all' ? 'Alle' : n}
                  </button>
                ))}
              </div>
            </div>
            {(wrongIds.length > 0 || Object.values(sectionStats).some(s => s.a > 0)) && (
              <div className="mt-3 pt-3 border-t border-stone-200 flex flex-col gap-1.5">
                {wrongIds.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Fehlerliste wirklich leeren? Alle gemerkten falsch beantworteten Fragen werden entfernt.')) {
                        setWrongIds([]);
                      }
                    }}
                    className="text-xs text-stone-500 hover:text-rose-600 text-left transition-colors"
                  >
                    Fehlerliste zurücksetzen ({wrongIds.length})
                  </button>
                )}
                {Object.values(sectionStats).some(s => s.a > 0) && (
                  <button
                    onClick={() => {
                      if (window.confirm('Statistik wirklich zurücksetzen? Alle Trefferquoten werden auf null gesetzt.')) {
                        setSectionStats(DEFAULT_STATS);
                      }
                    }}
                    className="text-xs text-stone-500 hover:text-rose-600 text-left transition-colors"
                  >
                    Statistik zurücksetzen
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Quiz starten
            <ChevronRight className="w-5 h-5" />
          </button>

          <p className="text-center text-xs text-stone-500 mt-4">
            +2 Punkte pro richtiger Antwort · -2 Punkte pro falscher · 70 % zum Bestehen
          </p>

          <div className="mt-8 pt-6 border-t border-stone-200 text-center text-[11px] text-stone-400 leading-relaxed">
            Inoffizielles Lerntool für den internen Gebrauch.<br />
            Fragen © Verein für Deutsche Schäferhunde (SV) e.V., Stand 2025.<br />
            Quelle: <a href="https://www.schaeferhunde.de" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-600">schaeferhunde.de</a>
          </div>
        </div>
      </div>
    );
  }

  // ---------- QUIZ SCREEN ----------
  if (screen === 'quiz') {
    const q = quizQuestions[currentIdx];
    const sec = SECTIONS[q.s];
    const progress = ((currentIdx + (submitted ? 1 : 0)) / quizQuestions.length) * 100;
    const lastResult = submitted ? results[results.length - 1] : null;
    const multipleCorrect = q.c.length > 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 gap-2">
            <button
              onClick={backToMenu}
              className="flex items-center gap-1 text-stone-600 hover:text-stone-800 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Menü
            </button>
            {reviewMode && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 border border-rose-200 px-2 py-1 rounded-full">
                <RotateCcw className="w-3 h-3" /> Fehlerfragen
              </span>
            )}
            <div className="text-sm font-semibold text-stone-600">
              {currentIdx + 1} / {quizQuestions.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden mb-4">
            <div className={`bg-gradient-to-r ${sec.color} px-5 py-3 flex items-center justify-between`}>
              <span className="text-white text-xs font-bold uppercase tracking-wider">
                Teil {q.s} · {sec.short}
              </span>
              <span className="text-white/90 text-xs font-semibold">Frage {q.n}</span>
            </div>

            <div className="p-5">
              <h2 className="text-lg font-bold text-stone-800 leading-snug mb-2">
                {q.q}
              </h2>
              {multipleCorrect && !submitted && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg inline-block mb-3">
                  💡 Mehrere Antworten können richtig sein
                </p>
              )}

              <div className="space-y-2 mt-4">
                {q.o.map((opt, i) => {
                  const isSelected = selected.includes(i);
                  const isCorrect = q.c.includes(i);
                  let cls = 'border-stone-200 bg-white hover:border-stone-300';
                  let iconEl = null;

                  if (submitted) {
                    if (isCorrect && isSelected) {
                      cls = 'border-emerald-500 bg-emerald-50';
                      iconEl = <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
                    } else if (isCorrect && !isSelected) {
                      cls = 'border-emerald-400 bg-emerald-50/50';
                      iconEl = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
                    } else if (!isCorrect && isSelected) {
                      cls = 'border-red-500 bg-red-50';
                      iconEl = <XCircle className="w-5 h-5 text-red-600" />;
                    } else {
                      cls = 'border-stone-200 bg-stone-50/50 opacity-60';
                    }
                  } else if (isSelected) {
                    cls = 'border-emerald-500 bg-emerald-50';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => toggleOption(i)}
                      disabled={submitted}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${cls} ${
                        !submitted ? 'active:scale-[0.99]' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm ${
                          isSelected || (submitted && isCorrect)
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-100 text-stone-600'
                        } ${submitted && isSelected && !isCorrect ? '!bg-red-500 !text-white' : ''}`}>
                          {LETTERS[i]}
                        </div>
                        <div className="flex-1 text-stone-800 text-sm sm:text-base leading-snug pt-0.5">
                          {opt}
                        </div>
                        {iconEl && <div className="flex-shrink-0 pt-0.5">{iconEl}</div>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {submitted && lastResult && (
                <div className={`mt-4 p-4 rounded-xl border-2 ${
                  lastResult.isCorrect
                    ? 'border-emerald-200 bg-emerald-50'
                    : lastResult.points > 0
                    ? 'border-amber-200 bg-amber-50'
                    : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-stone-800">
                      {lastResult.isCorrect
                        ? '✅ Vollständig richtig!'
                        : lastResult.points > 0
                        ? '⚠️ Teilweise richtig'
                        : '❌ Leider falsch'}
                    </div>
                    <div className={`text-sm font-bold ${
                      lastResult.points > 0
                        ? 'text-emerald-700'
                        : lastResult.points < 0
                        ? 'text-red-700'
                        : 'text-stone-600'
                    }`}>
                      {lastResult.points > 0 ? '+' : ''}{lastResult.points} Punkte
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          {!submitted ? (
            <button
              onClick={submitAnswer}
              disabled={selected.length === 0}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-stone-300 disabled:to-stone-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98]"
            >
              {effectiveMode === 'practice' ? 'Antwort prüfen' : 'Weiter'}
            </button>
          ) : (
            <button
              onClick={() => nextQuestion()}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {currentIdx + 1 >= quizQuestions.length ? 'Ergebnis ansehen' : 'Nächste Frage'}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---------- RESULTS SCREEN ----------
  if (screen === 'results') {
    const totalPoints = results.reduce((sum, r) => sum + r.points, 0);
    const maxPoints = quizQuestions.reduce((sum, q) => sum + q.c.length * 2, 0);
    const percentage = maxPoints > 0 ? Math.max(0, (totalPoints / maxPoints) * 100) : 0;
    const passed = percentage >= 70;
    const correctCount = results.filter(r => r.isCorrect).length;
    const wrongQuestions = results.filter(r => !r.isCorrect);

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center pt-6 mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-lg mb-4 ${
              passed
                ? 'bg-gradient-to-br from-emerald-500 to-emerald-700'
                : 'bg-gradient-to-br from-amber-500 to-amber-700'
            }`}>
              {passed ? (
                <Trophy className="w-11 h-11 text-white" />
              ) : (
                <RotateCcw className="w-11 h-11 text-white" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-stone-800 mb-1">
              {passed ? 'Bestanden! 🎉' : 'Weiter üben!'}
            </h1>
            <p className="text-stone-600">
              {passed
                ? 'Du hast die 70%-Hürde geschafft.'
                : 'Du brauchst mindestens 70% zum Bestehen.'}
            </p>
          </div>

          {/* Score card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 mb-4">
            <div className="text-center mb-4">
              <div className={`text-6xl font-bold ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {percentage.toFixed(0)}%
              </div>
              <div className="text-stone-500 text-sm mt-1">
                {totalPoints} von {maxPoints} möglichen Punkten
              </div>
            </div>

            <div className="h-3 bg-stone-200 rounded-full overflow-hidden mb-4 relative">
              <div
                className={`h-full transition-all duration-700 ${
                  passed
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600'
                }`}
                style={{ width: `${Math.min(100, percentage)}%` }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-stone-700"
                style={{ left: '70%' }}
                title="Bestehensgrenze"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-emerald-50">
                <div className="text-2xl font-bold text-emerald-600">{correctCount}</div>
                <div className="text-xs text-stone-600">Richtig</div>
              </div>
              <div className="p-3 rounded-xl bg-red-50">
                <div className="text-2xl font-bold text-red-600">{wrongQuestions.length}</div>
                <div className="text-xs text-stone-600">Falsch</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-100">
                <div className="text-2xl font-bold text-stone-700">{quizQuestions.length}</div>
                <div className="text-xs text-stone-600">Gesamt</div>
              </div>
            </div>
          </div>

          {/* Wrong questions review */}
          {wrongQuestions.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 mb-4">
              <h3 className="font-bold text-stone-800 mb-3">
                Diese Fragen nochmal anschauen:
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {wrongQuestions.map((r, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="text-xs font-semibold text-stone-500 mb-1">
                      Frage {r.question.n} · Teil {r.question.s}
                    </div>
                    <div className="text-sm font-medium text-stone-800 mb-2">
                      {r.question.q}
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold">
                      Richtig: {r.question.c.map(i => LETTERS[i]).join(', ')} ·{' '}
                      <span className="font-normal text-stone-600">
                        {r.question.c.map(i => r.question.o[i]).join(' / ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={backToMenu}
              className="bg-white border-2 border-stone-300 hover:border-stone-400 text-stone-700 font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
            >
              Zum Menü
            </button>
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Neuer Versuch
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
