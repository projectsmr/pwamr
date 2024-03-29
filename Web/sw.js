﻿//Asignar nombre y version de cache
const version = "01";
const verCache = 'mrVer-v1';
//Configurar ficheros a cachear en la aplicacion

var urlsACachear = [
    './',
    './Content/estilos.css',
    './Content/bootstrap.css',
    './manifest.json',
    './Images/1.png',
    './Images/2.png',
    './Images/3.png',
    './Images/4.png',
    './Images/5.png',
    './Images/6.png',
    './Images/facebook.png',
    './Images/instagram.png',
    './Images/twitter.png',
    './Images/favicon1024.png',
    './Images/favicon512.png',
    './Images/favicon384.png',
    './Images/favicon256.png',
    './Images/favicon192.png',
    './Images/favicon144.png',
    './Images/favicon128.png',
    './Images/favicon96.png',
    './Images/favicon64.png',
    './Images/favicon32.png',
    './Images/favicon16.png',
    './Images/favicon.png'
];

//#region Eventos de ServiceWorker

//#region 1. Install: Instalacion del Service Worker y almacena en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(verCache)
        .then(cache => {
            return cache.addAll(urlsACachear)
                .then(() => {
                    //Esperar a que se guarde todos los archivos en cache
                    self.skipWaiting();
                });
        })
        .catch(err => {
            console.log("Error al cargar cache", err);
        })
        );
});
//#endregion

//#region  2. Evento Activate: App funcione sin conexion
self.addEventListener('activate', e => {
    const cacheWhiteList = [verCache];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        //Borrar elementos que no necesitamos 
                        return caches.delete(cacheName);
                    }
                })
                );
        })
        .then(() => {
            //Activar la cache en el dispositivo
            self.clients.claim();
        })
        );
})
//#endregion

//#region 3. Evento fetch

//self.addEventListener('fetch', e => {
//    e.respondWith(
//        caches.match(e.request)
//        .then(res => {
//            if (res) {
//                //devuelvo datos desde cache
//                return res;
//            } else {
//                return fetch(e.request);
//            }
//        })
//        .catch(err => {
//            console.log("Error al cargar cache", err);
//        })
//        );
//});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.open(verCache)
        .then(cache => cache.match(event.request, { ignoreSearch: true }))
        .then(response => {
            return response || fetch(event.request);
        })
         .catch(err => {
             console.log("Error al cargar cache", err);
         })
    );
});

//#endregion
//#endregion

