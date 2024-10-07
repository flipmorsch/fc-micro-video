#!/bin/sh

npm run cti create './src/@core/src/category/application' -- -i '*spec.ts' -b &&
npm run cti create './src/@core/src/category/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/@core/src/category/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/@core/src/@seedwork/application' -- -i '*spec.ts' -b &&
npm run cti create './src/@core/src/@seedwork/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/@core/src/@seedwork/infra' -- -i '*spec.ts' -b