import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  public getError(err: any) {
    if (typeof err === "string") {
      return err;
    }
    if (typeof err.error === "string") {
      return err.error;
    }
    if (Array.isArray(err.error)) {
      let allErrors = "";
      for (const item of err.error) {
        allErrors += item + "<br>";
      }
      return allErrors;
    }

    if (typeof err.message === "string") {
      return err.message;
    }

  }
}
