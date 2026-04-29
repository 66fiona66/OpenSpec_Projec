## REQUISITS AFEGITS

### Requisit: Classificació d'imatges d'aliments
El sistema HA DE permetre rebre una imatge a través d'una API i determinar si l'element principal és una fruita o una verdura utilitzant un model d'intel·ligència artificial.

#### Escenari: Detecció d'una fruita
- **QUAN** s'envia una imatge d'una poma a l'endpoint de detecció
- **A LESHORES** el sistema retorna un JSON indicant que la categoria és "fruita" amb un nivell de confiança

#### Escenari: Detecció d'una verdura
- **QUAN** s'envia una imatge d'un bròquil a l'endpoint de detecció
- **A LESHORES** el sistema retorna un JSON indicant que la categoria és "verdura" amb un nivell de confiança

### Requisit: Traducció automàtica al català
El sistema HA DE traduir els noms de les etiquetes detectades pel model d'IA de l'anglès al català per a una millor comprensió de l'usuari.

#### Escenari: Traducció de fruita específica
- **QUAN** el model detecta una "Granny Smith"
- **A LESHORES** el sistema retorna el nom "Poma" en català

### Requisit: Compatibilitat amb Node.js v24+
El sistema HA DE ser capaç d'executar-se en entorns Node.js moderns on algunes funcions de `util` han estat eliminades.

#### Escenari: Execució sense errors de llibreria
- **QUAN** el servidor arrenca en una versió de Node on falta `util.isNullOrUndefined`
- **A LESHORES** el sistema aplica un polyfill i funciona correctament sense petar
