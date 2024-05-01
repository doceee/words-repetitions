#!/bin/bash

TARGET="/var/www/words-repetitions"

buildFrontend() {
cd frontend

npm run build-only

rsync -a --remove-source-files ./frontend/dist* $TARGET
}

buildBackend() {
cd backend

npm run build
}

PS3='Please enter your choice: '
options=(\
	"build frontend"\
	"build frontend and install dependencies"\
	"build backend"\
	"build backend and install dependencies"\
)

select opt in "${options[@]}"
do
case "$opt" in
	"build frontend")
		buildFrontend
		break
		;;
	"build frontend and install dependencies")
		cd frontend;
		npm install;
		buildFrontend;
		break
		;;
	"build backend")
		buildBackend;
		break
		;;
	"build backend and install dependencies")
		cd backend;
		npm install;
		buildBackend;
		break
		;;
esac
done


