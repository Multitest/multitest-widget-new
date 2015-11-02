if (typeof WIDGET == "undefined" || !WIDGET) {
    var WIDGET = {};
}

WIDGET.Lang = typeof WIDGET.Lang != 'undefined' && WIDGET.Lang ? WIDGET.Lang : {
    isUndefined: function(o) {
        return typeof o === 'undefined';
    },
    isString: function(o) {
        return typeof o === 'string';
    }
};

WIDGET.DOM = typeof WIDGET.DOM != 'undefined' && WIDGET.DOM ? WIDGET.DOM : {
    get: function(el) {
        return (el && el.nodeType) ? el : document.getElementById(el);
    },

    addListener: function(el, type, fn) {
        if (WIDGET.Lang.isString(el)) {
            el = this.get(el);
        }

        if (el.addEventListener) {
            el.addEventListener(type, fn, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, fn);
        } else {
            el['on' + type] = fn;
        }
    },

    removeListener: function(el, type, fn) {
        if (WIDGET.Lang.isString(el)) {
            el = this.get(el);
        }

        if (el.removeEventListener) {
            el.removeEventListener(type, fn, false);
        } else if (el.detachEvent) {
            el.detachEvent('on' + type, fn);
        } else {
            el['on' + type] = function() {
                return true;
            };
        }
    },

    purge: function(d) {
        var a = d.attributes,
            i, l, n;
        if (a) {
            l = a.length;
            for (i = 0; i < l; i += 1) {
                n = a[i].name;
                if (typeof d[n] === 'function') {
                    d[n] = null;
                }
            }
        }
        a = d.childNodes;
        if (a) {
            l = a.length;
            for (i = 0; i < l; i += 1) {
                WIDGET.DOM.purge(d.childNodes[i]);
            }
        }
    },

    setInnerHTML: function(el, html) {
        if (!el || typeof html !== 'string') {
            return null;
        }

        (function(o) {
            var a = o.attributes,
                i, l, n, c;
            if (a) {
                l = a.length;
                for (i = 0; i < l; i += 1) {
                    n = a[i].name;
                    if (typeof o[n] === 'function') {
                        o[n] = null;
                    }
                }
            }

            a = o.childNodes;

            if (a) {
                l = a.length;
                for (i = 0; i < l; i += 1) {
                    c = o.childNodes[i];
                    arguments.callee(c);
                    WIDGET.DOM.purge(c);
                }
            }

        })(el);

        el.innerHTML = html.replace(/<script[^>]*>[\S\s]*?<\/script[^>]*>/ig, "");
        return el.firstChild;
    }
};
if (typeof WIDGET == "undefined" || !WIDGET) {
    var WIDGET = {};
}


WIDGET.Dialog = typeof WIDGET.Dialog != 'undefined' && WIDGET.Dialog ? WIDGET.Dialog : function() {

    var dialog = document.createElement('widget-multitest-inner');
    dialog.className = 'dialog';
    dialog.style.display = 'none';
    document.body.appendChild(dialog);

    String.prototype.format = function() {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };

    var render = function(o) {
        var html = '';
        html = '<p>{0}</p>'.format(o.body ? o.body : '');
        for (i = 0; i < o.inputs.length; i++) {
            input = o.inputs[i];
            html += '<input type="text" value="" placeholder="{0}" id="{1}" name="{2}">'.format(input.placeholder, input.id, input.name);
        }
        for (i = 0; i < o.buttons.length; i++) {
            button = o.buttons[i];
            html += '<button id="{0}">{1}</button>'.format(button.id, button.text);
        }

        WIDGET.DOM.setInnerHTML(dialog, html);
        dialog.style.display = 'block';
        activateListeners(o.buttons);
    };

    var activateListeners = function(buttons) {
        var i, length, button, isUndefined = WIDGET.Lang.isUndefined;

        if (WIDGET.Lang.isUndefined(buttons)) {
            return;
        }
        length = buttons.length;

        for (i = 0; i < length; i++) {
            button = buttons[i];
            if (!isUndefined(button.callback.type) && !isUndefined(button.callback.fn)) {
                WIDGET.DOM.addListener(button.id, button.callback.type, button.callback.fn);
            } else {
                WIDGET.DOM.addListener(button.id, 'click', button.callback);
            }
        }
        cached_buttons = buttons;
    };

    return {
        show: function(o) {
            render(o);
        },
        hide: function() {
            dialog.style.display = 'none';
        },
        result: function() {}
    };
}();


WIDGET.Dialog.show({
    body: 'Подбери лучший интернет бесплатно',
    inputs: [{
        id: 'city',
        name: 'city',
        autocomplete: false,
        placeholder: 'Город',
    }, {
        id: 'address',
        name: 'address',
        autocomplete: true,
        placeholder: 'Адрес',
    }],
    buttons: [{
        id: 'result',
        text: 'Увидеть результаты',
        callback: function() {
            WIDGET.Dialog.result();
        }
    }, ]
});