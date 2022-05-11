import path from 'path';
import PugPlugin from 'pug-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.resolve();

export default {
  mode: 'development',
  entry: {

    filename: '/src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'prachat.bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new PugPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              //              transpileOnly: true,
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/i,
        loader: '@webdiscus/pug-loader',
        options: {
          esModule: true,
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'static'),
    },
    compress: false,
    port: 9000,
    historyApiFallback: true,
  },
};
