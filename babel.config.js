module.exports = {
    preset: [
        ['@babel/preset-env', { target: { esmodules: true } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript'
    ]
};