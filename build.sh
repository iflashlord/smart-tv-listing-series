#!/bin/bash
WORKING_DIR="dist"

if [ -d "$WORKING_DIR" ]; then rm -Rf $WORKING_DIR; fi

mkdir -p dist

minify index.html > dist/index.html

# Remove error about exports for tests
#indexfile="dist/index.html"
#searchindexfile="<script><\/script>"
#replaceindexfile="<script> var exports = {} <\/script>"
#sed -i -e "s/$searchindexfile/$replaceindexfile/g" $indexfile
#rm dist/index.html-e

cp favicon.ico dist/favicon.ico
minify app.js > dist/app.js

mkdir -p dist/assets
cp -av assets/ dist/assets/

mkdir -p dist/json
cp -av json/ dist/json/


mkdir -p dist/features/detail
minify features/detail/detailFocus.js > dist/features/detail/detailFocus.js
minify features/detail/detailView.js > dist/features/detail/detailView.js
minify features/detail/detail.css > dist/features/detail/detail.css

mkdir -p dist/features/list
minify features/list/listFocus.js > dist/features/list/listFocus.js
minify features/list/listView.js > dist/features/list/listView.js
minify features/list/list.css > dist/features/list/list.css
 
mkdir -p dist/features/main
minify features/main/mainFocus.js > dist/features/main/mainFocus.js
minify features/main/mainView.js > dist/features/main/mainView.js
minify features/main/main.css > dist/features/main/main.css
 
mkdir -p dist/features/splash
minify features/splash/SplashView.js > dist/features/splash/splashView.js
minify features/splash/splash.css > dist/features/splash/splash.css

mkdir -p dist/features/footer
minify features/footer/footerView.js > dist/features/footer/footerView.js
minify features/footer/footer.css > dist/features/footer/footer.css
 
mkdir -p dist/service
minify service/DataService.js > dist/service/dataService.js

# Set debug mode on false in dataService 
#dataservicefile="dist/service/dataService.js"
#searchdataservice="this._isLocalDebug = true"
#replacedataservice="this._isLocalDebug = false"
## should be active two below line for real production
#sed -i -e  "s/$searchdataservice/$replacedataservice/g" $dataservicefile
#rm dist/service/dataService.js-e

mkdir -p dist/utils
minify utils/keycode.js > dist/utils/keycode.js
minify utils/keyEvent.js > dist/utils/keyEvent.js
minify utils/scrollbar.js > dist/utils/scrollbar.js

find dist/ -name ".DS_Store" -delete

#serve -s dist/