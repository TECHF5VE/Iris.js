declare var _default: {
    entry: any;
    output: {
        path: any;
        libraryTarget: string;
        library: string;
        filename: string;
    };
    resolve: {
        extensions: string[];
    };
    module: {
        rules: ({
            enforce: string;
            test: RegExp;
            loader: string;
        } | {
            enforce: string;
            test: RegExp;
            use: string;
        } | {
            test: RegExp;
            use: ({
                loader: string;
                options: {
                    presets: string[];
                };
            } | {
                loader: string;
                options: {};
            })[];
            exclude: any[];
        })[];
    };
    devtool: string;
    plugins: any[];
    devServer: {
        hot: boolean;
        contentBase: any;
        publicPath: string;
    };
};
export default _default;
