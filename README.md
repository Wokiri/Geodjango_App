
# <p align='center'>**GEODJANGO APPLICATION**</p>
## <p align='center'>**Office Operations Management App**</p>

### Done and Submitted by: [@JWokiri](https://twitter.com/JWokiri). <br/>

---
<br/>

**PROJECT OVERVIEW** <br/>
This is a GeoDjango App that shows the various relationships (spatial and otherwise) between offices of a given organization (theoratical) in Kenya.

## Concept and Requisites

Being a dynamic (geo)django app, this application requires a python run-time environment to test and to run.
It therefore requires an SQL database (preferably postgres to utilize the much power of postgis).
Now postgis is a Postgres extention that gives the database its spatial functionalities; these two must therefore be availed.

Also. django itself must be installed.

In the making of this app, I used Django version 3.1 and run it in a python 3.8.6 environment.

To display the spatial results processed in the packend, and to enable visualization and user interaction with maps, I used OpenLayers javascript library.

<br/>

**PROJECT IMPLEMENTATION** <br/>
<a href="#first">1. Working on the Frontend</a><br/>
<a href="#second">2. Using PostGIS Database</a><br/>
<a href="#three">3. Results</a><br/>

  ---

## <p id="first">1. Working on the Front End</p>

At the very minimum, a map is displayed that visualizes the distribution of offices and regions in Kenya.

The map is an OPENLAYERS map whose dependencies are bundled with webpack.

[WEBPACK module bundler](https://webpack.js.org/) has been used to enable easy management of the various dependencies in the course of development of the app. The assets output are minified files that not only, significantly reduce space requirements but are also free from any syntax error in a cases where compilation are successful.

while at the node_functionalities directory:

```javascript
npm install
```

To see in development mode (No database yet)

```javascript
npm start
```

To see in production mode (No database yet)

```javascript
npm run-script build
```

This way, you will be able to collect the generated static assets including JS, and CSS files for: OL, Bootstrap

These possibilites leaverage the basic frontend web development tools, i.e. node JS, HTML, JAVASCRIPT and CSS.

  ---

  ## <p id="second">2. Using PostGIS Database</p>

POSTGIS database has been used in this application primarily to harness the applicable spatial (topological) analysis options.

By tapping a feature (office or region) on the map, the details of the feature are displayed. It is important to note that these data are all fetched from the data base.

For convenience sake, I have dumped all the database data in: geodjangoapp/appassets/geodjangoappDB.json

  ---

  ## <p id="third">3. Results</p>

The various links to various pages gives more detailes about the feature.

**Head Office Dashboard**

<img src="https://dub01pap001files.storage.live.com/y4mN7KcLymEN1hB07nz2F8otDSmG-4aLqFzQe-0lLyDyXX5oH29fAXj9YdcfjTYxIMU3i8EaMZva7dUbYCRtw5BTurgRqBlyR735715K3VLVyHXag1JrH7ef3zO84oiKhDQUv4BrRPbMlL_f7ThS8RtvmenamgCzus4dqP3Kbgepi0LJsQRnnGYyqVdI3sP2Skt?width=1280&height=800&cropmode=none" width="1280" />


**Map Display: Town Selection**

<img src="https://dub01pap001files.storage.live.com/y4mOC5DqFJcDVmyUqOT2wb1KUUVbYwKDf13AVBpdqlKKZVWI4RtxcGprfqFsMdWTmH4r0GpgfWKXNr1MG9tUVbtvcJaDFrXWVhD1cwW3tejpXSXOJWL7D0E0QhH-NXNqW4pTpVzy1ZCKlxCctzxcM3RtWsYU_JUAC8nxeY7wAOKc0rUKLjGphGaIGcqJjUJpFAQ?width=1280&height=800&cropmode=none" width="1280" />


**Map Display: Outside Kenya Selection**

<img src="https://dub01pap001files.storage.live.com/y4mYf6AqYOvuJ5mZ40l4-ERVjd4_IrMIXtGXztJG689lP20Wul60zR9iBX8cOkteiwK5dG36pmwoMapS5gMWZMweFyoXeohHxFYuNSZLoHYoPO46zhOkbYReo1uibmNgAGatpUyxn08i4WgGoV6NsT3QQJbSpHnk8QwbzvejVUIa6hfFADATSJnUHqLVwPjf-BY?width=1280&height=800&cropmode=none" width="1280" />


**Map Display: Region Selection**

BUG: I observed that the names of the regions are not displayd when I bring the app to django. It however shows just fine when in weppack prod and dev stages.

<img src="https://dub01pap001files.storage.live.com/y4mM5HXckeG9NfeEk9xyrE7Ek12SFrg9__MxGGAYRTZagiWdaZZrvYmiNeqcjPyc_SY9qXdzWwO_z078R8lN1KYOp-rr0iumsxtYPZFznBeBRZhjrOAOFADryGDEo1-78KoGN9EeaS5tO5D7Ft1k8Nsr_v_PeKNeOBVsZePov5KVSxnHqiAh3rpVLStMDLlRVKO?width=1280&height=800&cropmode=none" width="1280" />


**Responsive Links**

<img src="https://dub01pap001files.storage.live.com/y4mZDFL5-Msk7sq6vMXE8u8n4PbVHN2iO8LM4pU2IUOjgvcBGmzWDBlcoC7UIq3TQ0E1YWkdugZ5wUM8CGUAbfkb073rixOu136dvSfNrR3Ywdu4BOwKb_Bpj33Di5f9L45oNUs7zotqYGemrPo8W0bogk72A0kCZQhzIuRZfZ-oXvesOjbxr4DoFel50lDKysR?width=1280&height=488&cropmode=none" width="1280" />
   ---

## Reach Out...

<p align='center'><a href="https://twitter.com/JWokiri"><img height="30" src="https://www.flaticon.com/svg/static/icons/svg/145/145812.svg"></a>&nbsp;&nbsp;&nbsp
<a href="mailto:wokirijoe@gmail.com"><img height="30" src="https://www.flaticon.com/svg/static/icons/svg/732/732200.svg"></a>&nbsp;&nbsp;&nbsp;
<a href="https://github.com/Wokiri"><img height="30" src="https://www.flaticon.com/svg/static/icons/svg/2111/2111425.svg"></a></p>
