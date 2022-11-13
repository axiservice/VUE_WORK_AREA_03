# VUE3 FIREBASE BOOTSTRAP

## Project setup
```
npm install
```
## Set firebase properties - Edit  file: .env
Select or create a new project on Firebase console - Ref.: https://console.firebase.google.com

On the 'Project setup' copy the config and 
set this value on file: .env 
```
VUE_APP_API_KEY=****[CHANGE IT]****
VUE_APP_AUTH_DOMAIN=****[CHANGE IT]****
VUE_APP_DATABASE_URL=****[CHANGE IT]****
VUE_APP_PROJECT_ID=****[CHANGE IT]****
VUE_APP_STORAGE_BUCKET=****[CHANGE IT]****
VUE_APP_MESSAGING_SENDER_ID=****[CHANGE IT]****
VUE_APP_APP_ID=****[CHANGE IT]****
VUE_APP_MEASUREMENT_ID=****[CHANGE IT]****
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
### Compiles and minifies for production
```
npm run build
```
### Deploy to remote Firebase Host
```
firebase deploy
```