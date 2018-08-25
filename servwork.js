//  asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_capacitacion_pwa';

// ficheros a cachear en la aplicacion
var urlsToCache = [
	'./',
	'./css/styles.css',
	'./img/favicon.png',
	'./icon.png',
	'./img/1.png',
	'./img/2.png',
	'./img/3.png',
	'./img/4.png',
	'./img/1.png',
	'./img/6.png',
	'./img/facebook.png',
	'./img/instagram.png',
	'./img/twitter.png',
	'./img/favicon-1024.png',
	'./img/favicon-512.png',
	'./img/favicon-384.png',
	'./img/favicon-256.png',
	'./img/favicon-192.png',
	'./img/favicon-128.png',
	'./img/favicon-96.png',
	'./img/favicon-64.png',
	'./img/favicon-32.png',
	'./img/favicon-16.png'
]


//evento install
// instalacion del sw y guardar en cache los recursos estaticos

self.addEventListener('install', e => {
	// esperar mientras 
	e.waitUntil(
		caches.open(CACHE_NAME)
		      .then( cache => {
		      return cache.addAll(urlsToCache)
		                  .then(() => {
		                  	// termina de esperar por que cargo todos los archivos
		                  	self.skipWaiting();
		                  });
		                })  
		                 .catch( err => console.log('No se ha registrado la cache', err))


		);
});


// Evento Activate
// permite a la app funcionar sin conexion
self.addEventListener('Activate', e=> {
	const cacheWhiteList = [CACHE_NAME];
	e.waitUntil(
		caches.keys()
		.then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if( cacheWhiteList.indexof(cacheName) === -1) {
						// borrar elementos que no se necesitan
						return
						caches.delete(cacheName);
					}
				})
				);
		})
		.then(() => {
			//activar cache
			self.clients.clain();
		})
		);
} );





// EVENTO FETCH
// obtiene los datos en la web para almacenar e la cachde

self.addEventListener('fetch', e => {
	e.respondwith( 
		caches.match( e.request)
			.then( res => {
				if(res) {
					// devuelvo datos desde la cache
					return res;
				}
				// si no esta en la cache, la informacion la obtengo del servidor
				return fetch(e.request) ;	
			})
		);
}) ;





