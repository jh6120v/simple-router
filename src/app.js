import Router, { navigate } from './js/router';

const router = new Router([
    {
        path: '/',
        handler(path) {
            console.log(`'${path}':: default page.`);

            const aTag = document.createElement('a');
            aTag.innerText = 'navigate to hello world';
            aTag.addEventListener('click', (e) => {
                e.preventDefault();

                navigate('/hello-world');
            });

            const app = document.getElementById('app');
            while (app.firstChild) {
                app.removeChild(app.firstChild);
            }

            app.appendChild(aTag);
        }
    },
    {
        path: '/hello-world',
        handler(path) {
            console.log(`'${path}':: hello world.`);

            const aTag = document.createElement('a');
            aTag.innerText = 'navigate to default page';
            aTag.addEventListener('click', (e) => {
                e.preventDefault();

                navigate('/');
            });

            const app = document.getElementById('app');
            while (app.firstChild) {
                app.removeChild(app.firstChild);
            }

            app.appendChild(aTag);
        }
    }
]);

router.listen();
