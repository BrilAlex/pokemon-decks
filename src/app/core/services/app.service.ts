import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {RequestStatus} from "../models/app.models";

@Injectable()
export class AppService {
  private appStatus = new BehaviorSubject<RequestStatus>("idle");
  appStatus$ = this.appStatus.asObservable();

  setAppStatus(status: RequestStatus) {
    this.appStatus.next(status);
  };
}
