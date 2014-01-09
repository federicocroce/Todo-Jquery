
$(document).ready(function () {

	$('#time').jTime();

	var totalAmount;
	var completeAmount;
	var toDoAmount;

	//Agregar elemento
	$('#add').click(function () {
		//Almacenos el valor del Txt en la variable Description.
		var Description = $('#description').val();
		//Si Description esta vacia.
		if ($("#description").val() == '') {
			//Anima un label y retorna falso
			$('#alert').html("<strong>Warning!</strong> You left the to-do empty");
			$('#alert').fadeIn().delay(1000).fadeOut();
			return false;
		}
		//Agrega elemento a la lista TODOS con la descripción del txt.
		$('#todos').prepend("<li class='item'><input id='check' class='check' name='check' type='checkbox'/>" + Description + "</li>");

		totalAmount += 1;
		toDoAmount = totalAmount - completeAmount;
//		console.debug('Antes:' + (totalAmount - completeAmount));
//		console.debug('Total: ' + totalAmount + '   Completadas: ' + completeAmount + '   Pendientes: ' + toDoAmount);
		$('#lblTotal').html(totalAmount);
		$('#lblToDo').html(toDoAmount);
		$('#form')[0].reset();
//		console.debug('Despues:' + (totalAmount - completeAmount));
//		console.debug('Total: ' + totalAmount + '   Completadas: ' + completeAmount + '   Pendientes: ' + toDoAmount);
		//Obtengo el HTML de todos los TODOS y lo almaceno en una variable
		var todos = $('#todos').html();
		//Almaceno en el local Storage con la Key todos todos los elementos.
		localStorage.setItem('todos', todos);
		return false;
	});

	if (localStorage.getItem('todos')) {
//		console.log('Entra el getitem')
		$('#todos').html(localStorage.getItem('todos'));
	}

	$('#clear').click(function () {
		window.localStorage.clear();
		location.reload();
		return false;
	});

	$(document).on('click', '.check', function (e) {
		
//		console.log('Antes:' + toDoAmount)
		if ($(this).parent().hasClass("lineThrough")) {
			$(this).parent().removeClass("lineThrough");

			completeAmount -= 1;
			toDoAmount += 1;

		} else {
			$(this).parent().addClass("lineThrough");
			completeAmount += 1;
			toDoAmount -= 1;

		}
//		console.log('Despues:' + toDoAmount)
		$('#lblComplete').html(completeAmount);
		$('#lblToDo').html(toDoAmount);


		//	  
		//	  if ($(this).is(':checked')) {
		//            $(this).parent().addClass("lineThrough");
		//            console.log('Antes:'+ toDoAmount)
		//            toDoAmount -= 1;
		//            completeAmount += 1;
		//			console.log('Despues:'+ toDoAmount)
		//        } else {
		//            $(this).parent().removeClass('lineThrough');
		//
		//            completeAmount -= 1;
		//            toDoAmount += 1;
		//        }
		//        $('#lblComplete').html(completeAmount);
		//        $('#lblToDo').html(toDoAmount);
	});


	$('#deleteSelec').click(function () {
		$('#todos li').each(function () {
			if ($(this).hasClass("lineThrough")) {
				$(this).remove();
			}
		});
		
//		toDoAmount = 0;
//		$('#lblToDo').html(toDoAmount);
		var todos = $('#todos').html();
		localStorage.setItem('todos', todos);
		location.reload();
	});



//	console.log('Q pasa aca?')

	totalAmount = $('#todos li').size();
	completeAmount = 0;
	toDoAmount = totalAmount;

	$('#lblTotal').html(totalAmount);
	$('#lblComplete').html(completeAmount);
	$('#lblToDo').html(toDoAmount);
});