<!DOCTYPE html>
<html>
  <head>
    <title>SIANTE - Sistema de analisis territorial</title>

    <!-- Viewport mobile tag for sensible mobile support -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    
    <!--  
        Stylesheets and Preprocessors
        ==============================

        You can always bring in CSS files manually with `<link>` tags, or asynchronously
        using a solution like AMD (RequireJS).  Or, if you like, you can take advantage 
        of Sails' conventional asset pipeline (boilerplate Gruntfile).

        By default, stylesheets from your `assets/styles` folder are included
        here automatically (between STYLES and STYLES END). Both CSS (.css) and LESS (.less)
        are supported. In production, your styles will be minified and concatenated into
        a single file.
        
        To customize any part of the built-in behavior, just edit `tasks/pipeline.js`.
        For example, here are a few things you could do:
            
            + Change the order of your CSS files
            + Use a different or additional preprocessor, like SASS, SCSS or Stylus
    -->

    <!--STYLES-->
    <link rel="stylesheet" href="styles/bootstrap-theme.min.css">
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <link rel="stylesheet" href="styles/importer.css">
    <!--STYLES END-->
    <!-- GOOGLEMAPS -->
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6Bf-4zuKPSdFtGF4ZYIORhz2MVH1assw"></script>
    <!-- GOOGLEMAPS END-->
  </head>

  <body>
      <div app>
        <div map="map"></div>
        <div panelderecho>
            <div layers map-target="map">
                <div prototype>
                    <div element>
                        <input type="checkbox" option-cartography></input>
                        <div label></div>
                    </div>
                </div>
                <app name="layers" leyend="Base de información disponible" button><i class="fa fa-database"></i></app>
                <div title>Bases de información</div>
                <div body></div>
            </div>
            <div cartography map-target="map">
                <div prototype>
                    <div element>
                        <input type="checkbox" option-cartography></input>
                        <div label></div>
                    </div>
                </div>
                <app name="cartography" leyend="Cartografia Territorial" button><i class="fa fa-map-marker"></i></app>
                <div title>Cartografia</div>
                <div body>
                </div>
            </div>
            <div metadata map-target="map">
                <app name="extra" leyend="Metadata" button><i class="fa fa-rocket"></i></app>
                <div title>Metadata</div>
                <div body>
                </div>
            </div>
        </div>
        <div panelizq>
            <div views map-target="map">
                <div prototype>
                    <div element>
                        <div icon><i class="fa fa-plus-square-o"></i></div>
                        <input type="checkbox" view-layer checked></input>
                        <div layer-options><i class="fa fa-cog"></i></div>
                        <div label></div>
                        <div subbody>
                            <div subprototype>
                                <div subelement>
                                    <input type="checkbox" view-cartography checked></input>
                                    <div view-options>
                                        <i class="fa fa-cog"></i>
                                    </div>
                                    <div label></div>
                                </div>
                            </div>
                        </div>
                        <div option-prototype>
                            <div option-title>Propiedades Objeto</div>
                            <div option-relleno>
                                <div option-label>Color Relleno:</div>
                                <input type="color" fill-color/>
                            </div> 
                            <div option-borde>
                                <div option-label>Color Borde:</div>
                                <input type="color" border-color/>
                            </div> 
                            <div option-metadata>
                                <div option-label>Metadata:</div>
                                <input type="checkbox" metadata-check/>
                            </div> 
                        </div>
                    </div>
                </div>
                <app name="views" leyend="Capas Desplegadas" button><i class="fa fa-folder-o"></i></app>
                <div vtitle>Capas Desplegadas</div>
                <div body></div>
            </div>
        </div>
        <div buttons>
            <div prototype>
                <div button>
                    <div icon></div>
                </div>
            </div>
        </div>
        <div info>
            <div title></div>
            <div body></div>
            <div chart>
                <div id="canvas-holder">
                    <canvas id="chart-area" width="200" height="200"/>
                </div>
            </div>
        </div>
        <div leyenda>
            <div prototype>
                <div itemleyed>
                    <div itemcolor></div>
                    <div itemnumber></div>
                </div>
            </div>
            <div prototypecolumn>
                <div itemleyedcolumn>
                    <div itemcolor></div>
                    <div itemnumber></div>
                </div>
            </div>
            <app name="leyend" leyend="Leyenda" button><i class="fa fa-info-circle"></i></app>
            <div title>Leyenda - Sin capa de analisis</div>
            <div body></div>
        </div>
    </div>


    <!--SCRIPTS-->
    <script src="js/dependencies/1.jquery-2.2.1.min.js"></script>
    <script src="js/dependencies/2.bootstrap.js"></script>
    <script src="js/dependencies/3.Chart.js"></script>
    <script src="js/dependencies/geoxml3.js"></script>
    <script src="js/dependencies/prototypes.js"></script>
    <script src="js/lib/01.geomap.js"></script>
    <script src="js/lib/02.buttons.js"></script>
    <script src="js/lib/03.cartography.js"></script>
    <script src="js/lib/04.baselayer.js"></script>
    <script src="js/lib/05.layers.js"></script>
    <script src="js/lib/06.views.js"></script>
    <script src="js/lib/07.info.js"></script>
    <script src="js/lib/08.metadata.js"></script>
    <script src="js/lib/09.leyenda.js"></script>
    <script src="js/lib/10.utils.js"></script>
    <!--SCRIPTS END-->
  </body>
</html>
