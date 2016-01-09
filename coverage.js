var lat, lng;
var address = '';
var country = 'ua';
var options = {};
var urlGooglePlaces =
  'https://maps.googleapis.com/maps/api/js?sensor=false&callback=initializeAutocomplete&libraries=places';
var resultMultitest =
  'http://www.multitest.ua/coordinates/internet-v-kvartiru/';
var ipApi = 'http://ip-api.com/json';
var style = '';
var multitestLink = 'http://www.multitest.ua/';
var multitestStatic = 'http://www.multitest.ua/static/widget/';
var code, design;

var helpText = 'Введи полный адрес, например: Киев, Николая Бажана просп. 32';

String.prototype.format = function() {
  var formatted = this;
  for (var i = 0; i < arguments.length; i++) {
    var regexp = new RegExp('\\{' + i + '\\}', 'gi');
    formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};

function loadAutocomplete() {
  function runWidget() {
    WIDGET.DOM.getDesign();
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = urlGooglePlaces;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName(
      'body')[0]).appendChild(script);

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';
    link.href = '{0}css/{1}.css'.format(multitestStatic, style);
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName(
      'body')[0]).appendChild(link);
  }
  setTimeout(runWidget, 1000);

  WIDGET.Dialog.show({
    body: 'Найди интернет провайдера по адресу',
    inputs: [{
      id: 'address',
      name: 'address',
      autocomplete: true,
      placeholder: helpText,
      callback: function() {}
    }],
    buttons: [{
      id: 'result',
      text: 'Тарифы',
      callback: function() {
        WIDGET.Dialog.resultMultitest('result');
      }
    }],
  });
}

function initializeAutocomplete() {
  var autocomplete = new google.maps.places.Autocomplete((document.getElementById(
    'address')), options);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    lat = place.geometry.location.lat();
    lng = place.geometry.location.lng();
    address = place.formatted_address;
    WIDGET.Dialog.changeAddress('result');
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

  getDesign: function() {
    block = document.getElementById("widget-multitest");
    link = block.src;
    try {
      design = unescape(link).split("design=")[1].split("&")[0]
    } catch (s) {
      design = 1;
      console.log(e.name)
    }
    try {
      code = unescape(link).split("code=")[1].split("&")[0]
    } catch (e) {
      code = "";
      console.log(e.name)
    }
    if (design == 1) {
      style = 'banner470';
    } else {
      style = 'banner7281';
    }
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

  addMap: function(dialog, tag, text, className) {
    var a = document.createElement('a');
    a.className = className;
    a.target = '_blank';
    a.href = multitestLink;
    var tag = document.createElement(tag);
    text = document.createTextNode(text);
    tag.appendChild(text);
    a.appendChild(tag);
    dialog.appendChild(a);
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

WIDGET.Dialog = typeof WIDGET.Dialog != 'undefined' && WIDGET.Dialog ? WIDGET.Dialog :
  function() {
    WIDGET.DOM.getDesign();
    var dialog = document.createElement('div');
    dialog.id = style;
    dialog.style.display = 'none';
    document.getElementById('widget-multitest-inner').appendChild(dialog);

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

    var redirectResult = function(result, error) {
      if (address) {
        document.getElementById(result).disabled = false;
      } else {
        document.getElementById(result).disabled = true;
      }
      if (address) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          address: address
        }, function(results) {
          if (isHouse(results)) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            window.open(resultMultitest +
              '?lat={0}&lng={1}&address_text={2}&code={3}'.format(lat,
                lng, address, code), '_blank');
          } else {
            if (error) {
              alert(helpText);
            }
          }
        });
      } else {
        alert(helpText);
      }
    }

    var render = function(o) {
      var html = '';
      var city = '';

      loadJSON(ipApi,
        function(data) {
          lat = data.lat;
          lng = data.lon;
          if (data.countryCode) {
            country = data.countryCode
          }
          options = {
            types: ['geocode'],
            componentRestrictions: {
              //country: country
            },
          };

          var header = document.createElement('header');
          header.className = 'header';
          dialog.appendChild(header);

          strongHeading = document.createElement('strong');
          strongHeading.className = 'heading';
          strongHeading.innerHTML = o.body;

          strongLogo = document.createElement('strong');
          strongLogo.className = 'logo';
          logoLink = document.createElement('a');
          logoLink.href = multitestLink;
          logoLink.target = '_blank';
          logoLink.title = 'Multitest';
          logoLink.innerHTML = 'Мультитест';
          strongLogo.appendChild(logoLink);

          header.appendChild(strongHeading);
          header.appendChild(strongLogo);

          for (i = 0; i < o.inputs.length; i++) {
            WIDGET.DOM.addInput(dialog, o.inputs[i], '');
          }
          activateListeners(o.inputs, 'change');

          for (i = 0; i < o.buttons.length; i++) {
            WIDGET.DOM.addButton(dialog, o.buttons[i]);
          }
          dialog.style.display = 'block';
          activateListeners(o.buttons, 'click');
          if (design == 2) {
            WIDGET.DOM.addMap(dialog, 'span', 'Указать на карте', 'btn');
          }
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
      resultMultitest: function(result) {
        redirectResult(result, true);
      },
      changeAddress: function(result) {
        redirectResult(result, false);
      }
    };
  }();
