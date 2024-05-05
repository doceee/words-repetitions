#!/bin/bash

git pull

buildFrontend() {
FRONTEND_BUILD="/home/deploy/apps/words-repetitions/frontend/dist/*"
TARGET="/var/www/words-repetitions"

cd frontend

if [ "$1" == "true" ]; then
    npm install
fi

npm run build-only

rsync -a --remove-source-files $FRONTEND_BUILD $TARGET
}

buildBackend() {
cd backend

if [ "$1" == "true" ]; then
    npm install
fi

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
		buildFrontend "true";
		break
		;;
	"build backend")
		buildBackend;
		break
		;;
	"build backend and install dependencies")
		buildBackend "true";
		break
		;;
esac
done


