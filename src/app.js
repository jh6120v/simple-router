import Router, { navigate } from './js/router';

const router = new Router([
    {
        path: '/',
        handler(path) {
            console.log(`'${path}':: index page.`);

            setTimeout(() => {
                navigate('/simple-router');
            }, 0);
        }
    },
    {
        path: '/simple-router',
        handler(path) {
            console.log(`'${path}':: main page.`);

            const aTag = document.createElement('a');
            aTag.innerText = 'navigate to hello world page.';
            aTag.className = 'title';
            aTag.addEventListener('click', (e) => {
                e.preventDefault();

                navigate('/simple-router/hello-world');
            });

            const app = document.getElementById('app');
            while (app.firstChild) {
                app.removeChild(app.firstChild);
            }

            const header = document.createElement('h1');
            header.innerText = '<> Simple Router </>';
            header.className = 'header';

            app.appendChild(header);
            app.appendChild(aTag);
        }
    },
    {
        path: '/simple-router/hello-world',
        handler(path) {
            console.log(`'${path}':: hello world page.`);

            const aTag = document.createElement('a');
            aTag.innerText = 'navigate to index page.';
            aTag.className = 'title';
            aTag.addEventListener('click', (e) => {
                e.preventDefault();

                navigate('/');
            });

            const app = document.getElementById('app');
            while (app.firstChild) {
                app.removeChild(app.firstChild);
            }

            const header = document.createElement('h1');
            header.innerText = '<> Simple Router </>';
            header.className = 'header';

            app.appendChild(header);
            app.appendChild(aTag);
        }
    }
]);

router.listen();
