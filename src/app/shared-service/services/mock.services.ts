import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class MockService {

    constructor(private http: HttpClient) { }

    getBulkData(first, rows, count) {
        return this.http.get<any>('http://localhost:4200/assets/huge.data.json')
            .toPromise()
            .then((res) => {
                return res as any[];
            })
            .then((data) => {
                const result: any = {
                    totalRecords: data.length
                };
                const chunk = data.slice(first, first + rows);
                result.data = chunk;
                return result;
            });


        // return Observable.create((observer: Observer<any[]>) => {
        //     this.requests[id] = ({ reqId, data, error }) => {
        //         if (error) {
        //             observer.error(error);
        //             return;
        //         }
        //         observer.next(data);
        //         observer.complete();
        //     };
        //     console.log('entered request worer', args);
        //     this.worker.postMessage({ id, data: args });
        // });
    }


    public getJSON(): Observable<any> {
        return this.http.get('http://localhost:4200/assets/cars.small.json');
    }
}
