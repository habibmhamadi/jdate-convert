JDate-Convert
=====

A Javascript library for converting Solar (Jalali) date to Gregorian and Gregorian date to 
Solar(Jalali) date with support of date formats.


## Installation

Install via NPM/Yarn:

`npm install jdate-convert`


## Usage

- The first parameter is required to be a date string in the one of the following formats `yyyy-MM-dd`, `yyyy/MM/dd`
- Second parameter is optional for formating the output.

```javascript
import {toGregorian, toSolar} from 'jdate-convert'


const a = toGregorian('1400-04-24')                  //  2021-07-15
const b = toGregorian('1400-04-24', 'yyyy/MM/dd')    //  2021/07/15
const c = toGregorian('1400/04/24', 'yyyy/MMM/dd')   //  2021/Jul/12
const d = toGregorian('1400-04-24', 'yyyy/MMMM/dd')  //  2021/July/12

const a = toSolar('2021-06-14')                      //  1400-03-24
const b = toSolar('2021-06-14', 'yyyy/MM/dd')        //  1400/03/24
const c = toSolar('2021/06/14', 'yyyy-MMM-dd')       //  1400-ا      24-جوزا
```

`toSolar` function also accepts a third optional boolean paramater while using date formats
to return month name in Dari or Irani (Default Dari).
```javascript
const result = toSolar('2021-06-14', 'yyyy-MMM-dd', false)   // output 1400-ا      24-خرداد 
```


## Supported formats

|     Format     |  toGregorian  | toSolar  |
| -------------- | ------------- | -------- |
| `yyyy-MM-dd`   |      Yes      |   Yes    |
| `yyyy-MMM-dd`  |      Yes      |   Yes    |
| `yyyy-MMMM-dd` |      Yes      |    No    |

Supported separators are `-`, `/` and `whitespace`.


## Contribute

Report bugs and suggest feature in [issue tracker](https://github.com/habibmhamadi/jdate-convert/issues). Feel free to `Fork` and send `Pull Requests`.


## License

[MIT](https://github.com/habibmhamadi/jdate-convert/blob/main/LICENSE)
