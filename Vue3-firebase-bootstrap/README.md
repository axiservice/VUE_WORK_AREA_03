# VUE3 FIREBASE BOOTSTRAP

## Project setup
```
npm install
npm install --save vue-router firebase-admin/app firebase-admin/firestore bootstrap @popperjs/core
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Deploy on Firebase Host

### Setup Firebase environmant
```
npm install -g firebase-tools
```
### Login and select project
```
firebase login
```
### Update deploy config for source "dist" dir - Edit the file: firebase.json
```
{
  "hosting": {
    "public": "dist",
    ....
```
### Deploy to remote Firebase Host
```
firebase deploy
```