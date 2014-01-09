$(document).ready(function () {
	//	
	$("#add").click(function () {

		var Description = $('#description').val();

		if (Description == '') {
			$("#alert").html("<strong>Warning!</strong> You left the to-do empty");
			$("#alert").fadeIn().delay(1000).fadeOut();
			return false;
		}
		// add the list item
		$('#todos').prepend("<li class=list><input class='check' name='check' type='checkbox'/>" + Description + "</li>");
		CantList += 1;
		//		alert(CantList);
		$('#total').html("Total: " + CantList);
		$('#pending').html("Pending: " + (CantList-CantFinish);
		// delete whatever is in the input
		$('#form')[0].reset();
		var todos = $('#todos').html();
		localStorage.setItem('todos', todos);
		return false;
	});

	if (localStorage.getItem('todos')) {
		$('#todos').html(localStorage.getItem('todos'));
	}




	$('.check').click(function () {

		if ($(this).parent().hasClass("tachado")) {
			$(this).parent().removeClass("tachado");
			CantFinish -= 1;
			CantPending += 1;

		} else {
			$(this).parent().addClass("tachado");
			CantFinish += 1;
			CantPending -= 1;

		}

		$('#finish').html("Finish: " + CantFinish);
		$('#pending').html("Pending: " + CantPending);
	});


	$('#delete').click(function () {

		$('#todos li').each(function () {
			if ($(this).hasClass("tachado")) {
				$(this).remove();
			}
		});
		var todos = $('#todos').html();
		localStorage.setItem('todos', todos);
		location.reload();
	});




	$('#clear').click(function () {
		window.localStorage.clear();
		location.reload();
		return false;
	});

	var CantList = $("#todos li").size(); // Preguntar xq lo tengo q poner abajo
	var CantFinish = 0;
	var CantPending = CantList;
	var ArrayFinish = [];


	//	alert(CantList);
	$('#total').html("Total: " + CantList);
	$('#finish').html("Finish: " + CantFinish);
	$('#pending').html("Pending: " + CantPending);
});