# SIANTE

## Carcateristicas

- Funcional en plataforma JBOSS

## Dependencias

- Jboss 6.4

## Eclipse plugins

- JBoss

## Configuración

Por defecto *Apache Ant* generará los archivos de configuración para el ambiente de desarrollo (develop). Para especificar el ambiente debemos enviarlo por el parámetro `env`. Esto será ejemplificado en la sección [Distribuir](#Distribuir).

## Desarrollo en Eclipse

- Crear un Proyecto EAR que contenga el proyecto
- Crear un Servidor JBoss 6.1+
- Agregar el proyecto EAR al servidor creado
- Enjoy!

## Compilación y distribución

Para la compilación y distribución se utiliza la herramienta [Apache Ant](http://ant.apache.org/).

### Instalar Apache Ant

- Linux
   
   ```bash
   $ sudo apt-get install ant
   ```

### Uso

```bash
$ ant -p
Buildfile: /home/sgonzalezvi/git/sisgeob-chilecompra/build.xml

Main targets:

 clean     Clean up
 compile   Compile the source
 dist      Generate the distribution
 dist-ear  Generate the EAR distribution
Default target: dist

```

### Distribuir

#### Desarrollo

```bash
$ ant dist
$ ll dist 
total 63M
-rw-rw-r-- 1 sgonzalezvi sgonzalezvi 63M jul  5 17:34 sisgeob-chilecompra.war
```

#### Testing

```bash
$ ant dist
$ ll dist 
total 63M
-rw-rw-r-- 1 sgonzalezvi sgonzalezvi 63M jul  5 17:34 sisgeob-chilecompra.war
```

#### Producción

```bash
$ ant dist -Denv=production
$ ll dist 
total 63M
-rw-rw-r-- 1 sgonzalezvi sgonzalezvi 63M jul  5 17:34 sisgeob-chilecompra.war
```

#### EAR

```bash
$ ant dist-ear
$ ll dist 
total 63M
-rw-rw-r-- 1 sgonzalezvi sgonzalezvi 63M jul  5 17:35 sisgeob-chilecompra.ear
```
