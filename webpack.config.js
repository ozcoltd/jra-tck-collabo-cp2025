import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: './src/assets/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'htdocs/assets/js')
  },
  optimization: {
    minimize: true
  },
};
