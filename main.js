const setPink = li => {
    li.className = "list-item border-fucsia";
}

const resetGrey = array => {
    array.forEach(li => {
        li.className = "list-item border-gray";
    })
}

const createElement = (element, text) => {
    const tag = document.createElement(element);

    tag.innerText = text;

    return tag;
}

const createTitle = (title, company) => {
    const span = createElement('span', ` @ ${company}`);
    const h3 = createElement ('h3', title);

    h3.appendChild(span);

    return h3;
}

const createDate = (date) => createElement('p', date);

const createTask = (task) => createElement('li', task);

const createDescription = (array) => {
    const ul = document.createElement('ul');

    array.forEach(item => {
        ul.appendChild(createTask(item));
    })

    return ul;
}

const companiesData = async() => { 
    const response = await fetch("./data/companies.json");
    const jsonResponse = await response.json();
    const { companies } = jsonResponse;

    const parentDescription = document.querySelector('.company-description');

    setPink(document.querySelector('.list-item'));

    document.querySelectorAll('.list-item').forEach(li => {
        li.addEventListener("click", () => {
            resetGrey(document.querySelectorAll('.list-item'));
            setPink(li);
            parentDescription.innerHTML = "";

            const [ company ] = companies.filter(company => company.name == li.innerText)
            parentDescription.appendChild(createTitle(company.title, company.name));
            parentDescription.appendChild(createDate(company.dates));
            parentDescription.appendChild(createDescription(company.tasks));
        })
    })
}

const addCloseMenuEvent = () => {
    const menuItems = document.querySelectorAll('.menu li');
    const burgerInput = document.querySelector('#burger');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerInput.checked = false;
        })
    })
}

const scrollButton = document.querySelector('.scroll.down');

scrollButton.addEventListener('click', () => {
    const screenHeight = window.innerHeight;
    const currentYPosition = window.scrollY;
    const newYposition = currentYPosition + screenHeight;

    window.scroll({top: newYposition, behavior: "smooth"});
})

companiesData();
addCloseMenuEvent();