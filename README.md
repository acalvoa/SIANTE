# Siante

Sistema de analisis territorial para procesamiento de información

## Dependencias 

- [NodeJS](https://nodejs.org/en/download/)
- SailsJS

## Configuración

- Instalar SailsJS

  ```bash
  $ npm instal -g sails
  ```
 
- Clonar repositorio

  ```bash
  $ git clone http://192.168.105.62:8070/teamlengthle4/SIANTE.git
  $ cd SIANTE
  ```

- Instalar dependecias del proyecto

  ```bash
  $ npm install
  ```
  
## Despliegue
  
### Desarrollo

  ```bash
  $ sails lift
  ```

Go [http://localhost:1337](http://localhost:1337)
  
### Testing

- Acceder al servidor animus

  ```bash
  $ ssh <your-user>@192.168.105.62
  ```

- Entrar al directorio del aplicativo

  ```bash
  $ cd /opt/apps/SIANTE
  ```
- Logearse como super usuario

  ```bash
  $ sudo su
  ```
  
- Bajar aplicación a travez del pid

  ```bash
  $# forever list
  info:    Forever processes running
  data:        uid  command       script        forever pid   id logfile                 uptime
  data:    [0] UD8F /usr/bin/node app.js --prod 31309   31322    /root/.forever/UD8F.log 0:0:8:33.133
  $# forever stop 15144
  ```

- Descargar los últimos cambios

  ```bash
  $# git pull origin master
  ```
  
- Subir aplicación

  ```bash
  $# forever start app.js --prod
  ```
  
- Go [http://testing.contraloria.cl/cartografia/](http://testing.contraloria.cl/cartografia/)
- ¿Ver log?
 
  ```bash
  $# forever logs app.js -f
  data:    app.js:31322 -                .-..-.
  data:    app.js:31322 -    Sails              <|    .-..-.
  data:    app.js:31322 -    v0.11.5             |\
  data:    app.js:31322 -                       /|.\
  data:    app.js:31322 -                      / || \
  data:    app.js:31322 -                    ,'  |'  \
  data:    app.js:31322 -                 .-'.-==|/_--'
  data:    app.js:31322 -                 `--'-------'
  data:    app.js:31322 -    __---___--___---___--___---___--___
  data:    app.js:31322 -  ____---___--___---___--___---___--___-__
  data:    app.js:31322 - Server lifted in `/opt/apps/SIANTE`
  data:    app.js:31322 - To see your app, visit http://localhost
  data:    app.js:31322 - To shut down Sails, press <CTRL> + C at any time.
  data:    app.js:31322 - --------------------------------------------------------
  data:    app.js:31322 - :: Fri Jun 30 2017 16:09:20 GMT-0400 (-04)
  data:    app.js:31322 - Environment : production
  data:    app.js:31322 - Port        : 80
  data:    app.js:31322 - --------------------------------------------------------
  ```
  
![https://media.giphy.com/media/l0Exi8cyEMxc3OGFa/giphy.gif](https://media.giphy.com/media/l0Exi8cyEMxc3OGFa/giphy.gif)