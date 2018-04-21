#!/usr/bin/env bash

##### Create Output Folders #####
mkdir -v $HOME/build
mkdir -v $Home/build/Web-Page
mkdir -v $Home/build/Android-App
mkdir -v $Home/build/iOS-App
mkdir -v $Home/build/Backend-Server

##### Copy Files #####

  ### Android-App ###
  cp -fr code/frontend/mobile/android/app/build/outputs/apk/ $HOME/build/Android-App

  ### Web-Page ###
  cp -fr code/frontend/web/build/ $HOME/build/Web-Page

  ### iOS-App ###
  touch $HOME/build/iOS-App/note.txt
  echo "No iOS App Present!!!" > $HOME/build/iOS-App/note.txt

  ### Backend-Server ###
  cp -fr code/backend/build/ $HOME/build/Backend-Server

##### Set File Permissions #####
chmod -r 444 $HOME/build

##### Setup Git #####
cd $HOME
git config --global user.email "florian.widder@live.de"
git config --global user.name "Florian Widder"

##### Clone Master Branch #####
git clone --quiet --branch master = https://fwidder:$OAUTH_GITHUB@github.com/Assignment-1B-Team-14/ChatBot master > /dev/null

##### Copy Files #####
cd master
cp -rf $HOME/build

##### Upload to Git #####
git add -f.
git remote rm origin
git remote add origin https://fwidder:$OAUTH_GITHUB@github.com/Assignment-1B-Team-14/ChatBot
git add -f
git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed"
git push origin master -fq

echo "Done!"
