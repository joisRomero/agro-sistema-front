import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

@Component({
  selector: 'app-general-toast',
  templateUrl: './general-toast.component.html',
  styleUrls: ['./general-toast.component.scss']
})
export class GeneralToastComponent extends Toast {

  // used for demo purposes
  undoString = 'undo';

  // Demo click handler
  handleClick(event: Event) {
    event.stopPropagation();
    this.undoString = 'undid';
    this.toastPackage.triggerAction();
    return false;
  }
}
