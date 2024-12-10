# Oppgave 1 - Gruppe 22

| Studentnummer | Navn                                   | Epost            |
| ------------- | -------------------------------------- | ---------------- |
| 223086        | Vilde Andreas Fjeld Pedersen           | vapeders@hiof.no |
| 162811        | Anne May Omberg                        | annemni@hiof.no  |
| 223810        | Thor Andreas Holberg Murtnes-Hatlestad | thoraho@hiof.no  |

# Innholdsfortegnelse

1. [API endepunkt](#api-endepunkt)
2. [Sider og funksjonalitet](#sider-og-funksjonalitet)

## [API endepunkt](#api-endepunkt)

Oversikt over endepunkter

### Kurs

| HTTP-verb | Beskrivelse                    | Respons ved suksess             | Respons ved feil                                          |
| --------- | ------------------------------ | ------------------------------- | --------------------------------------------------------- |
| GET       | Henter en liste over alle kurs | 200 OK, JSON med data           | 404 Not Found hvis ingen kurs finnes, 500 ved serverfeil  |
| POST      | Oppretter en nytt kurs         | 201 Created, JSON med ny kurs   | 400 Bad Request hvis data er ugyldig, 500 ved serverfeil  |
| PUT       | Oppdaterer en spesifikt kurs   | 200 OK, JSON med oppdatert kurs | 404 Not Found hvis kurset ikke finnes, 500 ved serverfeil |
| DELETE    | Sletter et spesifikt kurs      | 204 No Content                  | 404 Not Found hvis kurset ikke finnes, 500 ved serverfeil |

### Leksjoner

| HTTP-verb | Beskrivelse                         | Respons ved suksess              | Respons ved feil                          |
| --------- | ----------------------------------- | -------------------------------- | ----------------------------------------- |
| GET       | Henter en liste over alle leksjoner | 200 OK, JSON med data            | 404 Not Found hvis ingen leksjoner finnes |
| POST      | Oppretter en ny leksjon             | 201 Created, JSON med ny leksjon | 400 Bad Request hvis data er ugyldig      |
| DELETE    | Sletter en spesifikk leksjon        | 204 No Content                   | 404 Not Found hvis leksjonen ikke finnes  |

## [Sider og funksjonalitet](#sider-og-funksjonalitet)

## Frontend funksjonalitet

- **Courses /kurs**
- Viser liste over tilgjengelige kurs
- Bruker `useCourses`-hook for å hente alle kurs

-**Lessons /lesson**

- Viser alle leksjoner tilgjengelig per kurs
- Bruker `useLesson` og `useComments` for å hente leksjoner og kommentarer koblet til leksjoner
- Bruker `useCourse`for å sjekke mot hvilket kurs som er valgt

- **Create /ny**
- Bruker `useCourse` og `createCourse`for å legge til nye kurs

```javascript
//Henter alle brukere i databasen
app.get("/api/users"(...)

//Henter alle kategorier i DB
app.get("/api/categories"(...)

//Legger til nytt kurs
app.post("/api/courses"(...)

// Henter alle kurs med leksjoner og kommentarer
app.get("/api/courses"(...)

//Sletter kurs med id
app.delete("/api/courses/:id"(...)

```
