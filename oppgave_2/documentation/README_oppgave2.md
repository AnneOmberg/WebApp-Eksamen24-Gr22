# Oppgave 2 - Gruppe 22

| Studentnummer | Navn                                   | Epost            |
| ------------- | -------------------------------------- | ---------------- |
| 223086        | Vilde Andreas Fjeld Pedersen           | vapeders@hiof.no |
| 162811        | Anne May Omberg                        | annemni@hiof.no  |
| 223810        | Thor Andreas Holberg Murtnes-Hatlestad | thoraho@hiof.no  |

# Innholdsfortegnelse

1. [API endepunkt](#api-endepunkt)
2. [Sider og funksjonalitet](#sider-og-funksjonalitet)

## [API endepunkt](#api-endepunkt)

### Templates

- **GET /api/templates**: Henter en liste over alle maler.
- **GET /api/templates/:id**: Henter en spesifikk mal.
- **POST /api/templates**: Oppretter en ny mal.
- **DELETE /api/templates/:id**: Sletter en spesifikk mal.

### Events/Happenings

- **GET /api/events**: Henter en liste over alle hendelser/events/happenings.
- **POST /api/events**: Oppretter en ny hendelse/event/happening.
- **PUT /api/events/:id**: Oppdaterer en spesifikk hendelse/event/happening.
- **DELETE /api/events/:id**: Sletter en spesifikk hendelse/event/happening.

### Users

- **GET /api/users**: Henter en liste over alle brukere.

### Categories

- **GET /categories**: Henter en liste over alle kategorier.

## [Sider og funksjonalitet](#sider-og-funksjonalitet)

#### Happenings.tsx

- **Happenings Komponent**:
  - Viser en liste over hendelser gruppert etter år og måned.
  - Tillater filtrering etter kategori og sortering etter dato eller alfabetisk rekkefølge.
  - Bruker `useHappening` hook for å hente og administrere hendelsesdata.
  - Bruker `useAdmin` hook for å sjekke om brukeren er admin og betinget vise innhold.

#### CreateHappening.tsx

- **CreateHappening Komponent**:
  - Tillater brukere å opprette en ny hendelse basert på en mal.
  - Henter maldata basert på `templateId` og forhåndsutfyller skjemafeltene.
  - Felter fra malen er låst og skrivebeskyttet hvis de har data, mens brukeren kan skrive inn verdier for de andre feltene.
  - Bruker `useHappening` hook for å opprette en ny hendelse.
  - Bruker `useTemplate` hook for å hente maldata.

#### TemplateCard.tsx

- **TemplateCard Komponent**:
  - Viser et kort med maldetaljer som tittel, beskrivelse, tillatte ukedager og pris.
  - Gir knapper for å bruke malen, redigere malen og slette malen.
  - Bruker `deleteTemplate` funksjonen for å slette en mal.

#### Order.tsx

- **Order Komponent**:
  - Tillater brukere å registrere seg for en hendelse ved å skrive inn detaljene sine i et skjema.
  - Administrerer skjemadata ved hjelp av `useState` hook.
  - Bruker `useHappening` hook for å hente hendelsesdata.
  - Sender skjemadata til serveren for å registrere deltakere.
