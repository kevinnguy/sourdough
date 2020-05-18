#!/bin/sh

echo 'Pod installing';
cd ios/ && bundle exec pod install --repo-update
