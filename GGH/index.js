document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('applicationForm');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const secondnameInput = document.getElementById('secondname');
    const phoneInput = document.getElementById('phone');

    const relative = document.getElementById('relative');
    const notRelative = document.getElementById('notRelative');
    const relativeBlock = document.getElementById('relativeBlock');
    const notRelativeBlock = document.getElementById('notRelativeBlock');
    const ordersSelect = document.getElementById('ordersSelect');
    const ordersCount = document.getElementById('ordersCount');
    const cancelOrder = document.getElementById('cancelOrder');

    let orders = [];

    relative.addEventListener('change', function () {
        relativeBlock.style.display = 'block';
        notRelativeBlock.style.display = 'none';
    });

    notRelative.addEventListener('change', function () {
        relativeBlock.style.display = 'none';
        notRelativeBlock.style.display = 'block';
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const surname = surnameInput.value.trim();
        const secondname = secondnameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (
            name === '' ||
            surname === '' ||
            secondname === '' ||
            phone === ''
        ) {
            alert('Будь ласка, заповніть усі обов’язкові поля.');
            return;
        }

        const fullName = `${surname} ${name} ${secondname}`;
        orders.push(fullName);
        updateOrders();

        form.reset();
        relativeBlock.style.display = 'none';
        notRelativeBlock.style.display = 'none';

        alert(`Замовлення від ${fullName} створено`);
    });

    function updateOrders() {
        ordersSelect.innerHTML = '';

        if (orders.length === 0) {

            const option = document.createElement('option');

            option.textContent = 'Замовлень поки немає';
            option.value = '';

            ordersSelect.appendChild(option);

        } else {
            orders.forEach(function (order, index) {

                const option = document.createElement('option');

                option.value = index;
                option.textContent = order;

                ordersSelect.appendChild(option);
            });
        }
        ordersCount.textContent = orders.length;
    }

    cancelOrder.addEventListener('click', function () {

        const selectedIndex = ordersSelect.value;

        if (selectedIndex === '') {
            alert('Немає замовлення для скасування.');
            return;
        }

        const index = Number(selectedIndex);

        orders.splice(index, 1);

        updateOrders();
    });

});