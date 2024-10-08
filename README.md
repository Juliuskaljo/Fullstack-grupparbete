# Fullstack-grupparbete

API Documentation
Overview
Detta API hanterar en databas med CS-skins, användare och en kundvagn. API
är byggt med Express och MongoDB, och det lyssnar på port 1227.

Bas-URL
API
nås via följande bas-URL:

Kopiera kod
http://localhost:1227
Routes och Endpoints
Skins

1. Hämta alla skins
   Endpoint: /skins

Metod: GET

Beskrivning: Returnerar en lista med alla skins.

Exempel på anrop:

javascript
Kopiera kod
fetch('http://localhost:1227/skins')
.then(response => response.json())
.then(data => console.log(data));
Svarsexempel:

json
Kopiera kod
[
{
"_id": "615d1b58fcdcbf001ce8c8e2",
"skinName": "AK-47 | Redline",
"rarity": "Classified",
"price": 15.99
},
...
] 2. Hämta ett specifikt skin
Endpoint: /skins/:skinName

Metod: GET

Beskrivning: Hämta specifika skins med ett matchande namn. Endpointen gör en delvis matchning av skin-namnet.

Exempel på anrop:

javascript
Kopiera kod
fetch('http://localhost:1227/skins/ak')
.then(response => response.json())
.then(data => console.log(data));
Svarsexempel:

json
Kopiera kod
[
{
"_id": "615d1b58fcdcbf001ce8c8e2",
"skinName": "AK-47 | Redline",
"rarity": "Classified",
"price": 15.99
}
] 3. Lägg till ett skin
Endpoint: /skins
Metod: POST
Beskrivning: Lägg till ett nytt skin i databasen.
Request Body:
json
Kopiera kod
{
"skinName": "AWP | Dragon Lore",
"rarity": "Covert",
"price": 1500
}
Exempel på anrop:
javascript
Kopiera kod
fetch('http://localhost:1227/skins', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
skinName: "AWP | Dragon Lore",
rarity: "Covert",
price: 1500
})
}); 4. Ta bort ett skin
Endpoint: /skins/:id
Metod: DELETE
Beskrivning: Ta bort ett skin baserat på dess ID.
Exempel på anrop:
javascript
Kopiera kod
fetch('http://localhost:1227/skins/615d1b58fcdcbf001ce8c8e2', {
method: 'DELETE'
});
Carts

1. Hämta alla kundvagnar
   Endpoint: /carts

Metod: GET

Beskrivning: Hämta alla kundvagnar.

Exempel på anrop:

javascript
Kopiera kod
fetch('http://localhost:1227/carts')
.then(response => response.json())
.then(data => console.log(data));
Svarsexempel:

json
Kopiera kod
[
{
"\_id": "615d1b58fcdcbf001ce8c8e4",
"userId": "12345",
"items": [
{
"skinId": "615d1b58fcdcbf001ce8c8e2",
"quantity": 1
}
]
}
] 2. Lägg till en kundvagn
Endpoint: /carts

Metod: POST

Beskrivning: Skapa en ny kundvagn.

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
Exempel på anrop:

javascript
Kopiera kod
fetch('http://localhost:1227/carts', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
userId: "12345",
items: [
{
skinId: "615d1b58fcdcbf001ce8c8e2",
quantity: 1
}
]
})
}); 3. Ta bort en kundvagn
Endpoint: /carts/:id
Metod: DELETE
Beskrivning: Ta bort en kundvagn baserat på dess ID.
Exempel på anrop:
javascript
Kopiera kod
fetch('http://localhost:1227/carts/615d1b58fcdcbf001ce8c8e4', {
method: 'DELETE'
});
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
Svarsexempel:

json
Kopiera kod
[
{
"_id": "615d1b58fcdcbf001ce8c8e6",
"username": "user123",
"email": "user123@example.com"
},
...
] 2. Hämta en specifik användare
Endpoint: /users/:name
Metod: GET
Beskrivning: Hämta användare baserat på deras namn.
Exempel på anrop:
javascript
Kopiera kod
fetch('http://localhost:1227/users/user123')
.then(response => response.json())
.then(data => console.log(data)); 3. Lägg till en användare
Endpoint: /users

Metod: POST

Beskrivning: Lägg till en ny användare i databasen.

Request Body:

json
Kopiera kod
{
"username": "user123",
"email": "user123@example.com"
}
Exempel på anrop:

javascript
Kopiera kod
fetch('http://localhost:1227/users', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
username: "user123",
email: "user123@example.com"
})
}); 4. Ta bort en användare
Endpoint: /users/:id
Metod: DELETE
Beskrivning: Ta bort en användare baserat på dess ID.
Exempel på anrop:
javascript
Kopiera kod
fetch('http://localhost:1227/users/615d1b58fcdcbf001ce8c8e6', {
method: 'DELETE'
}); 5. Uppdatera en användare
Endpoint: /users/:id

Metod: PUT

Beskrivning: Uppdatera en användares information.

Request Body:

json
Kopiera kod
{
"username": "newUser123",
"email": "newemail@example.com"
}
Exempel på anrop:

javascript
Kopiera kod
fetch('http://localhost:1227/users/615d1b58fcdcbf001ce8c8e6', {
method: 'PUT',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
username: "newUser123",
email: "newemail@example.com"
})
});
Datamodeller
Skin
json
Kopiera kod
{
"skinName": "string",
"rarity": "string",
"price": "number"
}
Cart
json
Kopiera kod
{
"userId": "string",
"items": [
{
"skinId": "string",
"quantity": "number"
}
]
}
User
json
Kopiera kod
{
"username": "string",
"email": "string"
}
Felhantering
Varje svar från API
kommer att innehålla statuskoder som indikerar framgång eller misslyckande:

200 OK – För lyckade GET/POST/DELETE-anrop.
404 Not Found – Om ingen resurs hittas.
500 Internal Server Error – Vid serverfel eller problem med databasen.
Om du har några frågor eller behöver mer information om hur du gör anrop till API
, kontakta backend-utvecklingsteamet.
