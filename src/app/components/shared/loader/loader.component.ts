import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderComponentVars } from './loader.component.vars';
// import { LoaderService } from '../../';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(
    public loaderVars: LoaderComponentVars,
  ) { }

  ngOnInit(): void {
  }

}
