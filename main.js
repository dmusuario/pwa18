// service worker 
if('serviceWorker' in navigator) {
	console.log('Puedes usar el servce worker en tu navegador');

	// registrar el service worker
	navigator.serviceWorker.register('./servwork.js')
							// si se cumple esta condicion (promesa) ejecuta la siguiente instruccion
						   .then(res => console.log('service worker cargado correctamente', res))
						   // si hay un error se ecuta lo siguiente
						   .catch(err => console.log('el service worker no se ha podido cargar', err));
} else {
	console.log('No puedes usar service worker');
}


// scroll suavizado
$(document).ready(function(){
	$("#menu a").click(function(e){
		e.preventDefault();
		//probarel offset
		//console.log($('#footer').offset().top);
		$("html, body").animate({
			scrollTop: $($(this).attr('href')).offset().top
		});
		return false;
	});
});