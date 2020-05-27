module.exports = function () {
    const basePlugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime'
    ];

    const basePresets = [
        '@babel/preset-react',
    ];

    let presets = [...basePresets];
    let plugins = [...basePlugins];


    return {
        presets,
        plugins,
    };
};
