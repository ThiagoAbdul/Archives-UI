#!/bin/bash

npm run build

aws s3 sync ./dist s3://archives-ui

aws cloudfront create-invalidation \
  --distribution-id E2XF4F2PYC71MX \
  --paths "/*"

