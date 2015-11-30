var lat, lng;
var country = 'ua';
var options = {};

function loadAutocomplete() {
<<<<<<< HEAD
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
      placeholder: 'Адрес',
    }],
    buttons: [{
      id: 'result',
      text: 'Увидеть результаты',
      callback: function () {
        WIDGET.Dialog.result();
      }
    }, {
      id: 'geoLoc',
      text: 'Найти меня',
      callback: function () {
        WIDGET.GeoLoc.getGeoLoc();
      }
    }],
  });
}

function initializeAutocomplete() {
  var autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')), {
    types: ['geocode']
  });
  autocomplete.addListener('place_changed', fillInAddress);
=======
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
    var autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')), options);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        lat = place.geometry.location.lat();
        lng = place.geometry.location.lng();
    });
>>>>>>> refs/remotes/Multitest/master
}

window.onload = loadAutocomplete;

if (typeof WIDGET == "undefined" || !WIDGET) {
  var WIDGET = {};
}

WIDGET.Lang = typeof WIDGET.Lang != 'undefined' && WIDGET.Lang ? WIDGET.Lang : {
  isUndefined: function (o) {
    return typeof o === 'undefined';
  },
  isString: function (o) {
    return typeof o === 'string';
  }
};

<<<<<<< HEAD
WIDGET.GeoLoc = typeof WIDGET.GeoLoc != 'undefined' && WIDGET.GeoLoc ? WIDGET.GeoLoc : {
  getGeoLoc: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log(pos.coords.latitude, pos.coords.longitude);
        WIDGET.GeoLoc.getGoogleAddress(pos.coords.latitude, pos.coords.longitude);
      }, function () {
        alert("geolocation access denied");
                //hide geoloc button
              });
    } else {
      alert("geolocation is not supported");
            //hide geoloc button
          }
        },
        getGoogleAddress: function (lat, lng) {
          var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng;
          console.log(url);

          var loadJSON = function (path, success, error) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                  if (success) success(JSON.parse(xhr.responseText));
                } else {
                  if (error) error(xhr);
                }
              }
            };
            xhr.open("GET", path, true);
            xhr.send();
            return true;
          }

          loadJSON(url,

            function (json) {
              if (json && json.results && json.results[0]) {
                var addr = json.results[0].formatted_address;
                var dialog = document.getElementById('widget-multitest-inner');
                var input = dialog.querySelector("#address"); //need to rewrite
                input.value = addr;
              }
            },
            function (xhr) {});
=======
WIDGET.DOM = typeof WIDGET.DOM != 'undefined' && WIDGET.DOM ? WIDGET.DOM : {
    get: function(el) {
        return (el && el.nodeType) ? el : document.getElementById(el);
    },

    addInput: function(dialog, inputData, text) {
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = inputData.placeholder;
        input.id = inputData.id;
        input.size = 50;
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
>>>>>>> refs/remotes/Multitest/master
        }
      };

      WIDGET.DOM = typeof WIDGET.DOM != 'undefined' && WIDGET.DOM ? WIDGET.DOM : {
        get: function (el) {
          return (el && el.nodeType) ? el : document.getElementById(el);
        },

        addInput: function (dialog, inputData, text) {
          var input = document.createElement("input");
          input.type = "text";
          input.placeholder = inputData.placeholder;
          input.id = inputData.id;
          input.size = 30;
          input.name = inputData.name;
          input.value = text;
          dialog.appendChild(input);
        },

        addButton: function (dialog, buttonData) {
          var button = document.createElement("button");
          button.id = buttonData.id;
          var text = document.createTextNode(buttonData.text);
          button.appendChild(text);
          dialog.appendChild(button);
        },

        addText: function (dialog, tag, text) {
          var p = document.createElement(tag);
          var text = document.createTextNode(text);
          p.appendChild(text);
          dialog.appendChild(p);
        },

        addListener: function (el, type, fn) {
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

        removeListener: function (el, type, fn) {
          if (WIDGET.Lang.isString(el)) {
            el = this.get(el);
          }
          if (el.removeEventListener) {
            el.removeEventListener(type, fn, false);
          } else if (el.detachEvent) {
            el.detachEvent('on' + type, fn);
          } else {
            el['on' + type] = function () {
              return true;
            };
          }
        },
      };
      if (typeof WIDGET == "undefined" || !WIDGET) {
        var WIDGET = {};
      }

      WIDGET.Dialog = typeof WIDGET.Dialog != 'undefined' && WIDGET.Dialog ? WIDGET.Dialog : function () {

        var dialog = document.getElementById('widget-multitest-inner');
        var lat;
        var lng;
        dialog.className = 'dialog';
        dialog.style.display = 'none';
        document.body.appendChild(dialog);

        var loadJSON = function (path, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
              } else {
                if (error) error(xhr);
              }
            }
          };
          xhr.open("GET", path, true);
          xhr.send();
          return true;
        }

        var render = function (o) {
          var html = '';
          var city = '';

          loadJSON('http://ip-api.com/json',

            function (data) {
              lat = data.lat;
              lng = data.lon;
              WIDGET.DOM.addText(dialog, 'p', o.body);
              for (i = 0; i < o.inputs.length; i++) {
                WIDGET.DOM.addInput(dialog, o.inputs[i], data.city);
              }
              for (i = 0; i < o.buttons.length; i++) {
                WIDGET.DOM.addButton(dialog, o.buttons[i]);
              }
              dialog.style.display = 'block';
              activateListeners(o.buttons);
            },

<<<<<<< HEAD
            function (xhr) {});
=======
    var dialog = document.getElementById('widget-multitest-inner');
    dialog.className = 'dialog';
    dialog.style.display = 'none';
    document.body.appendChild(dialog);
>>>>>>> refs/remotes/Multitest/master

        };
<<<<<<< HEAD
=======
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

    var isHouse = function(results) {
        for (i = 0; i < results[0].address_components.length; i++) {
            for (j = 0; j < results[0].address_components[i].types.length; j++) {
                if (results[0].address_components[i].types[j] == "street_number") {
                    return true;
                }
                if (results[0].address_components[i].types[j] == "street_address") {
                    return true;
                }
                if (results[0].address_components[i].types[j] == "premise") {
                    return true;
                }
                if (results[0].address_components[i].types[j] == "subpremise") {
                    return true;
                }
            }
        }
        return false;
    };

    var render = function(o) {
        var html = '';
        var city = '';

        loadJSON('http://ip-api.com/json',
            function(data) {
                lat = data.lat;
                lng = data.lon;
                options = {
                    types: ['address'],
                    componentRestrictions: {
                        country: data.countryCode
                    },
                };

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
>>>>>>> refs/remotes/Multitest/master

        var activateListeners = function (buttons) {
          var i, length, button, isUndefined = WIDGET.Lang.isUndefined;

<<<<<<< HEAD
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
=======
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
>>>>>>> refs/remotes/Multitest/master

        return {
          show: function (o) {
            render(o);
          },
          hide: function () {
            dialog.style.display = 'none';
<<<<<<< HEAD
          },
          result: function () {
            alert(lat + ',' + lng);
          }
        };
      }();
=======
        },
        resultMultitest: function(address, result) {
            address = document.getElementById(address).value;
            button = document.getElementById(result);
            button.disabled = false;

            if (address && !button.disabled) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address: address
                }, function(results) {
                    if (isHouse(results)) {
                        button.disabled = false;
                        lat = results[0].geometry.location.lat();
                        lng = results[0].geometry.location.lng();
                        window.open('http://www.multitest.ua/coordinates/internet-v-kvartiru/?lat=' + lat + '&lng=' + lng + '&address_text=' + address, '_blank');
                    } else {
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
>>>>>>> refs/remotes/Multitest/master
