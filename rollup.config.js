import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import rollupUrl from '@rollup/plugin-url';

var componentPath
var serverPath
if ((process.env.BUILD !== 'production')) {
    componentPath = "https://e563-69-1-192-73.ngrok.io/vue-apps/";
    serverPath = "https://e563-69-1-192-73.ngrok.io/build/";
} else {
    componentPath = "https://nathankoehler.github.io/vue-apps/";
    serverPath = "https://nathankoehler.github.io/core-components/";
}

export default ['index', 'main-room'].map((name, index) => ({
    input: `src/rooms/${name}.ts`,
    output: [{
        file: `./build/${name}.js`,
        format: 'es',
        sourcemap: 'inline'
    },
    {
        file: `./build/${name}.min.js`,
        format: 'es',
        plugins: [terser()]
    }],
    external: [ 
        componentPath + "dist/hubs.js" ],
    plugins: [
        nodeResolve(),
        replace({
            preventAssignment: true,
            'https://resources.realitymedia.digital/vue-apps/': componentPath //JSON.stringify( componentPath )
        }),  
        typescript({
            typescript: require('typescript'),
        }),
        rollupUrl({
            limit: 1000,
            publicPath: serverPath,
        }),    
    ]
}));