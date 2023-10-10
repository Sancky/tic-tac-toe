module.exports = {
    entry: './src/impl.js',

    module: {
        rules: [
            { 
                test: /\.css$/i, 
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};