
$(document).ready(function () {




	var elemntsList;

	$('#add').click(function () {

		var Description = $('#description').val();

		if ($("#description").val() == '') {
			$('#alert').html("<strong>Warning!</strong> You left the to-do empty");
			$('#alert').fadeIn().delay(1000).fadeOut();
			return false;
		}

		$('#todos').prepend("<li class='item'><input id='check' class='check' name='check' type='checkbox'/>" + Description + "</li>");

		mInit.increasesTotalAmount();

		mInit.updateVarPublic();
		$('#form')[0].reset();

		var todos = $('#todos').html();

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



	$('#deleteSelec').click(function () {

		$('#todos li').each(function () {
			if ($(this).hasClass("lineThrough")) {
				$(this).remove();
			}
		});


		var todos = $('#todos').html();
		localStorage.setItem('todos', todos);
		location.reload();
		mInit.updateVarPublic();
	});


	$(document).on('click', '.check', function (e) {

		if ($(this).parent().hasClass("lineThrough")) {
			$(this).parent().removeClass("lineThrough");

			completeAmount -= 1;
			toDoAmount += 1;

		} else {
			$(this).parent().addClass("lineThrough");
			mInit.increasesCompleteAmount();

		}
		//		console.log('Despues:' + toDoAmount)
		mInit.updateVarPublic();
	});



	elemntsList = $('#todos li').size();

	mInit.initVarPublic(elemntsList);

	mInit.updateVarPublic();
});




var mInit = (function () {

	var totalAmount = 0;
	var completeAmount = 0;
	var toDoAmount = 0;

	var initVarPrivate = function (elemntsList) {
		totalAmount = elemntsList;
		completeAmount = 0;
		toDoAmount = totalAmount;
	};

	var updateVarPrivate = function () {
		$('#lblTotal').html(totalAmount);
		$('#lblComplete').html(completeAmount);
		$('#lblToDo').html(toDoAmount);
	};

	var increasesTotalAmountP = function () {
		totalAmount += 1;
		toDoAmount = totalAmount - completeAmount;
	};

	var increasesCompleteAmountP = function () {
		completeAmount += 1;
		toDoAmount -= 1;
	};

	var increasesToDoAmountP = function () {
		completeAmount -= 1;
		toDoAmount += 1;

	};

	return {

		initVarPublic: function (elemntsList) {
			return initVarPrivate(elemntsList);
		},
		updateVarPublic: function () {
			return updateVarPrivate();
		},
		increasesTotalAmount: function () {
			return increasesTotalAmountP();
		},
		increasesCompleteAmount: function () {
			return increasesCompleteAmountP();
		},
		increasesToDoAmount: function () {
			return increasesToDoAmountP();
		},

	}
})();