module.exports = function (api) {
    const env = api.env();

    const basePlugins = [
        '@babel/syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
        '@loadable/babel-plugin',
    ];

    const basePresets = [];

    let presets = [...basePresets];
    let plugins = [...basePlugins];

    if (env === 'production') {
        plugins.push([
            'transform-react-remove-prop-types',
            {
                'mode': 'remove',
                'removeImport': true,
                'additionalLibraries': [
                    'react-immutable-proptypes'
                ]
            }
        ])
    } else {
        plugins.push('react-hot-loader/babel');
    }

    presets.push(
        [
            '@babel/preset-env',
            {
                'useBuiltIns': 'entry',
                'modules': false,
            }
        ]
    );

    presets.push(
        '@babel/preset-react',
    );

    return {
        presets,
        plugins,
    };
};
