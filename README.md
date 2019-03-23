![eurostar2gtfs](logo.png)

[![Travis](https://img.shields.io/travis/planarnetwork/eurostar2gtfs.svg?style=flat-square)](https://travis-ci.org/planarnetwork/eurostar2gtfs) ![npm](https://img.shields.io/npm/v/eurostar2gtfs.svg?style=flat-square) ![David](https://img.shields.io/david/planarnetwork/eurostar2gtfs.svg?style=flat-square)

Creates a GTFS feed from a textual format of the Eurostar PDF timetable. For example:

```
# 03 FEB 2018 - 02 JUN 2019

1 Runs from 3 February 2019, not running on 24 February 2019
2 Runs between 6 April 2019 and 20 April 2019. Runs on 4 May 2019. Runs between 25 May 2019 and 1 June 2019
3 Runs between 6 April 2019 and 20 April 2019. Runs between 25 May 2019 and 1 June 2019
4 Runs on 24 February 2019

LONDON St Pancras Intl
EBBSFLEET International
ASHFORD International
LILLE Europe
MARNE LA VALLÉE
Train no.
1 P - P - P - P 10:14 10:34 10:58 12:54 14:03 9074
2 - - - - - P - 10:14 10:34 10:58 12:54 14:03 9074
3 - P - P - - - 10:14 10:34 10:58 12:54 14:03 9074
4 - - - - - - P 10:24 10:42 - 12:54 14:03 9074
```

## Status: In progress

This project is not yet functional.

## Installation

Please note that zip/unzip and [node 11.x](https://nodejs.org) or above are required.

eurostar2gtfs is a CLI tool that can be installed via NPM:

```
sudo apt-get install nodejs zip
npm install -g eurostar2gtfs
```

## Usage

It can be run by specifying the input and output files as CLI arguments:

```
eurostar2gtfs eurostar.txt output.zip
```

## Notes

There is an [example of the text format](timetable.txt) in the repository. It is a close copy of the [PDF timetable](https://content-static.eurostar.com/documents/446099_Timetables%20Core%20destination_Issue%2082_UK%20EN_0.pdf). The dates require some manual editing into one of the following formats:

 * 1 Runs from 31 March 2019
 * 2 Runs between 6 April 2019 and 20 April 2019. Runs on 4 May 2019.
 * 3 Runs between 6 January 2019 and 2 February 2019, not running 20 January 2019, not running 21 January 2019
 * 4 Runs until 30 March 2019. Runs between 25 May 2019 and 1 June 2019

Please note:
  
* Where only a from date is specified the to date is assumed to be the end date specified at the top of the page
* Where only a to date is specified the from date is assumed to be the start date specified at the top of the page
* All dates must have the year added to them
* A full stop `.` denotes separate calendar date ranges. Using the examples above all journeys with calendar 4 will have two GTFS calendars   
* Indirect services are not yet implemented

## Contributing

Issues and PRs are very welcome. To get the project set up run

```
git clone git@github.com:planarnetwork/eurostar2gtfs
npm install --dev
npm test
```

If you would like to send a pull request please write your contribution in TypeScript and if possible, add a test.

## License

This software is licensed under [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html).

