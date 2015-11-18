var lat, lng;

function loadAutocomplete() {
    function runWidget() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=initializeAutocomplete&libraries=places';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }
    setTimeout(runWidget, 1000);

    WIDGET.Dialog.show({
        body: 'Подбери лучший интернет бесплатно',
        inputs: [{
            id: 'address',
            name: 'address',
            autocomplete: true,
            placeholder: 'Введите улицу и номер дома',
            callback: function() {
                WIDGET.Dialog.changeAddress('address', 'result');
            }
        }],
        buttons: [{
            id: 'result',
            text: 'Сравнить тарифы',
            callback: function() {
                WIDGET.Dialog.resultMultitest('address', 'result');
            }
        }],
    });
}

function initializeAutocomplete() {
    var autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')), {
        types: ['geocode']
    });
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        lat = place.geometry.location.lat();
        lng = place.geometry.location.lng();
    });
}

window.onload = loadAutocomplete;

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

    addInput: function(dialog, inputData, text) {
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = inputData.placeholder;
        input.id = inputData.id;
        input.size = 30;
        input.name = inputData.name;
        input.value = text;
        dialog.appendChild(input);
    },

    addButton: function(dialog, buttonData) {
        var button = document.createElement("button");
        button.id = buttonData.id;
        var text = document.createTextNode(buttonData.text);
        button.appendChild(text);
        dialog.appendChild(button);
    },

    addText: function(dialog, tag, text) {
        var p = document.createElement(tag);
        var text = document.createTextNode(text);
        p.appendChild(text);
        dialog.appendChild(p);
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
};
if (typeof WIDGET == "undefined" || !WIDGET) {
    var WIDGET = {};
}

WIDGET.Dialog = typeof WIDGET.Dialog != 'undefined' && WIDGET.Dialog ? WIDGET.Dialog : function() {

    var dialog = document.getElementById('widget-multitest-inner');
    dialog.className = 'dialog';
    dialog.style.display = 'none';
    document.body.appendChild(dialog);

    var loadJSON = function(path, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
        return true;
    }

    var formatAddress = function(place) {
        var address = '';
        if (place.terms.length) {
            for (var i = place.terms.length - 2; i >= 0; i--) {
                var current = place.terms[i].value;
                var prev = i > 0 ? place.terms[i - 1].value : '#';
                if (current.indexOf(prev) == -1) {
                    address += place.terms[i].value + (i != 0 ? ', ' : '');
                }
            }
        }
        return address;
    }

    var render = function(o) {
        var html = '';
        var city = '';

        loadJSON('http://ip-api.com/json',
            function(data) {
                lat = data.lat;
                lng = data.lon;
                WIDGET.DOM.addText(dialog, 'p', o.body);
                for (i = 0; i < o.inputs.length; i++) {
                    WIDGET.DOM.addInput(dialog, o.inputs[i], data.city);
                }
                activateListeners(o.inputs, 'change');

                for (i = 0; i < o.buttons.length; i++) {
                    WIDGET.DOM.addButton(dialog, o.buttons[i]);
                }
                dialog.style.display = 'block';
                activateListeners(o.buttons, 'click');
            },
            function(xhr) {}
        );

    };

    var activateListeners = function(tag, type) {
        var i, length, tag, isUndefined = WIDGET.Lang.isUndefined;

        if (WIDGET.Lang.isUndefined(tag)) {
            return;
        }

        length = tag.length;
        for (i = 0; i < length; i++) {
            tag = tag[i];
            WIDGET.DOM.addListener(tag.id, type, tag.callback);
        }
    };

    return {
        show: function(o) {
            render(o);
        },
        hide: function() {
            dialog.style.display = 'none';
        },
        resultMultitest: function(address, result) {
            address = document.getElementById(address).value;
            button = document.getElementById(result);
            if (address && !button.disabled) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address: address
                }, function(results) {
                    try {
                        lat = results[0].geometry.location.lat();
                        lng = results[0].geometry.location.lng();
                        window.open('http://www.multitest.ua/coordinates/internet-v-kvartiru/?lat=' + lat + '&lng=' + lng + '&address_text=' + address, '_blank');
                    } catch (e) {
                        console.log(e.name);
                        button.disabled = true;
                    }
                });
            }
        },
        changeAddress: function(address, result) {
            if (document.getElementById(address).value) {
                document.getElementById(result).disabled = false;
            } else {
                document.getElementById(result).disabled = true;
            }
        }
    };
}();