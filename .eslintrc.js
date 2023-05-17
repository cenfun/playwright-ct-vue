// https://eslint.org/docs/rules/
module.exports = {
    'root': true,
    // system globals
    'env': {
        'node': true,
        'browser': true,
        'amd': true,
        'commonjs': true,
        'es6': true
    },
    // other globals
    'globals': {

    },

    'plugins': [
        'vue',
        'html'
    ],

    'extends': [
        'plus',
        'plugin:vue/recommended'
    ],

    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },

    'rules': {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'off'
    }
};
