# Detector de Fruites i Verdures IA

Aquest projecte és una aplicació web que utilitza intel·ligència artificial per classificar imatges d'aliments i determinar si són fruites o verdures. Està construït amb una arquitectura moderna de client-servidor i utilitza models de Deep Learning per al reconeixement visual.

## Descripció

L'aplicació permet als usuaris pujar imatges des del seu dispositiu, les quals són analitzades per un model MobileNet de TensorFlow.js al backend. El sistema no només classifica l'aliment, sinó que també tradueix els resultats al català i mostra el nivell de confiança de la detecció.

## Característiques Principals

- **Classificació en temps real**: Resposta immediata gràcies a l'ús de TensorFlow.js.
- **Disseny**: Interfície d'usuari reactiva i moderna construïda amb Vue 3 i Vuetify.
- **Backend**: Servidor Express amb gestió de fitxers mitjançant Multer.
- **Compatibilitat**: Preparat per funcionar en versions recents de Node.js.

## Tecnologies Utilitzades

- **Frontend**: Vue 3, Vite, Vuetify 3.
- **Backend**: Node.js, Express.
- **IA**: TensorFlow.js, Model MobileNet.
- **Altres**: Multer (gestió d'imatges), Concurrently (execució simultània).

## Instal·lació i Ús

### Requisits previs
- Node.js 
- npm

### Passos per a l'execució
1. Clona el repositori.
2. Instal·la les dependències a l'arrel, al servidor i al client:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   cd ..
   ```
3. Executa l'aplicació en mode desenvolupament:
   ```bash
   npm run dev
   ```
4. Obre el navegador a `http://localhost:5173`.

## Metodologia de Desenvolupament

Aquest projecte ha estat desenvolupat utilitzant la metodologia **OpenSpec**, un enfocament basat en especificacions que divideix el procés en tres fases clarament diferenciades:

1. **Foundations**: Definició del context, objectius i abast (`proposal.md`).
2. **Specify**: Descripció funcional i comportament detallat mitjançant escenaris (`specs/`).
3. **Planning**: Organització tècnica, decisions d'arquitectura i llistat de tasques verificables (`design.md` i `tasks.md`).

---

*Projecte realitzat completament en català i sense emoticones.*
