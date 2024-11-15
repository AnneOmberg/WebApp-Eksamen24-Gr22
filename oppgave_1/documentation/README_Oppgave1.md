# Oppgave 1 - Gruppe 22

| Studentnummer | Navn                                   | Epost           |
| ------------- | -------------------------------------- | --------------- |
| ######        | Vilde Andreas Fjeld Pedersen           | vilped@hiof.no  |
| ######        | Anne May Omberg                        | annemni@hiof.no |
| 223810        | Thor Andreas Holberg Murtnes-Hatlestad | thoraho@hiof.no |

# Innholdsfortegnelse

1. [API endepunkt](#api-endepunkt)
2. [Sider og funksjonalitet](#sider-og-funksjonalitet)

## [API endepunkt](#api-endepunkt)

Oversikt over endepunkter

### Kurs

| HTTP-verb | Beskrivelse                    | Respons ved suksess             | Respons ved feil                      |
| --------- | ------------------------------ | ------------------------------- | ------------------------------------- |
| GET       | Henter en liste over alle kurs | 200 OK, JSON med data           | 404 Not Found hvis ingen kurs finnes  |
| POST      | Oppretter en nytt kurs         | 201 Created, JSON med ny kurs   | 400 Bad Request hvis data er ugyldig  |
| PUT       | Oppdaterer en spesifikt kurs   | 200 OK, JSON med oppdatert kurs | 404 Not Found hvis kurset ikke finnes |
| DELETE    | Sletter et spesifikt kurs      | 204 No Content                  | 404 Not Found hvis kurset ikke finnes |

### Leksjoner

| HTTP-verb | Beskrivelse                         | Respons ved suksess              | Respons ved feil                          |
| --------- | ----------------------------------- | -------------------------------- | ----------------------------------------- |
| GET       | Henter en liste over alle leksjoner | 200 OK, JSON med data            | 404 Not Found hvis ingen leksjoner finnes |
| POST      | Oppretter en ny leksjon             | 201 Created, JSON med ny leksjon | 400 Bad Request hvis data er ugyldig      |
| DELETE    | Sletter en spesifikk leksjon        | 204 No Content                   | 404 Not Found hvis leksjonen ikke finnes  |

## [Sider og funksjonalitet](#sider-og-funksjonalitet)

```javascript
'/kurs' //
'/kurs/[id]' //
'/kurs/[id]/[slug]' //
```
