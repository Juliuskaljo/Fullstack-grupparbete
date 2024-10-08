CS 2 API
Detta är ett API för CS2 skins, byggt med Node.js, Express och MongoDB. API
följer RESTful-principer och inkluderar CRUD-operationer för användare, skins och kundvagnar. Detta projekt är en del av en tech-stack som inkluderar MongoDB, Express, Node.js, och React (MERN stacken).

Table of Contents
Features
Tech Stack
Installation
API Endpoints
Users
Skins
Carts
Error Handling
HTTP Status Codes
License
Features
CRUD-operationer: Skapa, läsa, uppdatera och ta bort användare, skins och kundvagnar.
Validering: Säkerställ att inmatad data är korrekt.
REST API: Följer RESTful-standarder för skalbarhet och underhåll.
Felhantering: Hantering av vanliga HTTP-felkoder för att ge tydliga felmeddelanden.
Tech Stack
MongoDB – Databas för datahantering.
Express.js – Webbramverk för Node.js.
Node.js – JavaScript-miljö för serverkod.
React – Planerad för framtida implementation av frontend.
Installation
Klona repositoryn:
bash
Kopiera kod
git clone https://github.com/your-username/users-and-skins-api.git
cd users-and-skins-api
Installera beroenden:
bash
Kopiera kod
npm install
Konfigurera .env-fil:
Se till att du har en .env-fil i projektets rot:

makefile
Kopiera kod
CONNECTION_STRING=mongodb+srv://<userName>:<password>@<cluster>.mongodb.net/
MONGODB_DB_NAME=your-database-name
PORT=1227
Ersätt <userName> och <password> med ditt MongoDB-användarnamn och lösenord.

Starta servern:
bash
Kopiera kod
npm run server
Servern kommer att köras på http://localhost:1227.

API Endpoints
Users

1. Hämta alla användare
   Endpoint: /users
   Metod: GET
   Beskrivning: Returnerar en lista med alla användare.
   Exempel på anrop:
   javascript
   Kopiera kod
   fetch('http://localhost:1227/users')
   .then(response => response.json())
   .then(data => console.log(data));
2. Hämta en specifik användare
   Endpoint: /users/:name
   Metod: GET
   Beskrivning: Returnerar användare baserat på deras namn.
   Exempel på anrop:
   javascript
   Kopiera kod
   fetch('http://localhost:1227/users/john')
   .then(response => response.json())
   .then(data => console.log(data));
3. Lägg till en ny användare
   Endpoint: /users
   Metod: POST
   Beskrivning: Lägger till en ny användare i databasen.
   Request Body:
   json
   Kopiera kod
   {
   "username": "johndoe",
   "email": "johndoe@example.com"
   }
4. Ta bort en användare
   Endpoint: /users/:id
   Metod: DELETE
   Beskrivning: Tar bort en användare baserat på deras ID.
5. Uppdatera en användare
   Endpoint: /users/:id
   Metod: PUT
   Beskrivning: Uppdaterar användarens information.
   Skins
6. Hämta alla skins
   Endpoint: /skins
   Metod: GET
   Beskrivning: Returnerar alla tillgängliga skins.
7. Hämta ett specifikt skin
   Endpoint: /skins/:skinName
   Metod: GET
   Beskrivning: Hämta ett skin baserat på dess namn.
8. Lägg till ett nytt skin
   Endpoint: /skins
   Metod: POST
   Beskrivning: Lägger till ett nytt skin i databasen.
   Request Body:
   json
   Kopiera kod
   {
   "skinName": "AK-47 | Redline",
   "rarity": "Classified",
   "price": 15.99
   }
9. Ta bort ett skin
   Endpoint: /skins/:id
   Metod: DELETE
   Beskrivning: Tar bort ett skin baserat på dess ID.
   Carts
10. Hämta alla kundvagnar
    Endpoint: /carts
    Metod: GET
    Beskrivning: Returnerar alla kundvagnar.
11. Lägg till en ny kundvagn
    Endpoint: /carts
    Metod: POST
    Beskrivning: Skapar en ny kundvagn.
    Request Body:
    json
    Kopiera kod
    {
    "userId": "12345",
    "items": [
    {
    "skinId": "615d1b58fcdcbf001ce8c8e2",
    "quantity": 1
    }
    ]
    }
12. Ta bort en kundvagn
    Endpoint: /carts/:id
    Metod: DELETE
    Beskrivning: Tar bort en kundvagn baserat på dess ID.
    Error Handling
    API
    använder lämpliga HTTP-statuskoder för att indikera resultatet av varje förfrågan:

200 OK – Lyckad GET-förfrågan.
201 Created – Resursen har skapats.
400 Bad Request – Ogiltig begäran eller valideringsfel.
404 Not Found – Resursen hittades inte.
500 Internal Server Error – Något gick fel på servern.
HTTP Status Codes
200 OK: Begäran lyckades.
201 Created: En resurs har skapats framgångsrikt.
204 No Content: Begäran lyckades men inget innehåll returneras.
400 Bad Request: Begäran misslyckades på grund av ogiltiga data eller valideringsfel.
404 Not Found: Resursen kunde inte hittas.
500 Internal Server Error: Ett serverfel inträffade.
