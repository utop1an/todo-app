# TodoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Deployment Guide

### Automated Deploy
Automated deploy via Github Actions on push to main branch, however, there is issue... The google cloud ssh compute action will use wrong node version (v10, which is not compatible with Angular) for build, but not the default version (v18). I'm still trying to figure it out. (For the backend, the similar implementation works well for NestJs...)

### Manual Deploy

- Connect to Google VM instance via ssh:
```cmd
ssh -i <path-to-ssh-key-file> username@host
```
- Go to the working directory
- Pull the latest app
```
git pull origin main
```
- Install packages
```
npm install
```
- Build for production
```
npm run build
```
- Use nginx to serve the app, add below to the nginx configuration
```
(/etc/nginx/sites-enabled/default)
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root <path-to-built-file>;

        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
                try_files $uri $uri/ =404;
        }

        location /api/ {
                proxy_pass http://127.0.0.1:8080/api/;
        }
}
```
- Restart nginx
```
systemctl restart nginx
```
- Now, the Todo-App is accessible via http
