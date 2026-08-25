# Post-It

Application Vue 3 de gestion de post-its (notes), proposant deux modes de fonctionnement indépendants :

- **Mode en ligne** : les notes sont stockées via une API REST distante (`https://post-it.epi-bluelock.bj/notes`).
- **Mode local** : les notes sont stockées uniquement dans le `localStorage` du navigateur, sans aucun appel réseau.

> ⚠️ **Avertissement** : l'API distante ne demande aucune authentification. N'importe qui connaissant (ou devinant) l'identifiant d'une note peut la lire, la modifier ou la supprimer. Projet à but pédagogique — ne pas y stocker de données sensibles.

## Stack technique

- [Vue 3](https://vuejs.org/) (Composition API / `<script setup>`)
- [Vite](https://vite.dev/) comme outil de build
- [Vue Router](https://router.vuejs.org/) pour la navigation
- [Pinia](https://pinia.vuejs.org/) + [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/) pour la gestion et la persistance d'état
- [Tailwind CSS](https://tailwindcss.com/) pour le style

## Structure du projet

```
src/
├── components/
│   ├── Header.vue / Footer.vue   Layout commun
│   ├── Card.vue                  Liste des notes (mode en ligne)
│   └── LocalCard.vue             Liste des notes (mode local)
├── store/
│   ├── postIt.js                 Store Pinia — CRUD via l'API distante
│   └── localPostIt.js            Store Pinia — CRUD via localStorage
├── views/
│   ├── Home.vue / Create.vue / Update.vue / DetailPage.vue   Mode en ligne
│   └── local/                    Équivalents en mode local
├── router/index.js               Déclaration des routes (deux arborescences parallèles)
└── main.js                       Point d'entrée de l'application
```

## Installation

```sh
npm install
```

## Développement

```sh
npm run dev
```

## Build de production

```sh
npm run build
```

## Prévisualisation du build

```sh
npm run preview
```

## Fonctionnement

Les deux modes exposent la même interface (créer, consulter, modifier, supprimer une note) via des stores Pinia distincts :

- `usePostIt` (`store/postIt.js`) appelle l'API distante et remonte un objet `{ success, error }` (ou `{ success, data }` pour la lecture) pour chaque opération, permettant aux vues d'afficher un message en cas d'échec réseau ou d'erreur serveur.
- `usePostIt` (`store/localPostIt.js`) manipule directement le tableau réactif persisté en `localStorage`, de façon synchrone.

## Limitations connues

- **Aucune authentification / autorisation** : l'API distante n'exige ni compte ni jeton, et n'importe qui connaissant l'identifiant d'une note peut la consulter, la modifier ou la supprimer. C'est un choix assumé pour l'état actuel du projet (à traiter côté backend si nécessaire).
- Le mode "en ligne" ne fonctionne que si l'API `post-it.epi-bluelock.bj` est disponible.
- Pas de tests automatisés ni de linter configurés.

## Auteur

Waren KONNON
