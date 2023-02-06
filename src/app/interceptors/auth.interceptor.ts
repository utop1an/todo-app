import { Injectable, Component, OnInit, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError,  Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private dialog: MatDialog
    ){}


    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("access_token");
        let newReq = req;
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                  "Bearer " + idToken)
            });

            newReq = cloned;
        }
        return next.handle(newReq).pipe(catchError((error)=>{
            if (error instanceof HttpErrorResponse){
                this.dialog.open(DialogFail, {
                    data: {
                        message: error.error.message
                    }
                });
                this.dialog.afterAllClosed.subscribe(()=>{
                    if (error.status===401){
                        this.router.navigate(['/'])
                    }
                })
                
            }
            return throwError(()=> error);
        }));
    }
}

@Component({
    selector: 'dialog-fail',
    templateUrl: './dialog.fail.html',
    // styleUrls: ['./user-login.component.scss'],
  })
  export class DialogFail {
    
    message: ""
    constructor(
      @Inject(MAT_DIALOG_DATA) public data:any,
      public dialogRef: MatDialogRef<DialogFail>,
    ){}

    ngOnInit() {
        this.message = this.data.message || "Unknow error"
    }
    close() {
      this.dialogRef.close();
    }
  }