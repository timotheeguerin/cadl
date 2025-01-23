set -e


node ./esbuild.js

node --experimental-sea-config node-sea.json 
cp $(command -v node) standalone-test 
codesign --remove-signature standalone-test 
npx postject standalone-test NODE_SEA_BLOB sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
    --macho-segment-name NODE_SEA 

codesign --sign - standalone-test 
