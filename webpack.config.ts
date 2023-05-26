import * as path from "path";
import * as webpack from "webpack";
import CopyPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
    mode: "development",
    entry: {
        background: path.join(__dirname, "src", "background.ts"),
        twitter: path.join(__dirname, "src", "content-scripts", "twitter.ts"),
        civitai: path.join(__dirname, "src", "content-scripts", "civitai.ts"),
        nhen: path.join(__dirname, "src", "content-scripts", "nhen.ts"),
        focus: path.join(__dirname, "src", "content-scripts", "focus.ts"),
    },
    output: {
        path: path.join(__dirname, "dist", "src"),
        filename: (pathData: any) => {
            console.log(pathData.chunk);
            return pathData.chunk.name === "background"
                ? "[name].js"
                : "content-scripts/[name].js";
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "manifest.json"),
                    to: path.join(__dirname, "dist", "manifest.json"),
                },
                {
                    from: path.join(__dirname, "src", "popup.html"),
                    to: path.join(__dirname, "dist", "src", "popup.html"),
                },
                {
                    from: path.join(__dirname, "images"),
                    to: path.join(__dirname, "dist", "images"),
                },
            ],
        }),
    ],
    optimization: {
        minimize: false,
    },
    devtool: "inline-source-map",
};

export default config;
