# EMV translate

This library provides a function to EMV, and a transformation to be used in EMV views.

# Install

## Legacy
```html
<script type="text/javascript" src="path/to/emv.min.js"></script>
<script type="text/javascript" src="path/to/emv-translate.min.js"></script>
```

## Require AMD
```javascript
require.config({
    paths : {
        emv : 'path/to/emv.min',
        'emv-translate' : 'path/to/emv-translate.min'
    },
    shim : {
        emv : {
            exports : ['EMV']
        },
        'emv-translate' : {
            deps : ['emv']
        }
    }
});

require(['emv', 'emv-tranlsate'], (EMV) => {
    ...
});
```

## NodeJS project
```javascript
const emv = require('emv');
require('emv-translate');
```


# Configuration
The first thing to do is to declare the language keys, with their translations, to be used in your application :

```javascript
EMV.config.translate = {
    en : {
        section : {
            key1 : 'translation 1',
            key2 : 'translation 2',
            subSection : {
                ...
            }
        },
        simpleKey : 'translation for simple key'
    }
};
```

Declare the language, an in it, an object containing the language keys to declare. You can use as levels as you want to isolate
your language keys by feature.


# Use in views

## Display a simple translation :
```html
<span>${'section.key1' :: translate}</span>
```

Another notation is possible, in an attribute directive :
<span e-text="{$data : 'section.key1', $transform : 'translate'}"></span>

The transformation will detect your language, compare it to the declared langages to choose the right translation

## Display a translation with parameters :
It is possible to integrate parameters in a translation. The following example explains how to do so :
`index.html`
```html
<span>${'result.number' :: translate(number:results)}</span>
```

`index.js`
```javascript
EMV.config.translate = {
    en : {
        result : {
            number : '{number} results'
        }
    }
};

const emv = new EMV({
    results : 12
});
evm.$apply();
```

## Use emv-translate in the model :
It is also possible to use emv translate in a model, with the method
```javascript
EMV.translate(key, parameters, language)
```

Parameters :
* key (string): The language key to get the translation of
* parameters (object) : The parameters to inject in the translation
* langauge (string) : The language to use. If not set, the browser language will be detected



