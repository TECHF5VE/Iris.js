declare var _default: {
    entry: {
        index: string | string[];
    };
    devtool: string;
    output: {
        path: string;
        libraryTarget: string;
        library: any;
        filename: string;
    };
    resolve: {
        extensions: string[];
    };
    module: {
        rules: {
            test: RegExp;
            use: {
                loader: string;
            }[];
        }[];
    };
    plugins: any[];
    devServer: {
        hot: boolean;
        contentBase: string;
        publicPath: string;
    };
};
export default _default;
