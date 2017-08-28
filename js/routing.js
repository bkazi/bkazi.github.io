function routesListener() {
    const ids = ['writing', 'about'];
    const map = new Map();

    const clickListener = (event) => {
        event.preventDefault();
        const selected = document.querySelector('.route.selected');
        const currPathname = location.pathname;
        const newPathname = new URL(event.target.href).pathname;
        history.pushState({}, '', newPathname);
        map.get(currPathname).classList.add('route-hidden');
        map.get(newPathname).classList.remove('hidden');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                map.get(currPathname).classList.add('hidden');
                map.get(newPathname).classList.remove('route-hidden');
            });
        });
        selected.classList.remove('selected');
        event.target.parentNode.classList.add('selected');
    };

    ids.forEach((id) => {
        const link = document.getElementById(id);
        const dom = document.querySelector(`.${id}`);
        map.set(new URL(link.href).pathname, dom);
        link.addEventListener('click', clickListener);
        return link;
    });
}

routesListener();