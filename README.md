# customers-crud

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
it set on port 3000 for local server

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

#Project technical overview:

###Axios:
axios prepared to have a default base url and header common token for authentications reasons with every request.

###Deploying:
prepared for deploying on GitHub pages by add puplic path in vue config as the repo name and creating a deploy.sh file to use when deploy using `npm run deploy`
