document.addEventListener('DOMContentLoaded', function () { //добавляет обработчик событий, который выполняется,когда весь html документ загружен и разобран, но до загрузки стилей и изображений
    const targets = document.querySelectorAll('.target');//находит все элементы с классом `target` и сохраняет их в переменную `targets`
    let draggedElement = null; // элемент, который перемещаем
    let offsetX = 0, offsetY = 0;// для хранения смещения мыши относительно верхнего левого угла перемещаемого элемента
    let isStuckToMouse = false; // приклеен ли элемент
    let originalPosition = { top: 0, left: 0 };//хранить исходные координаты элемента

    targets.forEach(target => {//Начинает цикл по всем найденным элементам `target`

        target.addEventListener('mousedown', startDragging);
        target.addEventListener('touchstart', startDragging);

        target.addEventListener('dblclick', stickToMouse);
        target.addEventListener('touchstart', stickToMouse);
        
        target.addEventListener('click', unstickFromMouse);
        target.addEventListener('touchend', unstickFromMouse);
    });


    function startDragging(event) {//Определяет функцию `startDragging`, которая будет обрабатывать начало перетаскивания элемента
        if (!isStuckToMouse) {//Проверяет, прикреплен ли элемент к мыши. Если нет, продолжаем
            draggedElement = event.target;//Устанавливает `draggedElement` на текущий элемент, по которому произошло событие
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const clientY = event.touches ? event.touches[0].clientY : event.clientY;
            //Получает координаты касания или мыши (в зависимости от того, какое событие произошло)

            offsetX = clientX - draggedElement.offsetLeft;
            offsetY = clientY - draggedElement.offsetTop;
            //Вычисляет смещение мыши относительно верхнего левого угла элемента
            originalPosition = {
                top: draggedElement.style.top,
                left: draggedElement.style.left
                //Сохраняет исходные координаты элемента перед началом перетаскивания.
            };
        }
    }

    function stickToMouse(event) {//Определяет функцию `stickToMouse`, которая будет вызываться при двойном клике
        draggedElement = event.target;// Устанавливает `draggedElement` на текущий элемент, на который кликнули
        isStuckToMouse = true;//Устанавливает флаг `isStuckToMouse` в `true`, что означает, что элемент прикреплен к мыши
        draggedElement.style.backgroundColor = 'green';//Меняет цвет фона элемента на зеленый, чтобы визуально показать, что он прикреплен
    }

    function unstickFromMouse(event) {//Определяет функцию `unstickFromMouse`, которая будет вызываться при клике
        if (isStuckToMouse) {//Проверяет, прикреплен ли элемент к мыши
            isStuckToMouse = false;//Устанавливает флаг `isStuckToMouse` в `false`, что означает, что элемент больше не прикреплен.
            draggedElement.style.backgroundColor = 'red'//Меняет цвет фона элемента на красный, чтобы визуально показать, что он не прикреплен

            draggedElement.style.backgroundColor = 'red';
            draggedElement = null;//Обнуляет переменную `draggedElement`, так как больше нет перемещаемого элемента
        }
    }

    document.addEventListener('mousemove', moveElement);
    document.addEventListener('touchmove', moveElement);

    function moveElement(event) {//Определяет функцию `moveElement`, которая будет перемещать элемент
        if (draggedElement) {//Проверяет, установлен ли `draggedElement` (т.е. есть ли элемент, который нужно перемещать)
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const clientY = event.touches ? event.touches[0].clientY : event.clientY;
            //Получает координаты мыши или касания

            let newX = clientX - offsetX;
            let newY = clientY - offsetY;
            //Вычисляет новые координаты для перемещаемого элемента, вычитая смещение

            draggedElement.style.left = newX + 'px';
            draggedElement.style.top = newY + 'px';
            // Устанавливает новые координаты `left` и `top` для перемещаемого элемента
        }
    }


    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    function stopDragging(event) {//Определяет функцию `stopDragging`, которая останавливает перетаскивание
        if (!isStuckToMouse) {//Проверяет, прикреплен ли элемент к мыши
            draggedElement = null;//Если элемент не прикреплен, обнуляет `draggedElement`
        }
    }

   
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length === 2 && draggedElement) {//Проверяет, что на экране два касания и есть перемещаемый элемент
            draggedElement.style.top = originalPosition.top;
            draggedElement.style.left = originalPosition.left;
            //Возвращает элемент на его исходные позиции
            draggedElement.style.backgroundColor = 'red';
            draggedElement = null;
            isStuckToMouse = false;
            //Обнуляет `draggedElement` и сбрасывает флаг `isStuckToMouse`
            
        }
    });


    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && draggedElement) {//Проверяет, нажата ли клавиша `Escape` и есть ли перемещаемый элемент
            draggedElement.style.top = originalPosition.top;
            draggedElement.style.left = originalPosition.left;
            //Возвращает элемент на его исходные позиции
            draggedElement.style.backgroundColor = 'red';
            draggedElement = null;
            isStuckToMouse = false;
            //Обнуляет `draggedElement` и сбрасывает флаг `isStuckToMouse`
        }
    });
});
