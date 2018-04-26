import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, Subscription, Subject} from 'rxjs';

export interface BaseHttpOptions {
    url?: string;
    body?: any;
    headers?: HttpHeaders;
    params?: HttpParams;
    observe?: 'body' | 'events' | 'response';
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
    beforeSend?: Function;
    success?: (val1: any, val2?: any) => void;
    error?: (value: any) => void;
    complete?: () => void;
}

@Injectable()
export class BaseHttp {

    constructor(public http: HttpClient) {
    }

    public get(opts: BaseHttpOptions): BaseHttpProxy {

        return new BaseHttpProxy(this, 'GET', opts);
    }

    public post(opts: BaseHttpOptions): BaseHttpProxy {

        return new BaseHttpProxy(this, 'POST', opts);
    }

    public put(opts: BaseHttpOptions): BaseHttpProxy {

        return new BaseHttpProxy(this, 'PUT', opts);
    }

    public delete(opts: BaseHttpOptions): BaseHttpProxy {

        return new BaseHttpProxy(this, 'DELETE', opts);
    }

    public request(method: string, opts: BaseHttpOptions): Observable<any> {

        let newOpts = Object.assign({
            responseType: 'json',
            withCredentials: true  // 解决ajax跨域时，session在各请求间不共享，总是新建一条的问题
        }, opts);

        return this.http.request(method, opts.url, newOpts);
    }
}

export class BaseHttpProxy {

    public baseHttpOptions;
    public subscribe: Function;
    public middlewares: Array<Function> = [];

    constructor(baseHttp: BaseHttp, method: string, opts: BaseHttpOptions) {

        this.baseHttpOptions = opts;
        this.subscribe = (handlers: {
            next?: (value: any) => void;
            error?: (value: any) => void;
            complete?: () => void
        }): Subscription => {

            let middleware;

            if (!handlers) {

                handlers = {};
            }

            if (this.middlewares.length) {

                middleware = this.middlewares.shift();
            }

            opts.beforeSend && opts.beforeSend();

            return baseHttp.request(method, opts).subscribe(
                (res) => {

                    if (middleware) {

                        let next = middleware(res);

                        next.middlewares = this.middlewares;

                        return next.subscribe(handlers);
                    }

                    let fn = handlers.next ?  handlers.next : (opts.success ? opts.success : null);

                    fn && fn(res);
                },
                handlers.error ? handlers.error : (opts.error ? opts.error : (err) => {

                    console.error(err);
                }),
                handlers.complete ? handlers.complete : (opts.complete ? opts.complete : null)
            );
        };
    }

    public serial(middleware: (res: any) => BaseHttpProxy): any {

        this.middlewares.push(middleware);

        return this;
    }

    static parallel(tasks: BaseHttpProxy[]): Observable<any> {

        let completedTaskCount = 0;
        let result = [];
        let subject = new Subject();
        let subject$= subject.asObservable();

        tasks.forEach((task: BaseHttpProxy, index: number) => {

            task.subscribe({
                next: (res) => {

                    result[index] = task.baseHttpOptions.success && task.baseHttpOptions.success(res);
                    completedTaskCount++;
                    if (completedTaskCount === tasks.length) {

                        subject.next(result);
                    }
                }
            });
        });

        return subject$;
    }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).map((event) => {

            return event;
        });
    }
}
