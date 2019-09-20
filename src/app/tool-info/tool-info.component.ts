import { Component, OnInit, Input } from '@angular/core';
import { ToolInfo } from '../tool.model';

@Component({
  selector: 'tool-info',
  templateUrl: './tool-info.component.html',
  styleUrls: ['./tool-info.component.css']
})
export class ToolInfoComponent implements OnInit {

  @Input() tool: ToolInfo = null

  constructor() { }

  ngOnInit() {
  }

}
