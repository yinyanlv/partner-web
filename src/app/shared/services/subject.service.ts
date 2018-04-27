import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SubjectService {

    private subject = new Subject();
    private subject$ = this.subject.asObservable();
    private listenerMap: Map<string, Array<Function>> = new Map<string, Array<Function>>();
    private cacheMap: Map<string, any> = new Map<string, any>();

    constructor() {
        this.subject$.subscribe(action => this.handle(action));
    }

    private handle(action: Object): void {

        let listeners = this.listenerMap.get(action['event']) || [];

        listeners.forEach((fn) => {

            fn.call(null, action['data']);
        });
    }

    subscribe(event: string, fn: Function): void {

        let listeners = this.listenerMap.get(event);

        if (listeners) {

            listeners.push(fn);
        } else {

            this.listenerMap.set(event, [fn]);
        }
    }

    unsubscribe(event: string): void {

        if (this.listenerMap.has(event)) {

            this.listenerMap.delete(event);
        }
    }

    resubscribe(event: string, fn: Function): void {

        this.unsubscribe(event);
        this.subscribe(event, fn);
    }

    publish(event: string, data: any): void {

        this.subject.next({
            event,
            data
        });
    }

    publishOnChange(event: string, data: any): void {

        let prevData = this.cacheMap.get(event);

        if (data !== prevData) {

            this.cacheMap.set(event, data);
            this.subject.next({
                event,
                data
            });
        }
    }
}
