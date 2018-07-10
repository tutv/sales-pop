var GE = (function () {
    return {
        addScript: _addScript,
        addStyle: _addStyle,
        random: _rand,
    };

    function _rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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
    var i = 0;
    const messages = window.GE_MESSAGES && Array.isArray(window.GE_MESSAGES) ? window.GE_MESSAGES : [];
    if (!messages || !messages.length) {
        return;
    }

    function _addEvent(obj, evt, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(evt, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + evt, fn);
        }
    }

    function run() {
        if (i < messages.length - 1) {
            i++;
        } else {
            i = 0;
        }

        var message = messages[i];
        if (!message) {
            return;
        }

        sendMessage(message);

        setTimeout(function () {
            run();
        }, GE.random(5000, 15000));
    }

    function sendMessage(message) {
        const options = Object.assign({}, {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
        }, message);

        Lobibox.notify('info', options);
    }

    var trigger = false;
    _addEvent(document, 'mouseout', function (e) {
        if (trigger) {
            return;
        }

        if (e.toElement === null && e.relatedTarget === null) {
            setTimeout(function () {
                trigger = true;
                run();
            }, 300);
        }
    });

    setTimeout(() => {
        if (trigger) {
            return;
        }
        trigger = true;
        run();
    }, 10000);
});

function afterLobibox() {
    GE.addStyle('https://tutv.github.io/sales-pop/src/lobibox.css?v=1');
    APP();
}

function afterJquery() {
    GE.addScript('https://tutv.github.io/sales-pop/src/lobibox.min.js', 'ge.lobibox', afterLobibox);
}

GE.addScript('https://tutv.github.io/sales-pop/src/jquery.min.js', 'ge.jquery', afterJquery);
