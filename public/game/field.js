(function () {
    'use strict';

    let randomArray = (length, max) => [...new Array(length)]
    .map((_, i) => Math.round(Math.random() * max));

    class Field {
        constructor({ width, hight, img }) {
            this.createField()
            .then(() => {
                console.log('createField');
                this.hight = width;
                this.width = hight;
                this.img = img;
            });
        }

        static makeField(opt) {
            return new Promise((resolve, reject) => {
                let obj = new Field(opt);
                resolve(obj);
            });
        }

        draw(ctx) {
            this.fill(ctx);
        }

        createField() {
            return new Promise((resolve, reject) => {
                // Выбираем по какому протоколу будет производиться соединение
                const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

                // Составляем адрес, по которому будет призводиться соединение
                const address = `${protocol}//${location.host}/ws/field`;
                console.log('Создаём новый WebSocket:', address);
                const ws = new WebSocket(address);

                // обработчик открытия соединения
                ws.onopen = function (event) {
                // выводим сообщение, что соединение установлено
                    console.log('connect');
                    ws.send(JSON.stringify({ text: 'kyrlick' }));
                };

                // добавляем обработчик для нового сообщения
                ws.onmessage = function (event) {
                    // получаем сообщение
                    const incomingMessage = event.data;

                    // парсим сообщение
                    const message = JSON.parse(incomingMessage);
                    // добавляем сообщение на страницу
                    console.log(message);
                    this.field = message.data;
                    ws.close();
                    resolve();
                };

                // обработчик закрытия сокета
                ws.onclose = function (event) {
                    if (event.wasClean) {
                        console.log('Соединение закрыто чисто');
                    } else {
                        console.log('Обрыв соединения');
                    }
                    console.log(`Код: ${event.code} причина: ${event.reason}`);
                };

                // обработчик ошибок в сокете
                ws.onerror = function (error) {
                    console.log(`Ошибка ${error.message}`);
                    reject();
                };
            });
        }

        fill(ctx) {
            let dx = 0;
            let dy = 0;
            this.field.forEach(el => {
                if (el) {
                    ctx.drawImage(this.img, 299, 5, 64, 64, dx, dy, 64, 64);
                } else {
                    ctx.drawImage(this.img, 373, 5, 64, 64, dx, dy, 64, 64);
                }
                dx += 64;
                if (dx === 1024) {
                    dx = 0;
                    dy += 64;
                }
            });
        }

        getField() {
            return this.field;
        }
    }

    // export
    window.Field = Field;

})();
