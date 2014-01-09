$(document).ready(function () {

    $('#time').jTime();

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
        $('#form')[0].reset();
        //Obtengo el HTML de todos los TODOS y lo almaceno en una variable
        var todos = $('#todos').html();
        //Almaceno en el local Storage con la Key todos todos los elementos.
        localStorage.setItem('todos', todos);
        return false;
    });

    if (localStorage.getItem('todos')) {
        $('#todos').html(localStorage.getItem('todos'));
    }

    $('#clear').click(function () {
        window.localStorage.clear();
        location.reload();
        return false;
    });

    $('.check').live("click", function () {
        if ($(this).is(':checked')) {
            $(this).parent().addClass("lineThrough");
            
            toDoAmount -= 1;
            completeAmount += 1;
        } else {
            $(this).parent().removeClass('lineThrough');

            completeAmount -= 1;
            toDoAmount += 1;
        }
        $('#lblComplete').html(completeAmount);
        $('#lblToDo').html(toDoAmount);
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
    });




    var totalAmount = $('#todos li').size();
    var completeAmount = 0;
    var toDoAmount = totalAmount;

    $('#lblTotal').html(totalAmount);
    $('#lblComplete').html(completeAmount);
    $('#lblToDo').html(toDoAmount);
});