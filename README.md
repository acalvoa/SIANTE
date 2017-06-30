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
  $ git clone git@192.168.105.62:teamlengthle4/SIANTE.git
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

- Bajar aplicación a travez del pid

  ```bash
  $ sudo forever list
  info:    Forever processes running
  data:        uid  command                            script           forever    pid   id logfile                                   uptime
  data:    [0] oL0L "/usr/bin/node." /home/animus/Escritorio/SIANTE/app.js 22304   15144    /home/animus/.forever/oL0L.log 0:0:0:31.642
  $ sudo forever stop 15144
  ```

- Descargar los últimos cambios

  ```bash
  $ git pull origin master
  ```
  
- Subir aplicación

  ```bash
  $ sudo forever start app.js --prod
  ```
  
- Go [http://testing.contraloria.cl/cartografia/](http://testing.contraloria.cl/cartografia/)
- ¿Ver log?
 
  ```bash
  $ sudo forever logs app.js -f
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - debug: --------------------------------------------------------
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - debug: :: Wed Jun 21 2017 18:42:45 GMT-0400 (Hora est. Sudamérica Pacífico)
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - debug: Environment : development
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - debug: Port        : 1337
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - debug: --------------------------------------------------------
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:                .-..-.
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:    Sails              <|    .-..-.
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:    v0.11.5             |\
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:                       /|.\
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:                      / || \
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:                    ,'  |'  \
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:                 .-'.-==|/_--'
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:                 `--'-------'
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:    __---___--___---___--___---___--___
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:  ____---___--___---___--___---___--___-__
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info:
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info: Server lifted in `D:\Usuarios\sgonzalezvi\Documents\GeoPortal\SIANTE`
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info: To see your app, visit http://localhost:1337
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 - info: To shut down Sails, press <CTRL> + C at any time.
  data:    /home/animus/Escritorio/SIANTE/app.js:15144 -
  ```
  
![https://media.giphy.com/media/l0Exi8cyEMxc3OGFa/giphy.gif](https://media.giphy.com/media/l0Exi8cyEMxc3OGFa/giphy.gif)