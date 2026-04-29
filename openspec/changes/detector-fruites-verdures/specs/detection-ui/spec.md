## REQUISITS AFEGITS

### Requisit: Interfície de càrrega d'imatges
L'usuari HA DE poder seleccionar una imatge des del seu dispositiu per ser analitzada.

#### Escenari: Selecció de fitxer vàlid
- **QUAN** l'usuari selecciona un fitxer d'imatge (JPG o PNG)
- **A LESHORES** la interfície mostra una previsualització de la imatge seleccionada

### Requisit: Visualització del resultat de l'anàlisi
La interfície HA DE mostrar de forma clara si l'element detectat és una fruita o una verdura després del processament.

#### Escenari: Visualització d'èxit
- **QUAN** el backend respon amb una classificació positiva
- **A LESHORES** la interfície mostra una targeta amb el nom de la categoria ("Fruita" o "Verdura") i la probabilitat
