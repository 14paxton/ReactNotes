## config in package.json 
> this is transformIgnorePatterns for jest, defaultPhrases used for dateRangePicker needed to be ignored for jest and adding a workaround for using a webworker 

```json
{
 "jest": {
    "transformIgnorePatterns": [
      "<rootDir>/node_modules/defaultPhrases.js"
    ],
    "transform": {
      "^.+\\.worker.[t|j]sx?$": "workerloader-jest-transformer"
    }
  }
}
```