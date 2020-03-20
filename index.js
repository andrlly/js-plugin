let fruits = [
    { id: 1, title: 'Apples', price: 20, img: 'https://via.placeholder.com/150x300' },
    { id: 2, title: 'Oranges', price: 30, img: 'https://via.placeholder.com/150x300' },
    { id: 3, title: 'Mango', price: 40, img: 'https://via.placeholder.com/150x300' }
];


const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height: 300px" src="${fruit.img}"/>
            <div class="cart-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Show price</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
            </div>
        </div>
    </div>
`;

function render() {
    const html = fruits.map(toHTML).join(''); // fruits.map(fruit => toHTML(fruit))
    document.querySelector('#fruits').innerHTML = html;

}

render();

const priceModal = $.modal({
    title: 'Price of good',
    closable: true,
    // content: `
    // <h3>content</h3>
    // <p>Lorem ipsum dolor sit.</p>
    // `,
    width: 400,
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
                console.log('Primary btn clicked');
                priceModal.close()
        }},
        // {text: 'Cancel', type: 'danger', handler() {
        //         console.log('Danger btn clicked');
        // }},
    ]
});




document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Price: ${fruit.title} - ${fruit.price}$</p>
        `);
        priceModal.open();
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Are you sure?',
            content: `<p>Are you going to delete <strong>${fruit.title}</strong></p>`
        })
            .then(() => {
                fruits = fruits.filter(f => f.id !== id);
                render();
            })
            .catch(() => {
                console.log('Cancel');
            })
    }
});
