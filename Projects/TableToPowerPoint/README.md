# TableToPowerPoint
react components to create a powerpoint from table

## json used with previous project
```json
{
  "name": "core-client",
  "jest": {
    "transformIgnorePatterns": [
      "<rootDir>/node_modules/defaultPhrases.js"
    ]
  },
  "version": "7.31.0",
  "private": true,
  "homepage": "/v2/",
  "dependencies": {
    "@date-io/dayjs": "^1.3.8",
    "@emotion/core": "^10.0.14",
    "@emotion/styled": "^10.0.14",
    "@fortawesome/fontawesome-svg-core": "^1.2.28",
    "@fortawesome/free-brands-svg-icons": "^5.13.0",
    "@fortawesome/pro-light-svg-icons": "^5.13.0",
    "@fortawesome/pro-regular-svg-icons": "^5.13.0",
    "@fortawesome/pro-solid-svg-icons": "^5.13.0",
    "@fortawesome/react-fontawesome": "^0.1.9",
    "@hookform/error-message": "0.0.4",
    "@material-ui/core": "^v4.3.0",
    "@material-ui/icons": "^4.9.1",
    "@material-ui/lab": "^4.0.0-alpha.15",
    "@material-ui/pickers": "^3.1.2",
    "@material-ui/styles": "^4.1.0",
    "@talentplus/formation-ui": "^0.1.106",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^10.0.4",
    "@testing-library/user-event": "^7.1.2",
    "axios": "^0.21.1",
    "blueimp-load-image": "2.26.0",
    "dayjs": "^1.8.34",
    "downshift": "^3.2.10",
    "env-cmd": "^10.1.0",
    "faker": "^4.1.0",
    "file-saver": "^2.0.2",
    "formik": "^1.5.4",
    "highcharts": "^7.2.2",
    "highcharts-react-official": "^2.1.3",
    "history": "^4.9.0",
    "html2canvas": "^1.0.0-rc.1",
    "http-proxy-middleware": "^0.19.1",
    "js-search": "^1.4.3",
    "jsonwebtoken": "^8.5.1",
    "jspdf": "^2.3.1",
    "lodash": "^4.17.21",
    "lodash.debounce": "^4.0.8",
    "lodash.isequal": "^4.5.0",
    "material-table": "^1.69.1",
    "material-ui-dropzone": "^2.4.5",
    "moment": "^2.29.1",
    "polished": "^3.3.0",
    "pptxgenjs": "^3.10.0",
    "qs": "^6.9.6",
    "react": "^16.13.1",
    "react-confetti": "^3.1.1",
    "react-dates": "^21.8.0",
    "react-device-detect": "^1.12.1",
    "react-div-100vh": "^0.4.0",
    "react-dom": "^16.13.1",
    "react-ga": "^3.3.0",
    "react-gtm-module": "^2.0.11",
    "react-hook-form": "^6.8.6",
    "react-idle-timer": "^4.2.6",
    "react-intl": "^5.3.2",
    "react-moment-proptypes": "^1.7.0",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.4",
    "react-share": "^4.1.0",
    "react-window": "^1.8.6",
    "react-with-styles": "^4.1.0",
    "regenerator-runtime": "^0.13.5",
    "uuid": "^3.3.2",
    "yup": "^0.32.9"
  },
  "scripts": {
    "start": "env-cmd -f config/dev react-scripts start",
    "build": "env-cmd -f config/test react-scripts build",
    "build:test": "env-cmd -f config/test react-scripts build",
    "build:staging": "env-cmd -f config/staging react-scripts build",
    "build:prod": "env-cmd -f config/prod react-scripts build",
    "build:local": "env-cmd -f config/dev react-scripts build",
    "test": "react-scripts test ",
    "testNoWatch": "react-scripts test --coverage --no-watch --watch=false --watchAll=false --no-watchman --forceExit",
    "eject": "react-scripts eject",
    "deploy:draft": "netlify deploy"
  },
  "devDependencies": {
    "@babel/core": "^7.5.0",
    "@fortawesome/fontawesome-pro": "^5.8.2",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^10.0.4",
    "babel-loader": "^8.1.0",
    "enzyme": "^3.9.0",
    "enzyme-adapter-react-16": "^1.13.0",
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "faker": "^4.1.0",
    "http-proxy-middleware": "^0.19.1",
    "jest-dom": "^3.2.2",
    "jest-emotion": "^10.0.14",
    "jest-environment-jsdom-sixteen": "^1.0.3",
    "jest-enzyme": "^7.0.2",
    "mockdate": "^2.0.2",
    "mutation-observer": "^1.0.3",
    "prettier": "^2.0.5",
    "prop-types": "^15.7.2",
    "react-test-renderer": "^16.13.1"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "plugin:jsx-a11y/recommended"
    ],
    "plugins": [
      "jsx-a11y"
    ]
  },
  "browserslist": [
    "> 1%",
    "IE 11"
  ]
}

```
