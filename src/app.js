var GE = (function () {
    return {
        addScript: _addScript,
        addStyle: _addStyle,
    };

    function _addStyle(src, callback) {
        var head = document.head;
        var link = document.createElement("link");

        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = src;

        function onLoad() {
            callback && callback();
        }

        function onError(error) {
            callback && callback(error);
        }

        link.onload = onLoad;
        link.onerror = onError;

        head.appendChild(link);
    }

    function _addScript(src, id = '', callback) {
        const scriptId = id ? id : src;
        const checkExists = document.getElementById(scriptId);
        if (checkExists) {
            return callback();
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.id = scriptId;

        document.body.appendChild(script);

        function onLoad() {
            callback && callback();
        }

        function onError(error) {
            callback && callback(error);
        }

        script.onload = onLoad;
        script.onerror = onError;
    }
})();

var APP = (function () {
    Lobibox.notify('info', {
        pauseDelayOnHover: true,
        continueDelayOnInactiveTab: false,
        title: 'Phụ Hương Khang',
        msg: '<p>Chị Mai đến từ Nghệ An, vừa đặt mua</p><small>3 phút trước</small>',
        img: './demo.png',
        delay: false,
    });
});

function afterLobibox() {
    GE.addStyle('https://tutv.github.io/sales-pop/src/lobibox.css?v=1');
    APP();
}

function afterJquery() {
    GE.addScript('https://tutv.github.io/sales-pop/src/lobibox.min.js', 'ge.lobibox', afterLobibox);
}

GE.addScript('https://tutv.github.io/sales-pop/src/jquery.min.js', 'ge.jquery', afterJquery);
