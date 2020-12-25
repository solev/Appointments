import { Injectable, Injector } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Observable } from "rxjs/Rx";
import { UserService } from "../services/UserService";

@Injectable()
export class InterceptedHttp extends Http {

    private userService: UserService;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private injector: Injector) {
        super(backend, defaultOptions);
        setTimeout(() => {
            this.userService = this.injector.get(UserService);
        });
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options)).catch(this.catchErrors());
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options)).catch(this.catchErrors());
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options)).catch(this.catchErrors());
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options)).catch(this.catchErrors());
    }

    private updateUrl(req: string) {
        return req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {

        if (options == null) {
            options = new RequestOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        if (options.headers.get('Content-Type') == null)
            options.headers.append('Content-Type', 'application/json');

        options.headers.append('Authorization', 'Bearer ' + this.userService.access_token);

        return options;
    }

    private catchErrors() {
        return (response: Response) => {
            if (response.status === 401) {
                // do some stuff here
                this.userService.logout();
            }
            return Observable.throw(response);
        };
    }
}