#!/usr/bin/env bash

set -e

pnpm build
rm -rf /home/coder/Source/srv/blog.k1yoshi.com/*
cp -rf .output/* /home/coder/Source/srv/blog.k1yoshi.com

echo 'Successfully deployed!'
