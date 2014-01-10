
$(document).ready(function () {

	methodsToDo.add();

	methodsToDo.clear();

	methodsToDo.deleteSelec();

	methodsToDo.SelectElemnt();

	methodsToDo.getItemToDo();

	mInit.initVarPublic();

	mInit.updateVarPublic();
});




var mInit = (function () {

	var totalAmount = 0;
	var completeAmount = 0;
	var toDoAmount = 0;

	var initVarPrivate = function () {
		totalAmount = $('#todos li').size();
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

		initVarPublic: function () {
			return initVarPrivate();
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






var methodsToDo = (function () {

	//	var elemntsList = 0;

	var addP = function (elemntsList) {
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
	};

	var clearP = function () {
		$('#clear').click(function () {
			window.localStorage.clear();
			location.reload();
			return false;
		});
	};

	var deleteSelecP = function () {
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
	};

	var SelectElemntP = function () {
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
	};
	//
	var getItemToDoP = function () {
		if (localStorage.getItem('todos')) {
			$('#todos').html(localStorage.getItem('todos'));
		}

	};

	return {

		add: function () {
			return addP();
		},
		clear: function () {
			return clearP();
		},
		deleteSelec: function () {
			return deleteSelecP();
		},
		SelectElemnt: function () {
			return SelectElemntP();
		},
		getItemToDo: function () {
			return getItemToDoP();
		},

	}
})();