---
marp: true
theme: default
paginate: true
header: 'Projet 8 : Kasa'
footer: 'OpenClassrooms - André M.'
---

# Projet 8 : Kasa

[![bg contain right:50%](./kasa-logo.svg)](https://github.com/nutbreaker/projet_8_b)

## OpenClassrooms

_Par André M._

---

## Contexte & Objectifs

Refonte de la plateforme **Kasa**, une entreprise de location d’appartements et de maisons entre particuliers.

- **Objectif métier** : moderniser la plateforme et améliorer l’expérience des utilisateurs, afin de rester compétitifs.

---

## Stack Technique & Environnement

- **Frontend** :
  - [Next.js 16](https://github.com/nutbreaker/projet_8_b/tree/main/frontend), [React 19](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/package.json), CSS
  - [Biome](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/package.json) (linter & formateur) & [Jest / Testing Library](https://github.com/nutbreaker/projet_8_b/tree/main/frontend/__test__)
- **Backend (Sous-module Git)** :
  - [Node.js / Express](https://github.com/OpenClassrooms-Student-Center/dev-react-P12), SQLite & authentification par tokens JWT
- **DevOps & Outillage** :
  - Configuration monorepo via **npm workspaces** (`backend` + `frontend`)
  - [Dockerfile](https://github.com/nutbreaker/projet_8_b/blob/main/Dockerfile) & [docker-compose.yml](https://github.com/nutbreaker/projet_8_b/blob/main/docker-compose.yml) multi-services avec persistance de données
  - Hooks Git pre-commit automatisés avec **Husky**

---

## Architecture du projet Next.js

```text
frontend/
├── app/
│   ├── (public)/              # Routes publiques (accueil, logement, favoris, à-propos, auth)
│   │   ├── api/favoris/       # Route Handler interne pour la résolution des favoris
│   │   ├── logement/[...segment]/ # Page de détail d'une annonce
│   │   ├── favoris/           # Page de consultation des favoris
│   │   ├── connexion/         # Page et Server Action de connexion
│   │   └── inscription/       # Page et Server Action d'inscription
│   ├── (private)/             # Routes protégées par authentification
│   │   ├── messagerie/        # Interface de chat et messages hôtes
│   │   └── ajouter-un-logement/ # Page hôte avec contrôle de rôle
│   ├── layout.js              # Layout racine (Header, Footer, FavoritesProvider)
│   ├── proxy.js               # Proxy / Middleware de protection des accès
│   └── not-found.jsx / error.jsx / loading.jsx # Gestion des états
├── components/                # Composants UI modulaires (PropertyCard, ImageGallery, Chat...)
├── context/                   # Contextes React (FavoritesContext)
└── services/                  # Clients HTTP génériques, auth, session et propriétés
```

---

## Afficher les logements

- **Affichage des logements** ([#1](https://github.com/nutbreaker/projet_8_b/issues/1)) :
  - Cartes interactives ([`PropertyCard`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/components/property-card/property-card.jsx)), images optimisées ([`next/image`](https://nextjs.org/docs/app/api-reference/components/image)) et bouton favori accessible
- **Ajout et retrait favoris** ([#2](https://github.com/nutbreaker/projet_8_b/issues/2)) :
  - Coeur interactif avec changement d'état visuel
  - Persistance (`LocalStorage`) synchronisée via [`FavoritesContext`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/context/favorites-context.jsx)
- **Navigation vers un logement** ([#3](https://github.com/nutbreaker/projet_8_b/issues/3)) :
  - `/logement/[...segment]` avec fallback 404 ([`notFound()`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/app/(public)/logement/%5B...segment%5D/page.jsx))

---

## Afficher les détails d’une propriété

- **Galerie d'images interactive** ([#4](https://github.com/nutbreaker/projet_8_b/issues/4) & [PR #14](https://github.com/nutbreaker/projet_8_b/pull/14)) :
  - Navigation clavier (`ArrowLeft` / `ArrowRight`) et boucle infinie
  - Masquage des flèches si photo unique
  - Etat de chargement si l'image est lente à charger
  - Tests unitaires
- **Contact direct depuis le logement** ([#5](https://github.com/nutbreaker/projet_8_b/issues/5)) :
  - **Contacter l'hôte** `mailto:` pré-configuré (sujet et corps)
  - **Envoyer un message** lien vers la messagerie

---

## Connexion & Inscription

- **Connexion sécurisée** ([#9](https://github.com/nutbreaker/projet_8_b/issues/9)) :
  - Server Action [`signIn`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/app/(public)/connexion/actions.js) et traduction des erreurs API
  - JWT stocké dans un cookie sécurisé **HttpOnly** ([`session.js`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/services/session.js))
- **Inscription & RGPD** ([#10](https://github.com/nutbreaker/projet_8_b/issues/10)) :
  - Server Action [`signUp`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/app/(public)/inscription/actions.js) avec validation stricte
  - Case obligatoire d'acceptation des CGU désactivant le bouton d'inscription
- **Protection des routes & Mémorisation d'URL** ([`proxy.js`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/proxy.js)) :
  - Interception des routes privées (`/messagerie`, `/ajouter-un-logement`)
  - Redirection vers l'URL initialement demandée après authentification
  - Restriction par rôle (blocage des profils `client` sur l'ajout de logement)

---

## Afficher les favoris

- **Page "Mes Favoris"** ([#11](https://github.com/nutbreaker/projet_8_b/issues/11)) :
  - Route [`/favoris`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/app/(public)/favoris/page.jsx) interrogeant le Route Handler [`/api/favoris`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/app/(public)/api/favoris/route.js)
  - Gestion de l'état vide
- **Animations fluides sans dépendance lourde** :
  - Utilisation de la [**View Transitions API**](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition) (`document.startViewTransition`) et [`flushSync`](https://react.dev/reference/react-dom/flushSync) lors du retrait d'une carte

---

## Contacter l'hôte

- **Espace de messagerie** ([`/messagerie`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/app/(private)/messagerie/page.jsx)) :
  - Route privée protégée par le middleware d'authentification
  - Volet latéral des conversations ([`UserList`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/components/chat/user-list.jsx)) avec statuts de lecture et aperçu du dernier message
  - Historique chronologique groupé par date ([`MessagesByDay`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/components/chat/messages-by-day.jsx))
  - Zone de rédaction de messages ([`MessageWriter`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/components/chat/message-writer.jsx))
  - Interface entièrement responsive (bascule intuitive discussion / liste sur mobile)

---

## Qualité de Code

- **Tests unitaires/d'intégration avec [Jest](https://github.com/nutbreaker/projet_8_b/tree/main/frontend/__test__)**
- **Outillage & Bonnes pratiques** :
  - JSDoc pour la documentation
  - Formatage et linting avec **Biome** (`biome check --fix`)
  - Hooks Git pre-commit via **Husky** pour garantir l'intégrité du code
- **Performance Web & SEO** :
  - Optimisation du chargement des [images statiques](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/next.config.mjs#L19)
  - Génération du [`sitemap.js`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/app/sitemap.js) et du manifeste PWA [`manifest.js`](https://github.com/nutbreaker/projet_8_b/blob/main/frontend/app/manifest.js)
- **Validation Wave**

---

## Difficultés Rencontrées & Solutions

- **Configuration Monorepo Workspaces & Docker** :
  - _Défi_ : cohabitation API Express et Next.js avec des ports configurables
  - _Solution_ : utilisation workspaces npm, centralisation du `.env`, et configuration Docker.
- **Gestion des favoris** :
  - _Défi_ : récupération favoris sans connexion.
  - _Solution_ : route Handler dédié (`/api/favoris`) pour reconstituer les favoris.
- **Accessibilité (a11y)** :
  - _Solution_ : contrôle total au clavier dans la galerie modale `<dialog>`, attributs `aria-label` explicites et masquage des icônes SVG décoratives (`aria-hidden="true"`).

---

## Bilan des Sprints & Perspectives

### Objectifs atteints

- **Sprint 1 (Obligatoire)** :
  - Liste logements ([#1](https://github.com/nutbreaker/projet_8_b/issues/1)), ajout favoris ([#2](https://github.com/nutbreaker/projet_8_b/issues/2)), navigation ([#3](https://github.com/nutbreaker/projet_8_b/issues/3)), détails et galerie photo ([#4](https://github.com/nutbreaker/projet_8_b/issues/4)), contact hôte ([#5](https://github.com/nutbreaker/projet_8_b/issues/5)), connexion utilisateur ([#9](https://github.com/nutbreaker/projet_8_b/issues/9)).
- **Sprint 2 (Optionnel)** :
  - Inscription ([#10](https://github.com/nutbreaker/projet_8_b/issues/10)), page dédiée aux favoris ([#11](https://github.com/nutbreaker/projet_8_b/issues/11)), interface de messagerie.

### Perspectives d'évolution

- Ajout de logements côté hôte ([#6](https://github.com/nutbreaker/projet_8_b/issues/6), [#7](https://github.com/nutbreaker/projet_8_b/issues/7), [#8](https://github.com/nutbreaker/projet_8_b/issues/8)).
- Implémentation de la messagerie (WebSockets ou Server-Sent Events).

---

### Merci pour votre attention !

_Avez-vous des questions ?_
