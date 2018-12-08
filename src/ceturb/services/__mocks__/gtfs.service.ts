import { Injectable } from '@nestjs/common';

@Injectable()
export class GtfsService {


    public async getAll () {

        let obj1 = {
            "year": '2018',
            "month": '09',
            "day": '10',
            "hour": "08:35:11",
            "size": "426B",
            "filename": "README.md",
            "url": "http://127.0.0.1:9000/gtfs/README.md"
        }

        let obj2 = {
            "year": '2017',
            "month": '11',
            "day": '05',
            "hour": "10:12:11",
            "size": "826B",
            "filename": "tslint.json",
            "url": "http://127.0.0.1:9000/gtfs/tslint.json"
        }

        let obj3 = {
            "year": '2016',
            "month": '12',
            "day": '22',
            "hour": "12:05:11",
            "size": "4.55KiB",
            "filename": "zip.zip",
            "url": "http://127.0.0.1:9000/gtfs/zip.zip"
        }
        return [ obj1, obj2, obj3 ];
    }

    public async getByYear ( year: string ) {

        return [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" } ]

    }

    public async getByYearMonth ( year: string, month: string ) {

        return [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" } ]
    }

    public async getByYearMonthDay ( year: string, month: string, day: string ) {

        return [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" } ]

    }
}
