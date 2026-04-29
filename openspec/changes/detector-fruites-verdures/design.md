## Context

Actualment no disposem d'un sistema de classificació d'aliments. El client vol una eina web moderna que permeti als usuaris pujar imatges i rebre una resposta immediata sobre si el que veuen és una fruita o una verdura.

## Objectius / No-Objectius

**Objectius:**
- Implementar un frontend reactiu amb Vue 3 i Vuetify.
- Crear una API robusta amb Express.
- Utilitzar un model d'IA (TensorFlow.js) per a la classificació local al servidor.
- Tota la comunicació i codi documentat en català.

**No-Objectius:**
- No es preveu un sistema d'usuaris o registre.
- No es preveu l'entrenament d'un model des de zero; s'utilitzaran models pre-entrenats.

## Decisions

- **Framework Frontend**: Vue 3 amb Vite per la seva velocitat de desenvolupament i Vuetify 3 per a components UI premium.
- **Backend**: Express.js per la seva simplicitat i facilitat d'integració amb llibreries de Node.
- **Motor d'IA**: TensorFlow.js (MobileNet) executat al backend. S'ha triat MobileNet per ser lleuger i tenir bones capacitats de classificació general que inclouen moltes fruites i verdures.
- **Gestió de Fitxers**: Multer per gestionar la pujada d'imatges al servidor.
- **Traducció i Categorització**: S'utilitza un diccionari (`diccionariAliments`) que mapeja les etiquetes angleses de MobileNet a noms en català i les seves categories corresponents. Això permet corregir imprecisions del model i oferir una millor experiència d'usuari.
- **Compatibilitat de Node**: S'ha implementat un polyfill per a `util.isNullOrUndefined` per garantir el funcionament en versions recents de Node.js (v24+) on aquesta funció ha estat eliminada.

## Riscos / Compromisos

- **Risc**: MobileNet pot no ser 100% precís amb algunes varietats locals. → **Mitigació**: Es mostra el percentatge de confiança i s'ha creat un diccionari de traduccions per agrupar varietats sota noms comuns.
- **Risc**: Processament d'imatges pesat al servidor. → **Mitigació**: Es limitaran les mides de les imatges pujades.
